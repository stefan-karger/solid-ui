import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

import {
  CONFIG_FILE,
  CONFIG_SCHEMA_URL,
  DEFAULT_ALIASES,
  type ComponentsJson
} from "@solid-ui/registry/config"
import { createSolidUiCss, solidUiCssPackages } from "@solid-ui/registry/css"
import {
  DEFAULT_PRESET_NAME,
  DEFAULT_PRESETS,
  encodePreset,
  normalizePreset,
  parsePresetInput,
  type Preset
} from "@solid-ui/registry/preset"
import { SUPPORTED_VERSIONS, supportedRange } from "@solid-ui/registry/versions"
import { Command } from "commander"
import type { Agent } from "package-manager-detector"

import { CREATE_URL } from "~/constants"
import {
  parseSpec,
  planDependencies,
  resolveConflicts
} from "~/install/dependencies"
import {
  applyFiles,
  resolveTargetPath,
  type PlannedFile
} from "~/install/files"
import { transformSource } from "~/install/transform"
import {
  rangeMessage,
  runInitPreflight,
  type InitProject
} from "~/preflight/init"
import { patchAppCss } from "~/project/app-css"
import { readPackageJson } from "~/project/package-json"
import { addTildeAlias } from "~/project/tsconfig"
import { canUpdateInto, resolveVersion, satisfies } from "~/project/versions"
import {
  TSCONFIG_PATHS_ENTRY,
  TSCONFIG_PATHS_SNIPPET,
  type ViteConfig
} from "~/project/vite"
import { createRegistryClient, type RegistryClient } from "~/registry/client"
import { badge, color } from "~/utils/colors"
import { CliError } from "~/utils/errors"
import {
  cliCommand,
  detectAgent,
  formatCommand,
  installCommand,
  installedMessage,
  installPackages,
  type Installer
} from "~/utils/package-manager"
import { terminalUi, type Ui } from "~/utils/ui"
import { CLI_NAME, CLI_VERSION } from "~/utils/version"

export type InitOptions = {
  cwd: string
  preset?: string
  yes: boolean
  force: boolean
  css?: string
}

export type InitDeps = {
  client?: RegistryClient
  install?: Installer
  ui?: Ui
  // False in CI and pipes: init then needs --preset or --yes.
  interactive?: boolean
}

// Packages every installed component relies on, besides the utils item's own.
const BASE_PACKAGES = ["class-variance-authority"]

function spec(name: string) {
  const range = supportedRange(name)
  return range ? `${name}@${range}` : name
}

function rel(cwd: string, file: string) {
  return path.relative(cwd, file).split(path.sep).join("/")
}

type ViteStep =
  | { kind: "none" }
  | { kind: "write"; path: string; text: string; enable: boolean }
  | { kind: "manual"; reason: string }

// How init makes Vite resolve `~/`. A config that turns tsconfigPaths off
// is only changed after asking, or with --yes.
async function planViteStep(
  vite: ViteConfig | null,
  options: InitOptions,
  ui: Ui,
  interactive: boolean
): Promise<ViteStep> {
  if (!vite) return { kind: "manual", reason: "the project has no vite.config" }
  const { plan } = vite
  if (plan.kind === "resolved") return { kind: "none" }
  if (plan.kind === "manual") return plan
  if (
    plan.enable &&
    interactive &&
    !options.yes &&
    !(await ui.confirm(
      `${path.basename(vite.path)} sets resolve.tsconfigPaths to false. Solid UI components import through ~/, which needs it. Set it to true?`,
      true
    ))
  )
    return { kind: "manual", reason: "you kept resolve.tsconfigPaths: false" }
  return {
    kind: "write",
    path: vite.path,
    text: plan.text,
    enable: plan.enable
  }
}

