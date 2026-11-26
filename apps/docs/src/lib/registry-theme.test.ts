import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

import { createThemeCss } from "@solid-ui/registry/css"
import { MENU_TRANSLUCENT_CLASSES } from "@solid-ui/registry/menu"
import { defaultPreset } from "@solid-ui/registry/preset"
import { extractStyleMap } from "@solid-ui/registry/source"
import { describe, expect, it } from "vitest"

import { styles } from "./appearance"

describe("registry themes", () => {
  it.each(styles)("writes parent variants before dark: in %s", (theme) => {
    const map = extractStyleMap(
      readFileSync(
        resolve(`apps/docs/src/registry/styles/style-${theme}.css`),
        "utf8"
      ),
      theme
    )
    // Nested theme scopes compile `dark:group-*` to a selector that never matches.
    for (const [token, utilities] of map)
      expect({
        token,
        variants: utilities.match(/(?:^|\s)dark:(?:group|peer|in)-\S+/g) ?? []
      }).toEqual({ token, variants: [] })
  })
})

describe("installed themes", () => {
  const styleCss = (style: string) =>
    readFileSync(
      resolve(`apps/docs/src/registry/styles/style-${style}.css`),
      "utf8"
    )

  it.each(styles)("uses the CLI's translucent menu classes in %s", (style) => {
    const css = styleCss(style)
    const rule = css.slice(css.indexOf(".cn-menu-translucent {"))
    expect(rule.match(/@apply\s+([^;]+);/)?.[1]?.trim()).toBe(
      MENU_TRANSLUCENT_CLASSES
    )
  })

  it("maps every theme color the registry components use", () => {
    const docsTokens = [
      ...readFileSync(
        resolve("apps/docs/src/styles/global.css"),
        "utf8"
      ).matchAll(/--color-([a-z0-9-]+):/g)
    ].map((match) => match[1]!)
    const installed = new Set(
      [...createThemeCss(defaultPreset).matchAll(/--color-([a-z0-9-]+):/g)].map(
        (match) => match[1]!
      )
    )
    const sources = [
      ...styles.map(styleCss),
      ...["ui", "lib", "hooks", "components"].flatMap((dir) =>
        readdirSync(resolve(`apps/docs/src/registry/${dir}`))
          .filter((file) => /\.(?:tsx?|css)$/.test(file))
          .map((file) =>
            readFileSync(
              resolve(`apps/docs/src/registry/${dir}/${file}`),
              "utf8"
            )
          )
      )
    ].join("\n")
    const prefix =
      "(?:bg|text|border|border-[trblxyse]|ring|ring-offset|outline|fill|stroke|from|via|to|shadow|divide|caret|accent|decoration|placeholder)"
    const used = docsTokens.filter((token) =>
      new RegExp(`(?:^|[\\s:"'\`!(])${prefix}-${token}(?![a-z0-9-])`).test(
        sources
      )
    )
    expect(used.length).toBeGreaterThan(10)
    expect(used.filter((token) => !installed.has(token))).toEqual([])
  })
})
