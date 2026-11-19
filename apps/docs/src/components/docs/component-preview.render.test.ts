import solidRenderer from "@astrojs/solid-js/server.js"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { beforeAll, describe, expect, it } from "vitest"

// Compile the lazy SSR fixture during collection, outside the render timeout.
import "~/registry/examples/button-demo"

import ComponentPreview from "../component-preview.astro"

const occurrences = (value: string, search: string) => value.split(search).length - 1

describe("ComponentPreview", () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>

  beforeAll(async () => {
    container = await AstroContainer.create()
    container.addServerRenderer({ renderer: solidRenderer })
    container.addClientRenderer({
      name: solidRenderer.name,
      entrypoint: "@astrojs/solid-js/client.js"
    })
  })

  it("renders an allow-listed block through mobile and desktop iframes", async () => {
    const html = await container.renderToString(ComponentPreview, {
      props: { name: "sidebar-demo", type: "block" }
    })

    expect(occurrences(html, "<iframe")).toBe(2)
    expect(occurrences(html, 'src="/view/sidebar-demo"')).toBe(2)
    expect(occurrences(html, 'title="sidebar-demo preview"')).toBe(2)
    expect(html).toContain("absolute inset-0 hidden w-[1600px] bg-background md:block")
    expect(html).not.toContain("left-1/2")
    expect(html).not.toContain("-translate-x-1/2")
  })

  it("forwards block attributes and skips figure and code disclosure markup", async () => {
    const html = await container.renderToString(ComponentPreview, {
      props: {
        name: "sidebar-demo",
        type: "block",
        class: "block-preview-custom",
        previewClassName: "block-preview-size",
        "data-example": "sidebar"
      }
    })

    expect(html.trimStart()).toMatch(/^<div\b/)
    expect(html).toContain("block-preview-custom")
    expect(html).toContain("block-preview-size")
    expect(html).toContain('data-example="sidebar"')
    expect(html).not.toContain("<figure")
    expect(html).not.toContain('data-slot="code"')
  })

  it("rejects an ordinary example requested as a block", async () => {
    await expect(
      container.renderToString(ComponentPreview, {
        props: { name: "button-demo", type: "block" }
      })
    ).rejects.toThrow('Block preview "button-demo" is not allow-listed')
  })

  it("preserves the regular preview slot when code is hidden", async () => {
    const html = await container.renderToString(ComponentPreview, {
      props: { name: "button-demo", hideCode: true }
    })

    expect(html).toContain("<figure")
    expect(html).toContain('data-slot="preview"')
    expect(html).toContain('aria-label="Submit"')
    expect(html).not.toContain('data-slot="code"')
  }, 30_000)

  it("renders UI SDK controls as markup rather than escaped HTML", async () => {
    const html = await container.renderToString(ComponentPreview, {
      props: { name: "combobox-demo", hideCode: true }
    })

    expect(html).toContain('role="combobox"')
    expect(html).not.toContain("&lt;input")
  }, 30_000)
})
