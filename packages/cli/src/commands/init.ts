import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import * as p from "@clack/prompts"
import { Command } from "commander"
import { execa } from "execa"
import * as v from "valibot"

import type { RawConfig } from "~/utils/config"
import {
  DEFAULT_COMPONENTS,
  DEFAULT_CSS_FILE,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_TAILWIND_PREFIX,
  DEFAULT_UTILS,
  RawConfigSchema,
  resolveConfigPaths
} from "~/utils/config"
import { getPackageInfo } from "~/utils/get-package-info"
import { getPackageManager } from "~/utils/get-package-manager"
import { handleError, headline, highlight, subtle } from "~/utils/logger"
import * as templates from "~/utils/templates"

const PROJECT_DEPENDENCIES = [
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge"
]

const COLOR_MODE_DEPENDENCIES = ["@kobalte/core"]

const TAILWIND_DEV_DEPENDENCIES = ["tailwindcss", "postcss", "autoprefixer"]

const initOptionsSchema = v.object({
  cwd: v.string(),
  yes: v.boolean(),
  withColorMode: v.boolean(),
  withTailwind: v.boolean()
})

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("-y, --yes", "use defaults without prompts", false)
  .option("--with-color-mode", "install @kobalte/core and write COLOR_MODE.md snippets", false)
  .option(
    "--with-tailwind",
    "also install tailwindcss, postcss, and autoprefixer (devDependencies)",
    false
  )
  .action(async (opts) => {
    try {
      const options = v.parse(initOptionsSchema, {
        cwd: opts.cwd,
        yes: opts.yes ?? false,
        withColorMode: opts.withColorMode ?? false,
        withTailwind: opts.withTailwind ?? false
      })

      const cwd = path.resolve(options.cwd)
      if (!existsSync(cwd)) {
        throw new Error(`The path ${cwd} does not exist. Please try again.`)
      }

      const info = getPackageInfo()
      p.intro(headline(` ${info.name} - ${info.version} `))

      const rawConfig = options.yes ? getDefaultConfig() : await promptForConfig()

      const spinner = p.spinner()
      spinner.start(`Creating ui.config.json...`)

      const targetPath = path.resolve(cwd, "ui.config.json")
      await writeFile(targetPath, JSON.stringify(rawConfig, null, 2), "utf-8")

      spinner.stop(`ui.config.json created.`)

      const config = await resolveConfigPaths(cwd, rawConfig)

      spinner.start(`Initializing project...`)

      for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
        let dirname = path.extname(resolvedPath) ? path.dirname(resolvedPath) : resolvedPath

        if (key === "utils" && resolvedPath.endsWith("/utils")) {
          dirname = dirname.replace(/\/utils$/, "")
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

      if (options.withColorMode) {
        await writeFile(path.resolve(cwd, "COLOR_MODE.md"), templates.COLOR_MODE_SNIPPETS, "utf-8")
      }

      spinner.stop(`Project initialized.`)

      spinner.start(`Installing dependencies...`)

      const packageManager = await getPackageManager(cwd)
      const deps = [...PROJECT_DEPENDENCIES]
      if (options.withColorMode) {
        deps.push(...COLOR_MODE_DEPENDENCIES)
      }

      await execa(
        packageManager,
        ["add", packageManager === "deno" ? "--npm" : "", ...deps],
        { cwd }
      )

      if (options.withTailwind) {
        const postcssPath = path.resolve(cwd, "postcss.config.cjs")
        if (!existsSync(postcssPath)) {
          await writeFile(postcssPath, templates.POSTCSS_CONFIG, "utf-8")
        }
        await execa(
          packageManager,
          [
            "add",
            "-D",
            packageManager === "deno" ? "--npm" : "",
            ...TAILWIND_DEV_DEPENDENCIES
          ],
          { cwd }
        )
      }

      spinner.stop(`Dependencies installed.`)

      const outroLines = [
        `${highlight("Success!")} Project initialization completed. You may now add components.`,
        `Registry URL: ${highlight(process.env.SOLIDUI_REGISTRY_URL ?? "https://www.solid-ui.com")}`
      ]
      if (options.withColorMode) {
        outroLines.push(`See ${highlight("COLOR_MODE.md")} for ColorModeProvider setup.`)
      }
      if (options.withTailwind) {
        outroLines.push(`Add PostCSS config if missing: postcss.config.cjs with tailwindcss + autoprefixer.`)
      }

      p.outro(outroLines.join("\n"))
    } catch (e) {
      handleError(e)
    }
  })

function getDefaultConfig(): RawConfig {
  return v.parse(RawConfigSchema, {
    $schema: "https://solid-ui.com/schema.json",
    tsx: true,
    tailwind: {
      css: DEFAULT_CSS_FILE,
      config: DEFAULT_TAILWIND_CONFIG,
      prefix: DEFAULT_TAILWIND_PREFIX
    },
    aliases: {
      components: DEFAULT_COMPONENTS,
      utils: DEFAULT_UTILS
    }
  })
}

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
