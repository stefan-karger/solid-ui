import type { AstroIntegration, AstroIntegrationLogger, AstroRenderer } from "astro"
import type { Plugin, PluginOption } from "vite"
import solid, { type Options as ViteSolidPluginOptions } from "vite-plugin-solid"

import { getContainerRenderer as getContainerRendererImpl } from "./container-renderer"

type DevtoolsPluginOptions = {
  autoname?: boolean
  locator?:
    | boolean
    | {
        targetIDE?: string
        key?: string
        jsxLocation?: boolean
        componentLocation?: boolean
      }
}
type DevtoolsPlugin = (_options?: DevtoolsPluginOptions) => PluginOption

async function getDevtoolsPlugin(logger: AstroIntegrationLogger, retrieve: boolean) {
  if (!retrieve) return null

  try {
    const devtoolsEntrypoint = "solid-devtools/vite"
    return (await import(/* @vite-ignore */ devtoolsEntrypoint)).default as DevtoolsPlugin
  } catch {
    logger.warn(
      "Solid Devtools requires `solid-devtools` as a peer dependency, add it to your project."
    )
    return null
  }
}

function getViteConfiguration(
  { include, exclude }: Options,
  devtoolsPlugin: DevtoolsPlugin | null
) {
  const plugins: PluginOption[] = [
    solid({
      ...(include === undefined ? {} : { include }),
      ...(exclude === undefined ? {} : { exclude }),
      ssr: true
    }),
    configEnvironmentPlugin()
  ]

  if (devtoolsPlugin) plugins.push(devtoolsPlugin({ autoname: true }))
  return { plugins }
}

/** @deprecated Import from `@solid-ui/astro-solid2/container-renderer` instead. */
export function getContainerRenderer(): AstroRenderer {
  console.warn(
    "[@solid-ui/astro-solid2] Importing `getContainerRenderer` from `@solid-ui/astro-solid2` is deprecated. Import it from `@solid-ui/astro-solid2/container-renderer` instead."
  )
  return getContainerRendererImpl()
}

export interface Options extends Pick<ViteSolidPluginOptions, "include" | "exclude"> {
  devtools?: boolean
}

export default function (options: Options = {}): AstroIntegration {
  return {
    name: "@astrojs/solid-js",
    hooks: {
      "astro:config:setup": async ({
        command,
        addRenderer,
        updateConfig,
        injectScript,
        logger
      }) => {
        const devtoolsPlugin = await getDevtoolsPlugin(
          logger,
          !!options.devtools && command === "dev"
        )

        addRenderer(getContainerRendererImpl())
        updateConfig({ vite: getViteConfiguration(options, devtoolsPlugin) })
        if (devtoolsPlugin) injectScript("page", 'import "solid-devtools";')
      },
      "astro:config:done": ({ logger, config }) => {
        const knownJsxRenderers = new Set([
          "@astrojs/react",
          "@astrojs/preact",
          "@astrojs/solid-js"
        ])
        const enabledKnownJsxRenderers = config.integrations.filter((renderer) =>
          knownJsxRenderers.has(renderer.name)
        )

        if (enabledKnownJsxRenderers.length > 1 && !options.include && !options.exclude) {
          logger.warn(
            "More than one JSX renderer is enabled. This will lead to unexpected behavior unless you set the `include` or `exclude` option. See https://docs.astro.build/en/guides/integrations-guide/solid-js/#combining-multiple-jsx-frameworks for more information."
          )
        }
      }
    }
  }
}

function configEnvironmentPlugin(): Plugin {
  return {
    name: "@astrojs/solid:config-environment",
    configEnvironment(environmentName) {
      return {
        optimizeDeps: {
          include: environmentName === "client" ? ["@solid-ui/astro-solid2/client.js"] : [],
          exclude: ["@solid-ui/astro-solid2/server.js"]
        }
      }
    }
  }
}
