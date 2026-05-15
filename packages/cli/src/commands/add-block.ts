import { existsSync } from "node:fs"
import path from "node:path"

import * as p from "@clack/prompts"
import { Command } from "commander"
import * as v from "valibot"

import { getConfig } from "~/utils/config"
import { handleError, highlight } from "~/utils/logger"
import { installRegistryItems } from "~/utils/install-registry-items"
import { fetchRegistryItems, getRegistryIndex, resolveTree } from "~/utils/registry"

const addBlockOptionsSchema = v.object({
  blocks: v.optional(v.array(v.string()), []),
  cwd: v.string(),
  overwrite: v.boolean()
})

export const addBlock = new Command()
  .name("add-block")
  .description("add registry blocks (multi-file layouts) to your project")
  .argument("[blocks...]", "the blocks to add")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("-o, --overwrite", "overwrite existing files", false)
  .action(async (blocks, opts) => {
    try {
      const options = v.parse(addBlockOptionsSchema, { blocks, ...opts })

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

      const registryIndex = await getRegistryIndex("block")

      let selectedBlocks = options.blocks
      if (!selectedBlocks.length) {
        const prompts = await p.group(
          {
            blocks: () =>
              p.multiselect<string>({
                message: `Which ${highlight("blocks")} would you like to add?`,
                options: registryIndex.map((entry) => ({ label: entry.name, value: entry.name })),
                maxItems: 5
              })
          },
          {
            onCancel: () => {
              p.cancel("Cancelled.")
              process.exit(0)
            }
          }
        )
        selectedBlocks = prompts.blocks
      }

      if (!selectedBlocks.length) {
        p.log.warn(`No blocks selected. Exiting.`)
        process.exit(0)
      }

      const tree = await resolveTree(registryIndex, selectedBlocks)
      const payload = await fetchRegistryItems(tree, "block")

      if (!payload.length) {
        p.log.warn(`Selected blocks not found in registry. Exiting.`)
        process.exit(0)
      }

      const uiDependencyNames = [
        ...new Set(payload.flatMap((block) => block.registryDependencies ?? []))
      ]
      if (uiDependencyNames.length) {
        const uiIndex = await getRegistryIndex("ui")
        const uiTree = await resolveTree(uiIndex, uiDependencyNames)
        const uiPayload = await fetchRegistryItems(uiTree, "ui")
        if (uiPayload.length) {
          p.log.info(`Installing UI dependencies: ${uiDependencyNames.join(", ")}`)
          await installRegistryItems({
            cwd,
            config,
            payload: uiPayload,
            selectedNames: uiDependencyNames,
            overwrite: options.overwrite,
            kind: "ui"
          })
        }
      }

      await installRegistryItems({
        cwd,
        config,
        payload,
        selectedNames: selectedBlocks,
        overwrite: options.overwrite,
        kind: "block"
      })
    } catch (e) {
      handleError(e)
    }
  })
