import { describe, expect, it } from "vitest"

import { createSolidUiCss, createThemeCss, solidUiCssPackages } from "./css.ts"
import { decodePreset, defaultPreset } from "./preset/codec.ts"

const utilitiesCss = `/*! license */\r\n@custom-variant data-open (&:where([data-open]));\r\n`

describe("createThemeCss", () => {
  it("writes light and dark tokens, the Tailwind mapping and the radius scale", () => {
    const css = createThemeCss(defaultPreset)
    expect(css).toMatch(
      /^:root \{\n {2}--radius: 0\.625rem;\n {2}--background:/
    )
    expect(css).toContain(".dark {\n  --background:")
    expect(css).toContain("  --color-sidebar-accent: var(--sidebar-accent);")
    expect(css).toContain("  --radius-4xl: calc(var(--radius) * 2.6);")
    expect(css).toContain(
      '  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;'
    )
    expect(css).toContain("  --font-heading: var(--font-sans);")
  })

  it("leaves out the tokens only the docs site uses", () => {
    const css = createThemeCss(defaultPreset)
    for (const token of [
      "surface",
      "code",
      "selection",
      "destructive-foreground"
    ])
      expect(css).not.toContain(`--${token}:`)
  })

  it("follows the preset's colors, radius, heading font and menu accent", () => {
    const preset = decodePreset("b8OmeHVSIb")!
    const css = createThemeCss(preset)
    expect(css).toContain("--radius: 0.875rem;")
    expect(css).toContain(
      '--font-heading: "Instrument Serif", ui-serif, Georgia, serif;'
    )
    const accent = css.match(/:root \{[^}]*\n {2}--accent: ([^;]+);/)?.[1]
    const primary = css.match(/:root \{[^}]*\n {2}--primary: ([^;]+);/)?.[1]
    expect(accent).toBe(primary)
  })
})

describe("createSolidUiCss", () => {
  it("imports its packages first and embeds the utilities unchanged", () => {
    const preset = decodePreset("b8OmeHVSIb")!
    const css = createSolidUiCss({
      preset,
      utilitiesCss,
      appCss: "src/App.css"
    })
    expect(solidUiCssPackages(preset)).toEqual([
      "tw-animate-css",
      "@fontsource-variable/inter",
      "@fontsource/instrument-serif"
    ])
    expect(css).toContain("from preset b8OmeHVSIb (style")
    expect(css).toContain("Put your own styles in src/App.css.")
    const firstRule = css.indexOf("@custom-variant")
    expect(css.lastIndexOf("@import")).toBeLessThan(firstRule)
    expect(css).toContain(
      "/*! license */\n@custom-variant data-open (&:where([data-open]));\n\n:root {"
    )
    expect(css).toMatch(/@apply bg-background text-foreground;\n {2}\}\n\}\n$/)
  })
})