// Installed requirements outside the tested ranges, for example when a
// template's lockfile installs older versions.
function versionsOutsideRanges(cwd: string) {
  const pkg = readPackageJson(cwd) ?? {}
  return Object.entries(SUPPORTED_VERSIONS.requirements).flatMap(
    ([name, range]) => {
      const found = resolveVersion(cwd, pkg, name)
      return found.source === "installed" && !satisfies(found.version, range)
        ? [
            {
              name,
              version: found.version,
              range,
              dev: Boolean(pkg.devDependencies?.[name])
            }
          ]
        : []
    }
  )
}

type AlignOptions = {
  ask: boolean
  yes: boolean
  // Before init writes files a version it can't fix stops it; afterwards
  // init only warns.
  required: boolean
}

// Updates requirements below the tested ranges within their major, after
// asking or with --yes.
async function alignVersions(
  cwd: string,
  agent: Agent,
  install: Installer,
  ui: Ui,
  { ask, yes, required }: AlignOptions
) {
  const outside = versionsOutsideRanges(cwd)
  if (!outside.length) return

  const stuck = outside.filter(
    ({ version, range }) => !canUpdateInto(version, range)
  )
  if (stuck.length) {
    const message = rangeMessage(
      CLI_VERSION,
      stuck.map(({ name, version }) => ({ name, source: "installed", version }))
    )
    if (required) throw new CliError(message)
    ui.warn(message)
    return
  }

  const groups = [false, true]
    .map((dev) => ({
      dev,
      specs: outside
        .filter((entry) => entry.dev === dev)
        .map(({ name, range }) => `${name}@${range}`)
    }))
    .filter(({ specs }) => specs.length)
  ui.warn(
    [
      `These packages are older than the versions ${CLI_NAME} ${CLI_VERSION} supports:`,
      ...outside.map(
        ({ name, version, range }) => `  ${name} ${version} (needs ${range})`
      )
    ].join("\n")
  )
  if (yes || (ask && (await ui.confirm("Update them now?", true)))) {
    const names = outside.map(({ name }) => name).join(", ")
    await ui.task(
      `Updating ${names} with ${agent}`,
      async () => {
        for (const { dev, specs } of groups)
          await install(cwd, specs, { agent, dev })
      },
      `${color.changed("Updated")} ${names}`
    )
    return
  }
  const commands = groups
    .map(
      ({ dev, specs }) =>
        `  ${color.command(formatCommand(installCommand(specs, { agent, dev })))}`
    )
    .join("\n")
  if (required)
    throw new CliError(
      `Update them with:\n\n${commands}\n\nThen run init again.`
    )
  ui.info(`Update them with:\n\n${commands}`)
}

async function choosePreset(
  options: InitOptions,
  ui: Ui,
  interactive: boolean
): Promise<Preset | null> {
  if (options.preset) {
    const preset = parsePresetInput(options.preset)
    if (!preset)
      throw new CliError(
        `${options.preset} is not a preset code. Copy one from ${CREATE_URL}.`
      )
    return normalizePreset(preset)
  }
  if (options.yes) return DEFAULT_PRESETS[DEFAULT_PRESET_NAME].preset
  if (!interactive)
    throw new CliError(
      "Pass --preset <code> or --yes when init can't ask, for example in CI."
    )

  const choice = await ui.select(
    "Which preset would you like to start from?",
    [
      ...Object.entries(DEFAULT_PRESETS).map(([value, named]) => ({
        value,
        label: named.title,
        hint: named.description
      })),
      { value: "custom", label: "Custom", hint: `build one at ${CREATE_URL}` }
    ],
    DEFAULT_PRESET_NAME
  )
  if (choice === "custom") {
    ui.note(
      `Build your preset at ${CREATE_URL}, then run the command it copies:\n\n  ${color.command(cliCommand("init --preset <code>"))}`,
      "Custom preset"
    )
    return null
  }
  return DEFAULT_PRESETS[choice as keyof typeof DEFAULT_PRESETS].preset
}

