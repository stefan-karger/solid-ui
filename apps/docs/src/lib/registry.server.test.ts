import { describe, expect, it } from "vitest"

import { registry } from "~/registry"
import type { Registry } from "~/registry/schema"

import {
  getRegistryFile,
  getRegistrySource,
  getBlockPreviews,
  normalizeRegistryPath,
  resolvePreview,
  toRegistryModuleId,
  validateRegistryCatalog
} from "./registry.server"

const previewModules = import.meta.glob<{ default?: unknown }>(
  [
    "../registry/examples/**/*.{tsx,jsx}",
    "../registry/components/**/*.{tsx,jsx}",
    "../registry/blocks/**/*.{tsx,jsx}"
  ],
  { eager: true }
)

describe("registry catalog", () => {
  it("normalizes Windows separators into canonical module IDs", () => {
    expect(
      normalizeRegistryPath("examples\\button-demo.tsx", "button-demo")
    ).toBe("examples/button-demo.tsx")
    expect(toRegistryModuleId("examples/button-demo.tsx")).toBe(
      "/src/registry/examples/button-demo.tsx"
    )
  })

  it.each([
    "",
    "/absolute.ts",
    "C:\\absolute.ts",
    "a//b.ts",
    "a/./b.ts",
    "a/../b.ts"
  ])("rejects unsafe path %j", (path) =>
    expect(() => normalizeRegistryPath(path, "fixture")).toThrow(/invalid/)
  )

  it("rejects duplicate and unsafe names", () => {
    const file = {
      path: "examples/demo.tsx",
      type: "registry:example" as const
    }
    const available = new Set(["/src/registry/examples/demo.tsx"])
    const base = { name: "Test", homepage: "https://example.com" }
    expect(() =>
      validateRegistryCatalog(
        {
          ...base,
          items: [{ name: "Bad Name", type: "registry:example", files: [file] }]
        },
        available
      )
    ).toThrow("not route-safe")
    expect(() =>
      validateRegistryCatalog(
        {
          ...base,
          items: [
            { name: "demo", type: "registry:example", files: [file] },
            { name: "demo", type: "registry:example", files: [file] }
          ]
        },
        available
      )
    ).toThrow("Duplicate")
  })

  it("resolves real source and preview entries", () => {
    expect(getRegistryFile("button").path).toBe("ui/button.tsx")
    expect(resolvePreview("button-demo").moduleId).toBe(
      "/src/registry/examples/button-demo.tsx"
    )
    expect(resolvePreview("button-rtl").moduleId).toBe(
      "/src/registry/examples/button-rtl.tsx"
    )
    expect(() => resolvePreview("button")).toThrow(
      "cannot be previewed directly"
    )
  })

  it("exposes only allow-listed block previews", () => {
    expect(resolvePreview("sidebar-demo").blockPreview).toBe(true)
    expect(resolvePreview("button-demo").blockPreview).toBe(false)

    const names = getBlockPreviews().map((descriptor) => descriptor.name)
    expect(names).toContain("sidebar-demo")
    expect(names).not.toContain("button-demo")
  })

  it("rejects block-preview metadata on non-previewable items", () => {
    const fixture = {
      name: "Test",
      homepage: "https://example.com",
      items: [
        {
          name: "button",
          type: "registry:ui",
          meta: { docs: { blockPreview: true } }
        }
      ]
    } satisfies Registry

    expect(() => validateRegistryCatalog(fixture, new Set())).toThrow(
      'Item "button" uses blockPreview but is not previewable'
    )
  })

  it("rejects non-boolean block-preview metadata", () => {
    const fixture = {
      name: "Test",
      homepage: "https://example.com",
      items: [
        {
          name: "demo",
          type: "registry:example",
          meta: { docs: { blockPreview: "yes" } },
          files: [{ path: "examples/demo.tsx", type: "registry:example" }]
        }
      ]
    } satisfies Registry

    expect(() =>
      validateRegistryCatalog(
        fixture,
        new Set(["/src/registry/examples/demo.tsx"])
      )
    ).toThrow('Item "demo" has invalid meta.docs')
  })

  it("prepares the RTL Button example for display", async () => {
    const source = await getRegistrySource({ name: "button-rtl" })

    expect(source.code).toContain("data-provider-direction={direction()}")
    expect(source.code).not.toMatch(/\bcn-[a-z0-9-]+\b/)
  })

  it("requires declared files to exist", () => {
    const fixture = {
      name: "Test",
      homepage: "https://example.com",
      items: [
        {
          name: "missing",
          type: "registry:example",
          files: [{ path: "examples/missing.tsx", type: "registry:example" }]
        }
      ]
    } satisfies Registry
    expect(() => validateRegistryCatalog(fixture, new Set())).toThrow(
      "declares missing file"
    )
  })

  it("imports every SSR-safe preview with a callable default export", () => {
    for (const item of registry.items) {
      // Components such as `example` are helper modules with named exports.
      if (!["registry:example", "registry:block"].includes(item.type)) continue

      const descriptor = resolvePreview(item.name)
      if (descriptor.clientOnly) continue
      const relativeId = `..${descriptor.moduleId.replace("/src", "")}`
      expect(previewModules[relativeId]).toBeDefined()
      expect(previewModules[relativeId]?.default).toBeTypeOf("function")
    }
  })

  it("prepares every declared registry file without internal style helpers", async () => {
    const preparedSources = await Promise.all(
      registry.items.flatMap((item) =>
        (item.files ?? []).map(async (file) => ({
          context: `${item.name}: ${file.path}`,
          source: await getRegistrySource({ name: item.name, file: file.path })
        }))
      )
    )

    for (const { context, source } of preparedSources) {
      const unresolved = source.code.match(/\bcn-[a-z0-9-]+\b/)
      expect(
        unresolved ? { context, unresolved: unresolved[0] } : undefined
      ).toBeUndefined()
    }
  })
})
