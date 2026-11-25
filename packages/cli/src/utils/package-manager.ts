import { existsSync } from "node:fs"
import path from "node:path"

import { execa } from "execa"
import type { Agent } from "package-manager-detector"
import { resolveCommand } from "package-manager-detector/commands"
import { detect, getUserAgent } from "package-manager-detector/detect"

import { CliError } from "./errors"

export type InstallOptions = { agent: Agent; dev?: boolean }

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

// In each folder from cwd up, the package manager that installed
// node_modules wins over lockfiles: a template can ship another manager's
// files, and installing with the wrong one replaces node_modules and
// resolves every range again. Then come the lockfiles and the packageManager
// field, and last the tool that ran the CLI.
export async function detectAgent(cwd: string): Promise<Agent> {
  for (let dir = path.resolve(cwd); ; dir = path.dirname(dir)) {
    for (const [marker, agent] of INSTALL_MARKERS)
      if (existsSync(path.join(dir, marker))) return agent
    const found = await detect({ cwd: dir, stopDir: dir })
    if (found) return found.agent
    if (path.dirname(dir) === dir) break
  }
  return getUserAgent() ?? "npm"
}

export function installCommand(
  specs: string[],
  { agent, dev }: InstallOptions
) {
  const args = agent === "deno" ? specs.map((spec) => `npm:${spec}`) : specs
  const command = resolveCommand(agent, "add", dev ? ["-D", ...args] : args)
  if (!command)
    throw new CliError(`Could not build an install command for ${agent}.`)
  return command
}

export function formatCommand(command: { command: string; args: string[] }) {
  return [command.command, ...command.args].join(" ")
}

// Installs the packages in one call. The package manager's output only
// shows when it fails, so it doesn't break the CLI's layout.
export const installPackages: Installer = async (cwd, specs, options) => {
  if (!specs.length) return
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
