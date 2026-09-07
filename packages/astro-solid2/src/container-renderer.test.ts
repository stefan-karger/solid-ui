import { describe, expect, it } from "vitest"

import { getContainerRenderer } from "./container-renderer"

describe("getContainerRenderer", () => {
  it("keeps Astro's Solid identity and uses private entrypoints", () => {
    expect(getContainerRenderer()).toMatchObject({
      name: "@astrojs/solid-js",
      clientEntrypoint: "@solid-ui/astro-solid2/client.js",
      serverEntrypoint: "@solid-ui/astro-solid2/server.js"
    })
  })
})
