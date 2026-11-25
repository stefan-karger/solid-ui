import { existsSync, readFileSync, statSync } from "node:fs"
import path from "node:path"

import { execa } from "execa"
import type { Agent } from "package-manager-detector"
import { resolveCommand } from "package-manager-detector/commands"
import { getUserAgent } from "package-manager-detector/detect"

import { CliError } from "./errors"
import { CLI_NAME } from "./version"

export type InstallOptions = { agent: Agent; dev?: boolean }

// Adds `specs` to the project; no specs installs what package.json lists.
export type Installer = (
  cwd: string,
  specs: string[],
  options: InstallOptions
) => Promise<void>

// Files a package manager leaves in the node_modules it installed.
const INSTALL_MARKERS: [string, Agent][] = [
  ["node_modules/.modules.yaml", "pnpm"],
  ["node_modules/.package-lock.json", "npm"],
  ["node_modules/.yarn-state.yml", "yarn@berry"],
  ["node_modules/.yarn-integrity", "yarn"],
  [".pnp.cjs", "yarn@berry"],
  ["node_modules/.deno", "deno"]
]

const LOCKFILES: [string, Agent][] = [
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["package-lock.json", "npm"],
  ["npm-shrinkwrap.json", "npm"],
  ["deno.lock", "deno"]
]

// Where the search for a project's package manager stops going up.
const ROOT_MARKERS = [".git", "pnpm-workspace.yaml"]

const NAMES: Record<string, Agent> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
  deno: "deno"
}

// The lockfile written last: a real install writes its own next to the
// one a template shipped.
function newestLockfile(dir: string) {
  return LOCKFILES.map(([file, agent]) => ({
    file,
    agent,
    path: path.join(dir, file)
  }))
    .filter((lock) => existsSync(lock.path))
    .map((lock) => ({ ...lock, time: statSync(lock.path).mtimeMs }))
    .sort((a, b) => b.time - a.time)[0]
}

function* upwards(cwd: string) {
  for (let dir = path.resolve(cwd); ; dir = path.dirname(dir)) {
    yield dir
    if (path.dirname(dir) === dir) return
  }
}

function isRoot(dir: string) {
  return (
    ROOT_MARKERS.some((marker) => existsSync(path.join(dir, marker))) ||
    LOCKFILES.some(([file]) => existsSync(path.join(dir, file)))
  )
}

// The package manager that installed node_modules, up to the project root.
function installedBy(cwd: string): Agent | null {
  for (const dir of upwards(cwd)) {
    for (const [marker, agent] of INSTALL_MARKERS)
      if (existsSync(path.join(dir, marker))) return agent
    if (existsSync(path.join(dir, "node_modules"))) {
      const lock = newestLockfile(dir)
      if (lock) return lock.agent
    }
    if (isRoot(dir)) return null
  }
  return null
}

function packageManagerField(cwd: string): Agent | null {
  for (const dir of upwards(cwd)) {
    const file = path.join(dir, "package.json")
    if (existsSync(file)) {
      try {
        const field = JSON.parse(readFileSync(file, "utf8")).packageManager
        const name = typeof field === "string" ? field.split("@")[0]! : ""
        if (NAMES[name]) return NAMES[name]
      } catch {
        // An unreadable package.json has no say.
      }
    }
    if (isRoot(dir)) return null
  }
  return null
}

// The package manager to install with: the one that installed node_modules,
// else the packageManager field, else the tool that ran the CLI (npx or node
// directly means npm). A lockfile alone doesn't decide: create-solid copies
// the template's pnpm-lock.yaml into every new app.
export function detectAgent(cwd: string): Agent {
  return installedBy(cwd) ?? packageManagerField(cwd) ?? getUserAgent() ?? "npm"
}

export function installCommand(
  specs: string[],
  { agent, dev }: InstallOptions
) {
  const args = agent === "deno" ? specs.map((spec) => `npm:${spec}`) : specs
  const command = specs.length
    ? resolveCommand(agent, "add", dev ? ["-D", ...args] : args)
    : resolveCommand(agent, "install", [])
  if (!command)
    throw new CliError(`Could not build an install command for ${agent}.`)
  return command
}

export function formatCommand(command: { command: string; args: string[] }) {
  return [command.command, ...command.args].join(" ")
}

// Runs the install. The package manager's output only shows when it fails,
// so it doesn't break the CLI's layout.
export const installPackages: Installer = async (cwd, specs, options) => {
  const command = installCommand(specs, options)
  const result = await execa(command.command, command.args, {
    cwd,
    all: true,
    reject: false,
    stdin: "ignore"
  })
  if (result.exitCode !== 0 || result.failed) {
    const output = String(result.all ?? result.message ?? "")
      .trim()
      .split(/\r?\n/)
      .slice(-30)
      .join("\n")
    throw new CliError(
      `${formatCommand(command)} failed:\n\n${output}\n\nFix the error above, then run the command yourself.`
    )
  }
}

// The line a finished install leaves: the names while they fit on a line.
export function installedMessage(names: string[], agent: Agent) {
  return names.length <= 3
    ? `Installed ${names.join(", ")}.`
    : `Installed ${names.length} packages with ${agent}.`
}

// A solidui-cli command to copy, run the way the user started this one:
// npx, pnpm dlx, bunx or yarn dlx.
export function cliCommand(args: string, version = "latest") {
  const agent = getUserAgent() ?? "npm"
  const command = resolveCommand(agent, "execute", [
    `${CLI_NAME}@${version}`,
    ...args.split(" ").filter(Boolean)
  ])
  return command
    ? formatCommand(command)
    : `npx ${CLI_NAME}@${version} ${args}`.trim()
}
