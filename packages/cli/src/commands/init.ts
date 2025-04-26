import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import * as p from "@clack/prompts"
import { Command } from "commander"
import { execa } from "execa"
import * as v from "valibot"

import type { RawConfig } from "@/utils/config"
import {
    DEFAULT_COMPONENTS,
    DEFAULT_CSS_FILE,
    DEFAULT_TAILWIND_CONFIG,
    DEFAULT_TAILWIND_PREFIX,
    DEFAULT_UTILS,
    RawConfigSchema,
    resolveConfigPaths
} from "@/utils/config"
import { getPackageInfo } from "@/utils/get-package-info"
import { getPackageManager } from "@/utils/get-package-manager"
import { handleError, headline, highlight, subtle } from "@/utils/logger"
import * as templates from "@/utils/templates"

const PROJECT_DEPENDENCIES = [
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge"
]

const initOptionsSchema = v.object({
  cwd: v.string()
})

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .action(async (opts) => {
    try {
      const options = v.parse(initOptionsSchema, opts)

      const cwd = path.resolve(options.cwd)
      if (!existsSync(cwd)) {
        throw new Error(`The path ${cwd} does not exist. Please try again.`)
      }

      const info = getPackageInfo()
      p.intro(headline(` ${info.name} - ${info.version} `))

      const rawConfig = await promptForConfig()

      const spinner = p.spinner()
      spinner.start(`Creating ui.config.json...`)

      const targetPath = path.resolve(cwd, "ui.config.json")
      await writeFile(targetPath, JSON.stringify(rawConfig, null, 2), "utf-8")

      spinner.stop(`ui.config.json created.`)

      const config = await resolveConfigPaths(cwd, rawConfig)

      spinner.start(`Initializing project...`)

      // make sure all the directories exist
      for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
        let dirname = path.extname(resolvedPath) ? path.dirname(resolvedPath) : resolvedPath

        if (key === "utils" && resolvedPath.endsWith("/utils")) {
          dirname = dirname.replace(/\/utils$/, "") // remove /utils at the end
        }

        if (!existsSync(dirname)) {
          await mkdir(dirname, { recursive: true })
        }
      }

      const extension = config.tsx ? "ts" : "js"

      await writeFile(
        config.resolvedPaths.tailwindConfig,
        templates.TAILWIND_CONFIG.replace("<%- prefix %>", config.tailwind.prefix),
        "utf-8"
      )

      await writeFile(config.resolvedPaths.tailwindCss, templates.TAILWIND_CSS, "utf-8")

      await writeFile(
        `${config.resolvedPaths.utils}.${extension}`,
        extension === "ts" ? templates.UTILS : templates.UTILS_JS,
        "utf-8"
      )

      spinner.stop(`Project initialized.`)

      spinner.start(`Installing dependencies...`)

      const packageManager = await getPackageManager(cwd)
      await execa(packageManager, ["add", ...PROJECT_DEPENDENCIES], { cwd })

      spinner.stop(`Dependencies installed.`)

      p.outro(
        `${highlight("Success!")} Project initialization completed. You may now add components.`
      )
    } catch (e) {
      handleError(e)
    }
  })

async function promptForConfig(): Promise<RawConfig> {
  const options = await p.group(
    {
      typescript: () =>
        p.confirm({
          message: `Would you like to use ${highlight("Typescript")} (recommended)?`,
          initialValue: true
        }),
      cssFile: () =>
        p.text({
          message: `Where is your ${highlight("global CSS")} file? ${subtle("(this file will be overwritten)")}`,
          initialValue: DEFAULT_CSS_FILE
        }),
      tailwindConfig: () =>
        p.text({
          message: `Where is your ${highlight("Tailwind config")} located? ${subtle("(this file will be overwritten)")}`,
          initialValue: DEFAULT_TAILWIND_CONFIG
        }),
      tailwindPrefix: () =>
        p.text({
          message: `Are you using a custom ${highlight("tailwind prefix eg. tw-")}? (Leave blank if not)`,
          initialValue: DEFAULT_TAILWIND_PREFIX
        }),
      components: () =>
        p.text({
          message: `Configure the import alias for ${highlight("components")}:`,
          initialValue: DEFAULT_COMPONENTS
        }),
      utils: () =>
        p.text({
          message: `Configure the import alias for ${highlight("utils")}:`,
          initialValue: DEFAULT_UTILS
        })
    },
    {
      onCancel: () => {
        p.cancel("Cancelled.")
        process.exit(0)
      }
    }
  )

  return v.parse(RawConfigSchema, {
    $schema: "https://solid-ui.com/schema.json",
    tsx: options.typescript,
    tailwind: {
      css: options.cssFile,
      config: options.tailwindConfig,
      prefix: options.tailwindPrefix
    },
    aliases: {
      components: options.components,
      utils: options.utils
    }
  })
}
