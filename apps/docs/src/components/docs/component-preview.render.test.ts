import solidRenderer from "@astrojs/solid-js/server.js"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { beforeAll, describe, expect, it } from "vitest"

// Compile the lazy SSR fixture during collection, outside the render timeout.
import "~/registry/examples/button-demo"

import ComponentPreview from "../component-preview.astro"

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

  it("rejects an ordinary example requested as a block", async () => {
    await expect(
      container.renderToString(ComponentPreview, {
        props: { name: "button-demo", type: "block" }
      })
    ).rejects.toThrow('Block preview "button-demo" is not allow-listed')
  })

  it("renders UI SDK controls as markup rather than escaped HTML", async () => {
    const html = await container.renderToString(ComponentPreview, {
      props: { name: "combobox-demo", hideCode: true }
    })

    expect(html).toContain('role="combobox"')
    expect(html).not.toContain("&lt;input")
  }, 30_000)
})
