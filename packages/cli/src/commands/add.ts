import path from "node:path"

import type { RegistryItem } from "@solid-ui/registry/schema"
import { supportedRange } from "@solid-ui/registry/versions"
import { Command } from "commander"

import {
  parseSpec,
  planDependencies,
  resolveConflicts
} from "~/install/dependencies"
import {
  resolveTargetPath,
  writeFiles,
  type PlannedFile
} from "~/install/files"
import { transformSource } from "~/install/transform"
import { runAddPreflight } from "~/preflight/add"
import { readPackageJson } from "~/project/package-json"
import { createRegistryClient, type RegistryClient } from "~/registry/client"
import { installableItems, resolveTree } from "~/registry/resolve"
import { CliError } from "~/utils/errors"
import { installPackages, type Installer } from "~/utils/package-manager"
import { terminalUi, type Ui } from "~/utils/ui"
import { CLI_NAME, CLI_VERSION } from "~/utils/version"

export type AddOptions = {
  cwd: string
  overwrite: boolean
  yes: boolean
  all: boolean
}

export type AddDeps = {
  client?: RegistryClient
  install?: Installer
  ui?: Ui
  interactive?: boolean
}

// UI SDK is a beta and pinned exactly. The registry follows the docs deploy,
// so it can be ahead of the version this CLI release was tested with.
function anchorNotes(specs: string[]) {
  return specs.flatMap((spec) => {
    const { name, range } = parseSpec(spec)
    const anchor = name.startsWith("@ui-sdk/")
      ? supportedRange(name)
      : undefined
    return anchor && range && anchor !== range
      ? [
          `The registry uses ${name} ${range}; ${CLI_NAME} ${CLI_VERSION} was tested with ${anchor}. Update with: npx ${CLI_NAME}@latest`
        ]
      : []
  })
}

async function chooseItems(
  names: string[],
  options: AddOptions,
  catalogNames: string[],
  ui: Ui,
  interactive: boolean
) {
  if (options.all) return catalogNames
  if (names.length) return names
  if (!interactive)
    throw new CliError(
      `Name the components to add, for example: npx ${CLI_NAME}@latest add button`
    )
  return ui.multiselect(
    "Which components would you like to add?",
    catalogNames.map((name) => ({ value: name, label: name }))
  )
}

export async function runAdd(
  names: string[],
  options: AddOptions,
  deps: AddDeps = {}
) {
  const ui = deps.ui ?? terminalUi
  const interactive = deps.interactive ?? Boolean(process.stdin.isTTY)
  const install = deps.install ?? installPackages
  const cwd = path.resolve(options.cwd)

  const project = runAddPreflight(cwd)
  const { config } = project
  const client = deps.client ?? createRegistryClient()

  const catalog = await ui.task(
    `Loading the ${config.style} catalog from ${client.baseUrl}`,
    () => client.catalog(config.style),
    `Loaded the ${config.style} catalog.`
  )
  const components = installableItems(catalog)
    .filter((item) => item.type === "registry:ui")
    .map((item) => item.name)
  const selected = await chooseItems(
    names,
    options,
    components,
    ui,
    interactive
  )
  if (!selected.length) {
    ui.warn("No components selected.")
    return
  }

  const tree = resolveTree(catalog, selected)
  const items = await ui.task(
    `Loading ${tree.length} ${tree.length === 1 ? "item" : "items"}`,
    () =>
      Promise.all(
        tree.map(async ({ name }) => {
          const item = await client.item(config.style, name)
          if (!item)
            throw new CliError(
              `The registry lists ${name} for ${config.style} but doesn't serve it.`
            )
          return item
        })
      ),
    `Loaded ${tree.map(({ name }) => name).join(", ")}.`
  )

  const files: PlannedFile[] = items.flatMap((item: RegistryItem) =>
    (item.files ?? []).map((file) => {
      if (file.content === undefined)
        throw new CliError(`${item.name} has no content for ${file.path}.`)
      return {
        path: resolveTargetPath(file, config, project.tsconfig, cwd),
        content: transformSource(file.path, file.content, config)
      }
    })
  )

  const written = await writeFiles(files, cwd, {
    overwrite: options.overwrite,
    confirm: async (file) =>
      interactive &&
      !options.yes &&
      ui.confirm(`${file} already exists and differs. Overwrite it?`, false)
  })

  const specs = items.flatMap((item) => item.dependencies ?? [])
  for (const note of anchorNotes(specs)) ui.info(note)
  const plan = planDependencies(cwd, readPackageJson(cwd) ?? {}, specs)
  const installs = await resolveConflicts(plan, ui, interactive && !options.yes)
  if (installs.length)
    await ui.task(
      `Installing ${installs.length} packages`,
      () => install(cwd, installs),
      `Installed ${installs.join(", ")}.`
    )

  const lines = [
    ...written.created.map((file) => `Created ${file}`),
    ...written.updated.map((file) => `Updated ${file}`),
    ...written.unchanged.map((file) => `Unchanged ${file}`),
    ...written.skipped.map((file) => `Kept ${file} (differs from the registry)`)
  ]
  ui.success(lines.join("\n"))
  if (written.skipped.length && !options.overwrite)
    ui.info("Run add with --overwrite to replace files that differ.")
}

export const add = new Command()
  .name("add")
  .description("add components to your project")
  .argument("[components...]", "the components to add")
  .option("-c, --cwd <dir>", "the project directory", process.cwd())
  .option("-o, --overwrite", "replace files that differ", false)
  .option("-y, --yes", "skip the prompts; keep files that differ", false)
  .option("-a, --all", "add every component", false)
  .action(async (components: string[], options: AddOptions) => {
    await runAdd(components, options)
  })
