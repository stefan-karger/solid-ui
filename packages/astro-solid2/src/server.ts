import {
  Loading,
  NoHydration,
  createComponent,
  generateHydrationScript,
  renderToString,
  renderToStream,
  ssr
} from "@solidjs/web"
import type { NamedSSRLoadedRendererValue } from "astro"

import { getContext, incrementId } from "./context"
import type { RendererContext } from "./types"

const slotName = (str: string) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase())

type RenderStrategy = "sync" | "async"

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
          ...({ noScripts: !needsHydrate } as any)
        })
      : renderToString(renderFn, { renderId })

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
  supportsAstroStaticSlot: true,
  renderHydrationScript: () => generateHydrationScript()
}

export default renderer
