import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

import { extractStyleMap, prepareRegistrySource } from "./registry-source"
import { adaptTheme } from "./registry-theme"

const read = (path: string) => readFileSync(resolve(path), "utf8")
const manifest = JSON.parse(read("vendor/shadcn/revision.json")) as {
  files: Record<string, string>
}
const normalized = (css: string) =>
  Object.fromEntries(
    [...extractStyleMap(css, "test")].map(([key, value]) => [key, value.split(/\s+/).sort()])
  )

describe("pinned upstream themes", () => {
  for (const [file, hash] of Object.entries(manifest.files)) {
    it(`preserves ${file} and shares its SDK adaptation with installed source`, async () => {
      const source = read(`vendor/shadcn/styles/${file}`)
      expect(createHash("sha256").update(source).digest("hex")).toBe(hash)
      const theme = file.slice(6, -4)
      const adapted = adaptTheme(source, read(`vendor/shadcn/delta-${theme}.css`))
      const generated = read(`apps/docs/src/registry/styles/${file}`)
      expect(normalized(generated)).toEqual(normalized(adapted))
      const map = extractStyleMap(generated, theme)
      expect(map.get("cn-slider-thumb")).toContain("has-[:focus-visible]:")
      expect(map.get("cn-slider-thumb")).not.toMatch(/(?<![\w-])active:/)
      expect(map.get("cn-command-group")).toContain("data-[slot=command-group-label]")
      expect(map.get("cn-input-group")).toContain("data-ui=input-group-control")
      expect(map.get("cn-combobox-content")).toContain("data-ending-style:")
      expect(map.get("cn-combobox-empty")).toContain("data-empty:flex")
      expect(map.get("cn-combobox-empty")).not.toContain("group-data-empty")
      expect(map.get("cn-navigation-menu-link")).toContain("data-current:")
      expect(map.get("cn-input-otp-slot")).toContain("data-active:")
      expect(map.get("cn-drawer-content")).not.toContain("vaul-drawer-direction")
      expect(map.get("cn-drawer-content")?.includes("data-[side=bottom]:")).toBe(
        source.includes("data-[vaul-drawer-direction=bottom]:")
      )
      const original = extractStyleMap(source, theme)
      expect(map.get("cn-tabs-trigger")?.includes("data-[selected]:")).toBe(
        /\bdata-(?:selected|active):/.test(original.get("cn-tabs-trigger") ?? "")
      )
      expect(map.get("cn-tabs-trigger")).not.toContain("data-selected:")
      expect(map.get("cn-switch-thumb")).toContain("rtl:-translate-x-")
      expect(map.get("cn-switch-thumb")).toContain("data-unchecked:rtl:-translate-x-")
      expect(map.get("cn-switch")?.split(/\s+/).sort()).toEqual(
        original
          .get("cn-switch")
          ?.replace(/\bdata-selected(?=[:/])/g, "data-[selected]")
          .split(/\s+/)
          .sort()
      )
      const prepared = await prepareRegistrySource(
        'const classes = "cn-slider-thumb cn-command-group cn-input-group"',
        { registryPath: "ui/test.tsx", styleName: theme, styleCss: generated }
      )
      expect(prepared.code).toContain("has-[:focus-visible]:")
      expect(prepared.code).toContain("data-ui=input-group-control")
      expect(prepared.code).not.toContain("cn-")
    })
  }
})
