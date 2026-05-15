import { existsSync } from "node:fs"
import path from "node:path"

import * as p from "@clack/prompts"
import { Command } from "commander"
import * as v from "valibot"

import { getConfig } from "~/utils/config"
import { handleError, highlight } from "~/utils/logger"
import { installRegistryItems } from "~/utils/install-registry-items"
import { fetchRegistryItems, getRegistryIndex, resolveTree } from "~/utils/registry"

const updateOptionsSchema = v.object({
  components: v.optional(v.array(v.string()), []),
  cwd: v.string(),
  overwrite: v.boolean(),
  all: v.boolean()
})

export const update = new Command()
  .name("update")
  .description("update installed UI components from the registry")
  .argument("[components...]", "the components to update")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("-o, --overwrite", "overwrite existing files without prompting", true)
  .option("-a, --all", "update all registry components present in your ui folder", false)
  .action(async (components, opts) => {
    try {
      const options = v.parse(updateOptionsSchema, { components, ...opts, overwrite: opts.overwrite ?? true })

      const cwd = path.resolve(options.cwd)
      if (!existsSync(cwd)) {
        throw new Error(`The path ${cwd} does not exist. Please try again.`)
      }

      const config = await getConfig(cwd)
      if (!config) {
        p.log.warning(
          `Configuration is missing. Please run ${highlight(`init`)} to create a ui.config.json file.`
        )
        process.exit(1)
      }

      const registryIndex = await getRegistryIndex("ui")

      let selectedComponents = options.all
        ? registryIndex.map((entry) => entry.name)
        : options.components

      if (!selectedComponents.length) {
        const prompts = await p.group(
          {
            components: () =>
              p.multiselect<string>({
                message: `Which ${highlight("components")} would you like to update?`,
                options: registryIndex.map((entry) => ({ label: entry.name, value: entry.name })),
                maxItems: 10
              })
          },
          {
            onCancel: () => {
              p.cancel("Cancelled.")
              process.exit(0)
            }
          }
        )
        selectedComponents = prompts.components
      }

      if (!selectedComponents.length) {
        p.log.warn(`No components selected. Exiting.`)
        process.exit(0)
      }

      const tree = await resolveTree(registryIndex, selectedComponents)
      const payload = await fetchRegistryItems(tree, "ui")

      if (!payload.length) {
        p.log.warn(`Selected components not found in registry. Exiting.`)
        process.exit(0)
      }

      await installRegistryItems({
        cwd,
        config,
        payload,
        selectedNames: selectedComponents,
        overwrite: true,
        kind: "ui"
      })
    } catch (e) {
      handleError(e)
    }
  })
