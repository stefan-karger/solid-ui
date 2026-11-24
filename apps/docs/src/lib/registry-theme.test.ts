import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

import { styles } from "./appearance"
import { extractStyleMap, prepareRegistrySource } from "./registry-source"

const upstreamSelectGroup: Record<(typeof styles)[number], string> = {
  vega: "scroll-my-1 p-1",
  nova: "scroll-my-1 p-1",
  maia: "scroll-my-1 p-1",
  lyra: "scroll-my-1",
  mira: "scroll-my-1 p-1",
  luma: "scroll-my-1.5 p-1.5",
  sera: "scroll-my-1.5 p-1.5",
  rhea: "scroll-my-1.5 p-1"
}

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
      // Upstream pads each group; the list pads only ungrouped items.
      expect(new Set(map.get("cn-select-group")!.split(" "))).toEqual(
        new Set(upstreamSelectGroup[theme].split(" "))
      )
      expect(map.get("cn-select-list")).toMatch(
        /^has-\[>\[data-slot=select-item\]\]:p-[\d.]+$/
      )
      expect(map.get("cn-tabs-trigger")).not.toContain("data-selected:")
      expect(map.get("cn-switch-thumb")).toContain("rtl:-translate-x-")
      expect(map.get("cn-switch-thumb")).toContain(
        "data-unchecked:rtl:-translate-x-"
      )
      expect(map.get("cn-switch")).toContain("data-checked:")
      // Nested theme scopes compile `dark:group-*` to a selector that never matches.
      for (const [token, utilities] of map)
        expect(
          utilities.match(/(?:^|\s)dark:(?:group|peer|in)-\S+/g) ?? [],
          `${token} must write parent variants before dark:`
        ).toEqual([])
      const prepared = await prepareRegistrySource(
        'const classes = "cn-slider-thumb"',
        { registryPath: "ui/test.tsx", styleName: theme, styleCss: css }
      )
      expect(prepared.code).toBe(
        `const classes = "${map.get("cn-slider-thumb")}"`
      )
    })
  }

  for (const theme of ["luma", "rhea"])
    it(`styles the ${theme} code block copy button like upstream`, () => {
      const map = extractStyleMap(
        readFileSync(
          resolve(`apps/docs/src/registry/styles/style-${theme}.css`),
          "utf8"
        ),
        theme
      )
      expect(map.get("cn-code-block-copy-button")).toBe(
        "hover:bg-foreground/5 dark:hover:bg-foreground/10"
      )
    })

  it("keeps the upstream nova code block", () => {
    const map = extractStyleMap(
      readFileSync(
        resolve("apps/docs/src/registry/styles/style-nova.css"),
        "utf8"
      ),
      "nova"
    )
    expect(map.get("cn-code-block")).toContain("rounded-lg")
    expect(map.get("cn-code-block-variant-default")).toContain("border-input")
    expect(map.get("cn-code-block-variant-default")).not.toContain("bg-muted")
  })
})
