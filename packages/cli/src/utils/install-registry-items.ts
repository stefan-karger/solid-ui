import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import * as p from "@clack/prompts"
import { execa } from "execa"

import type { Config } from "~/utils/config"
import { getPackageManager } from "~/utils/get-package-manager"
import { highlight } from "~/utils/logger"
import type { RegistryItem } from "~/utils/registry"
import { transform } from "~/utils/transformers"

export type InstallRegistryItemsOptions = {
  cwd: string
  config: Config
  payload: RegistryItem[]
  selectedNames: string[]
  overwrite: boolean
  kind: "ui" | "block"
}

export async function installRegistryItems(options: InstallRegistryItemsOptions) {
  const { cwd, config, payload, selectedNames, overwrite, kind } = options

  const spinner = p.spinner()
  spinner.start("Installing...")

  if (kind === "ui") {
    const targetDir = config.resolvedPaths.components
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true })
    }

    for (const item of payload) {
      spinner.message(`Installing ${highlight(item.name)}...`)

      const existingComponent = item.files.filter((file) =>
        existsSync(path.resolve(targetDir, file.name))
      )

      if (existingComponent.length && !overwrite) {
        if (selectedNames.includes(item.name)) {
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
          if (!prompts.overwrite) {
            p.log.info(
              `Skipped ${item.name}. To overwrite, run with the ${highlight("--overwrite")} flag.`
            )
            spinner.start(`Installing ${highlight(item.name)}...`)
            continue
          }
          spinner.start(`Installing ${highlight(item.name)}...`)
        } else {
          continue
        }
      }

      for (const file of item.files) {
        let filePath = path.resolve(targetDir, file.name)
        const content = await transform({
          filename: file.name,
          raw: file.content,
          config
        })

        if (!config.tsx) {
          filePath = filePath.replace(/\.tsx$/, ".jsx").replace(/\.ts$/, ".js")
        }

        await mkdir(path.dirname(filePath), { recursive: true })
        await writeFile(filePath, content, "utf-8")
      }

      await installItemDependencies(cwd, item)
    }
  } else {
    for (const item of payload) {
      spinner.message(`Installing block ${highlight(item.name)}...`)

      for (const file of item.files) {
        const relativePath = file.target ?? file.name
        let filePath = path.resolve(cwd, relativePath)
        const content = await transform({
          filename: path.basename(filePath),
          raw: file.content,
          config
        })

        if (!config.tsx) {
          filePath = filePath.replace(/\.tsx$/, ".jsx").replace(/\.ts$/, ".js")
        }

        if (!overwrite && existsSync(filePath)) {
          spinner.stop()
          const prompts = await p.group(
            {
              overwrite: () =>
                p.confirm({
                  message: `File ${relativePath} already exists. Overwrite?`,
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
          if (!prompts.overwrite) {
            p.log.info(`Skipped ${relativePath}.`)
            spinner.start(`Installing block ${highlight(item.name)}...`)
            continue
          }
          spinner.start(`Installing block ${highlight(item.name)}...`)
        }

        await mkdir(path.dirname(filePath), { recursive: true })
        await writeFile(filePath, content, "utf-8")
      }

      await installItemDependencies(cwd, item)

      const uiDeps = item.registryDependencies ?? []
      if (uiDeps.length) {
        p.log.info(
          `Block ${item.name} depends on UI components: ${uiDeps.join(", ")}. Run ${highlight(`solidui-cli add ${uiDeps.join(" ")}`)} if needed.`
        )
      }
    }
  }

  spinner.stop("Done.")
}

async function installItemDependencies(cwd: string, item: RegistryItem) {
  if (!item.dependencies?.length) {
    return
  }
  const packageManager = await getPackageManager(cwd)
  await execa(
    packageManager,
    ["add", packageManager === "deno" ? "--npm" : "", ...item.dependencies],
    { cwd }
  )
}