export async function runInit(options: InitOptions, deps: InitDeps = {}) {
  const ui = deps.ui ?? terminalUi
  const interactive = deps.interactive ?? Boolean(process.stdin.isTTY)
  const install = deps.install ?? installPackages
  const cwd = path.resolve(options.cwd)

  ui.intro(badge())

  const preflight = runInitPreflight(cwd, {
    cliVersion: CLI_VERSION,
    ...(options.css ? { css: options.css } : {})
  })
  for (const issue of preflight.issues)
    (issue.level === "error" ? ui.error : ui.warn)(issue.message)
  if (!preflight.ok)
    throw new CliError("init stopped before changing anything.")
  const project: InitProject = preflight.project

  if (project.hasConfig && !options.force) {
    const replace =
      interactive &&
      !options.yes &&
      (await ui.confirm(`${CONFIG_FILE} already exists. Replace it?`, false))
    if (!replace)
      throw new CliError(
        `${CONFIG_FILE} already exists. Run init with --force to replace it and regenerate solid-ui.css.`
      )
  }

  const preset = await choosePreset(options, ui, interactive)
  if (!preset) return
  const code = encodePreset(preset)

  const agent = detectAgent(cwd)
  const align = { ask: interactive && !options.yes, yes: options.yes }

  if (project.needsInstall) {
    await ui.task(
      `Installing dependencies with ${agent}`,
      () => install(cwd, [], { agent }),
      `Installed dependencies with ${agent}.`
    )
    const pkg = readPackageJson(cwd) ?? {}
    const missing = Object.keys(SUPPORTED_VERSIONS.requirements).filter(
      (name) => resolveVersion(cwd, pkg, name).source !== "installed"
    )
    if (missing.length)
      throw new CliError(
        `${missing.join(", ")} still ${missing.length === 1 ? "isn't" : "aren't"} installed after ${agent} install.`
      )
  }
  await alignVersions(cwd, agent, install, ui, { ...align, required: true })

  const client = deps.client ?? createRegistryClient()
  const [utils, utilities] = await ui.task(
    `Loading the ${preset.style} style from ${client.baseUrl}`,
    () =>
      Promise.all([
        client.item(preset.style, "utils"),
        client.item(preset.style, "style-utilities")
      ]),
    `Loaded the ${preset.style} style for preset ${color.command(code)}.`
  )
  const utilitiesCss = utilities?.files?.[0]?.content
  if (!utils?.files?.length || !utilitiesCss)
    throw new CliError(
      `The registry at ${client.baseUrl} is missing the utils or style-utilities item for ${preset.style}.`
    )

  const config: ComponentsJson = {
    $schema: CONFIG_SCHEMA_URL,
    style: preset.style,
    preset: code,
    tailwind: { css: project.tailwindCss },
    menuColor: preset.menuColor,
    menuAccent: preset.menuAccent,
    aliases: { ...DEFAULT_ALIASES }
  }

  // The tsconfig as it will be once ~/* is in place.
  const tsconfigText = project.needsTildeAlias
    ? addTildeAlias(project.tsconfig, project.tildeTarget)
    : project.tsconfig.text
  const tsconfig = { ...project.tsconfig, text: tsconfigText }
  if (project.needsTildeAlias) {
    tsconfig.config = {
      ...tsconfig.config,
      compilerOptions: {
        ...tsconfig.config.compilerOptions,
        paths: {
          ...tsconfig.config.compilerOptions?.paths,
          "~/*": [project.tildeTarget]
        }
      }
    }
  }

  const appCssPath = path.resolve(cwd, project.tailwindCss)
  const solidUiCssPath = path.join(path.dirname(appCssPath), "solid-ui.css")
  const appCss = readFileSync(appCssPath, "utf8")
  const patchedAppCss = patchAppCss(appCss)

  // components.json and solid-ui.css belong to the CLI and are rewritten.
  const owned: PlannedFile[] = [
    {
      path: path.join(cwd, CONFIG_FILE),
      content: JSON.stringify(config, null, 2)
    },
    {
      path: solidUiCssPath,
      content: createSolidUiCss({
        preset,
        utilitiesCss,
        appCss: path.basename(appCssPath)
      })
    }
  ]
  // lib/utils.ts is the project's: a changed copy is only replaced on request.
  const source: PlannedFile[] = (utils.files ?? []).map((file) => ({
    path: resolveTargetPath(file, config, tsconfig, cwd),
    content: transformSource(file.path, file.content ?? "", config)
  }))

  const plan = planDependencies(cwd, readPackageJson(cwd) ?? {}, [
    ...(utils.dependencies ?? []),
    ...BASE_PACKAGES.map(spec),
    ...solidUiCssPackages(preset).map(spec)
  ])

  const viteStep = await planViteStep(project.vite, options, ui, interactive)
  const viteName = project.vite ? rel(cwd, project.vite.path) : "vite.config.ts"

  // One spinner line per step: "Writing x" turns into "Wrote x".
  const update = (file: string, note: string, write: () => void) =>
    ui.task(
      `Updating ${file}`,
      async () => write(),
      `${color.changed("Updated")} ${file}${note ? ` ${color.muted(`(${note})`)}` : ""}`
    )

  const written = await applyFiles(owned, cwd, ui, { overwrite: true })
  if (appCss !== patchedAppCss)
    await update(project.tailwindCss, "", () =>
      writeFileSync(appCssPath, patchedAppCss)
    )
  if (project.needsTildeAlias)
    await update(rel(cwd, project.tsconfig.path), 'added "~/*"', () =>
      writeFileSync(project.tsconfig.path, tsconfigText)
    )
  if (viteStep.kind === "write") {
    const { path: vitePath, text, enable } = viteStep
    await update(
      viteName,
      enable
        ? "set resolve.tsconfigPaths to true"
        : "added resolve.tsconfigPaths",
      () => writeFileSync(vitePath, text)
    )
  }
  const kept = await applyFiles(source, cwd, ui, {
    overwrite: false,
    confirm: async (file) =>
      interactive &&
      !options.yes &&
      ui.confirm(
        `${file} differs from the registry version. Replace it?`,
        false
      )
  })
  for (const file of [...written.kept, ...kept.kept])
    ui.info(
      `${color.kept("Kept")} ${file} ${color.muted("(yours differs from the registry)")}`
    )

  const specs = await resolveConflicts(plan, ui, interactive)
  if (specs.length) {
    await ui.task(
      `Installing ${specs.length} packages with ${agent}`,
      () => install(cwd, specs, { agent }),
      installedMessage(
        specs.map((entry) => parseSpec(entry).name),
        agent
      )
    )
    await alignVersions(cwd, agent, install, ui, {
      ...align,
      required: false
    })
  }

  const addButton = color.command(cliCommand("add button"))
  if (viteStep.kind === "manual") {
    ui.warn(
      `Vite can't resolve ~/ yet. init left ${viteName} alone because ${viteStep.reason}. Add ${color.command(TSCONFIG_PATHS_ENTRY)} to the config, for example:\n\n${color.command(TSCONFIG_PATHS_SNIPPET)}`
    )
    ui.outro(
      `Finish the ${viteName} step above, then add a component with: ${addButton}`
    )
    return
  }
  ui.note(addButton, "Add your first component")
  ui.outro("Solid UI is set up.")
}

export const init = new Command()
  .name("init")
  .description("set up Solid UI in a Solid 2 project")
  .option("-c, --cwd <dir>", "the project directory", process.cwd())
  .option("-p, --preset <code>", "a preset code from solid-ui.com/create")
  .option("-y, --yes", "skip the prompts and use the defaults", false)
  .option(
    "-f, --force",
    "replace an existing components.json and solid-ui.css",
    false
  )
  .option("--css <file>", "the app stylesheet that imports Tailwind CSS")
  .action(async (options: InitOptions) => {
    await runInit(options)
  })
