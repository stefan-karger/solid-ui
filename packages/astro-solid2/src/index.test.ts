import { describe, expect, it } from "vitest"

import solid from "./index"

describe("solid integration", () => {
  it("creates the expected Astro integration without options", () => {
    expect(() => solid()).not.toThrow()
    const integration = solid()

    expect(integration.name).toBe("@astrojs/solid-js")
    expect(integration.hooks["astro:config:setup"]).toBeTypeOf("function")
    expect(integration.hooks["astro:config:done"]).toBeTypeOf("function")
  })
})
