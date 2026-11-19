import { getContainerRenderer } from "@astrojs/solid-js/container-renderer"
import { describe, expect, it } from "vitest"

describe("getContainerRenderer", () => {
  it("keeps Astro's Solid identity and uses the official package entrypoints", () => {
    expect(getContainerRenderer()).toMatchObject({
      name: "@astrojs/solid-js",
      clientEntrypoint: "@astrojs/solid-js/client.js",
      serverEntrypoint: "@astrojs/solid-js/server.js"
    })
  })
})
