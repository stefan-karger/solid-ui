import {
  Loading,
  NoHydration,
  createComponent,
  renderToString,
  renderToStream,
  ssr
} from "@solidjs/web"
import type { AssetResolver } from "@solidjs/web"
import type { NamedSSRLoadedRendererValue } from "astro"

import { getContext, incrementId } from "./context"
import type { RendererContext } from "./types"

const slotName = (str: string) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase())

type RenderStrategy = "sync" | "async"

export function createAstroAssetResolver(result: RendererContext["result"]): AssetResolver {
  const sourcePath = [...result.componentMetadata.keys()].find((path) =>
    path.replaceAll("\\", "/").includes("/src/")
  )
  const normalizedSourcePath = sourcePath?.replaceAll("\\", "/")
  const sourceRoot = normalizedSourcePath?.slice(0, normalizedSourcePath.indexOf("/src/") + 1)

  return {
    async resolve(moduleUrl) {
      const candidates = [
        moduleUrl,
        moduleUrl.startsWith("/") ? moduleUrl : `/${moduleUrl}`,
        sourceRoot ? `${sourceRoot}${moduleUrl.replace(/^\//, "")}` : undefined
      ].filter((candidate): candidate is string => Boolean(candidate))

      const resolvedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          try {
            return await result.resolve(candidate)
          } catch {
            return undefined
          }
        })
      )
      const url = resolvedCandidates.find((candidate) => candidate !== undefined)
      if (url) return { js: [url], css: [] }
      return null
    },
    resolveSync() {
      return null
    }
  }
}

async function check(
  this: RendererContext,
  Component: any,
  props: Record<string, any>,
  children: any
) {
  if (typeof Component !== "function") return false
  if (Component.name === "QwikComponent") return false
  const componentStr = Component.toString()
  if (componentStr.includes("$$payload") || componentStr.includes("$$renderer")) return false

  let html: string | undefined
  try {
    const result = await renderToStaticMarkup.call(this, Component, props, children, {
      renderStrategy: "sync" as RenderStrategy
    })
    html = result.html
  } catch {}

  return typeof html === "string"
}

async function renderToStaticMarkup(
  this: RendererContext,
  Component: any,
  props: Record<string, any>,
  { default: children, ...slotted }: any,
  metadata?: Record<string, any>
) {
  const ctx = getContext(this.result)
  const renderId = metadata?.hydrate ? incrementId(ctx) : ""
  const needsHydrate = metadata?.astroStaticSlot ? !!metadata.hydrate : true
  const tagName = needsHydrate ? "astro-slot" : "astro-static-slot"
  const renderStrategy = (metadata?.renderStrategy ?? "async") as RenderStrategy
  const assetResolver = createAstroAssetResolver(this.result)

  const renderFn = () => {
    const slots: Record<string, any> = {}
    for (const [key, value] of Object.entries(slotted)) {
      const name = slotName(key)
      slots[name] = ssr(`<${tagName} name="${name}">${value}</${tagName}>`)
    }
    const newProps = {
      ...props,
      ...slots,
      children: children != null ? ssr(`<${tagName}>${children}</${tagName}>`) : children
    }

    if (renderStrategy === "sync") {
      return createComponent(Component, newProps)
    }
    if (needsHydrate) {
      return createComponent(Loading, {
        get children() {
          return createComponent(Component, newProps)
        }
      })
    }
    return createComponent(NoHydration, {
      get children() {
        return createComponent(Loading, {
          get children() {
            return createComponent(Component, newProps)
          }
        })
      }
    })
  }

  const componentHtml =
    renderStrategy === "async"
      ? await renderToStream(renderFn, {
          renderId,
          manifest: assetResolver,
          ...({ noScripts: !needsHydrate } as any)
        })
      : renderToString(renderFn, { renderId, manifest: assetResolver })

  return {
    attrs: {
      "data-solid-render-id": renderId
    },
    html: componentHtml
  }
}

const renderer: NamedSSRLoadedRendererValue = {
  name: "@astrojs/solid",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true
}

export default renderer
