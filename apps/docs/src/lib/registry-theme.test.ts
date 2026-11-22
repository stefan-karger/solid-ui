import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

import { styles } from "./appearance"
import { extractStyleMap, prepareRegistrySource } from "./registry-source"

describe("registry themes", () => {
  for (const theme of styles) {
    it(`uses SDK state selectors in ${theme} and exports the same styles`, async () => {
      const css = readFileSync(
        resolve(`apps/docs/src/registry/styles/style-${theme}.css`),
        "utf8"
      )
      const map = extractStyleMap(css, theme)
      expect(map.get("cn-slider-thumb")).toContain("has-[:focus-visible]:")
      expect(map.get("cn-slider-thumb")).not.toMatch(/(?<![\w-])active:/)
      expect(map.get("cn-command-group")).toContain(
        "data-[slot=command-group-label]"
      )
      expect(map.get("cn-input-group")).toContain("data-ui=input-group-control")
      expect(map.get("cn-combobox-content")).toContain("data-ending-style:")
      expect(map.get("cn-combobox-empty")).toContain("data-empty:flex")
      expect(map.get("cn-combobox-empty")).not.toContain("group-data-empty")
      expect(map.get("cn-navigation-menu-link")).toContain("data-current:")
      expect(map.get("cn-input-otp-slot")).toContain("data-active:")
      expect(map.get("cn-select-list")).toMatch(/^p-\d+(?:\.\d+)?$/)
      expect(map.get("cn-select-group")).not.toMatch(/\bp-[\d.]+\b/)
      expect(map.get("cn-tabs-trigger")).not.toContain("data-selected:")
      expect(map.get("cn-switch-thumb")).toContain("rtl:-translate-x-")
      expect(map.get("cn-switch-thumb")).toContain(
        "data-unchecked:rtl:-translate-x-"
      )
      expect(map.get("cn-switch")).toContain("data-checked:")
      const prepared = await prepareRegistrySource(
        'const classes = "cn-slider-thumb"',
        { registryPath: "ui/test.tsx", styleName: theme, styleCss: css }
      )
      expect(prepared.code).toBe(
        `const classes = "${map.get("cn-slider-thumb")}"`
      )
    })
  }
})
