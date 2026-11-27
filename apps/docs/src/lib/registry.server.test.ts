import type { Registry } from "@solid-ui/registry/schema"
import { describe, expect, it } from "vitest"

import { registry } from "~/registry"

import {
  getRegistryFile,
  getRegistrySource,
  resolvePreview,
  validateRegistryCatalog
} from "./registry.server"

describe("registry catalog", () => {
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

  it("ships icons inline, hidden unless they are named", async () => {
    const findings: string[] = []
    for (const item of registry.items) {
      for (const file of item.files ?? []) {
        const { code } = await getRegistrySource({
          name: item.name,
          file: file.path
        })
        // Lucide still targets Solid 1, so registry files must not import it.
        if (code.includes('from "lucide-solid"'))
          findings.push(`${file.path}: imports lucide-solid`)
        for (const [svg] of code.matchAll(/<svg\b[^>]*>/g))
          if (!/aria-hidden="true"|aria-label=|\{\.\.\.props\}/.test(svg))
            findings.push(`${file.path}: unlabeled visible svg`)
      }
    }
    expect(findings).toEqual([])
  })
})
