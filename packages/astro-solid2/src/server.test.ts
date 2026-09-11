import { describe, expect, it, vi } from "vitest"

import { createAstroAssetResolver } from "./server"
import type { RendererContext } from "./types"

describe("Solid server renderer assets", () => {
  it("resolves a Solid lazy module through Astro's client entry map", async () => {
    const resolve = vi.fn<(specifier: string) => Promise<string>>(async (specifier) => {
      if (specifier === "C:/workspace/apps/docs/src/registry/examples/button-demo.tsx") {
        return "/_astro/button-demo.hash.js"
      }
      throw new Error(`Unable to resolve ${specifier}`)
    })
    const result = {
      componentMetadata: new Map([["C:/workspace/apps/docs/src/pages/index.astro", {}]]),
      resolve
    } as unknown as RendererContext["result"]

    await expect(
      createAstroAssetResolver(result).resolve("src/registry/examples/button-demo.tsx")
    ).resolves.toEqual({ js: ["/_astro/button-demo.hash.js"], css: [] })
    expect(resolve).toHaveBeenCalledWith(
      "C:/workspace/apps/docs/src/registry/examples/button-demo.tsx"
    )
  })
})
