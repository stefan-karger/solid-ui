import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import * as p from "@clack/prompts"
import { Command } from "commander"
import { execa } from "execa"
import * as v from "valibot"

import { getConfig } from "~/utils/config"
import { getPackageManager } from "~/utils/get-package-manager"
import { handleError, highlight } from "~/utils/logger"
import { fetchTree, getRegistryIndex, resolveTree } from "~/utils/registry"
import { transform } from "~/utils/transformers"

const addOptionsSchema = v.object({
  components: v.optional(v.array(v.string()), []),
  cwd: v.string(),
  overwrite: v.boolean(),
  all: v.boolean()
})

export const add = new Command()
  .name("add")
  .description("add components to your project")
  .argument("[components...]", "the components to add")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("-o --overwrite", "overwrite existing files", false)
  .option("-a, --all", "add all available components", false)
  .action(async (components, opts) => {
    try {
      const options = v.parse(addOptionsSchema, { components, ...opts })

      const cwd = path.resolve(options.cwd)
      if (!existsSync(cwd)) {
        throw new Error(`The path ${cwd} does not exist. Please try again.`)
      }

      const config = await getConfig(cwd)
      if (!config) {
        p.log.warning(
          `Configuration is missing. Please run ${highlight(`init`)} to create a components.json file.`
        )
        process.exit(1)
      }

      const registryIndex = await getRegistryIndex()

      let selectedComponents = options.all ? registryIndex.map((v) => v.name) : options.components
      if (!selectedComponents.length) {
        const prompts = await p.group(
          {
            components: () =>
              p.multiselect<string>({
                message: `Which ${highlight("components")} would you like to add?`,
                options: registryIndex.map((v) => ({ label: v.name, value: v.name })),
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
      const payload = await fetchTree(tree)

      if (!payload.length) {
        p.log.warn(`Selected components not found. Exiting.`)
        process.exit(0)
      }

      const spinner = p.spinner()
      spinner.start("Installing...")

      const targetDir = config.resolvedPaths.components
      if (!existsSync(targetDir)) {
        await mkdir(targetDir, { recursive: true })
      }

      for (const item of payload) {
        spinner.message(`Installing ${highlight(item.name)}...`)

        const existingComponent = item.files.filter((file) =>
          existsSync(path.resolve(targetDir, file.name))
        )
        if (existingComponent.length && !options.overwrite) {
          if (selectedComponents.includes(item.name)) {
            spinner.stop()

            const prompts = await p.group(
              {
                overwrite: () =>
                  p.confirm({
                    message: `Component ${item.name} already exists. Would you like to overwrite?`,
                    initialValue: false
                  })
              },
              {
                onCancel: () => {
                  p.cancel("Cancelled.")
                  process.exit(0)
                }
              }
            )
            const overwrite = prompts.overwrite
            if (!overwrite) {
              p.log.info(
                `Skipped ${item.name}. To overwrite, run with the ${highlight("--overwrite")} flag.`
              )
              continue
            }

            spinner.start(`Installing ${highlight(item.name)}...`)
          } else {
            continue
          }
        }

        for (const file of item.files) {
          let filePath = path.resolve(targetDir, file.name)

          // run transformers
          const content = await transform({
            filename: file.name,
            raw: file.content,
            config: config
          })

          if (!config.tsx) {
            filePath = filePath.replace(/\.tsx$/, ".jsx")
            filePath = filePath.replace(/\.ts$/, ".js")
          }

          await writeFile(filePath, content, "utf-8")
        }

        // install dependencies
        if (item.dependencies?.length) {
          const packageManager = await getPackageManager(cwd)
          await execa(packageManager, ["add", ...item.dependencies], { cwd })
        }
      }

      spinner.stop("Done.")
    } catch (e) {
      handleError(e)
    }
  })
