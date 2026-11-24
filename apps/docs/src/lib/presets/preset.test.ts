import { describe, expect, it } from "vitest"

import { decodePreset, defaultPreset, presetOptions } from "./decode"
import {
  fontGroups,
  fontLabel,
  presetColorSwatch,
  presetThemeCss,
  resolvePresetTheme
} from "./theme"

describe("shadcn presets", () => {
  it("decodes the upstream example without exposing the icon library", () => {
    const preset = decodePreset("b2Whd5Ob2")
    expect(preset).toEqual({
      style: "sera",
      baseColor: "mist",
      theme: "cyan",
      chartColor: "fuchsia",
      font: "geist",
      fontHeading: "inherit",
      radius: "none",
      menuAccent: "subtle",
      menuColor: "default"
    })
    expect(decodePreset("b2Whd5fe4")).toEqual(preset)
  })

  it("accepts the zero code and rejects unsupported or malformed codes", () => {
    expect(decodePreset("b0")).toEqual(defaultPreset)
    for (const code of [
      "",
      "b",
      "a0",
      "c0",
      "b2+W",
      "bzzzzzzzzz",
      "b0000000000"
    ])
      expect(decodePreset(code)).toBeNull()
  })

  it("merges the base, accent and chart palettes in each mode", () => {
    const theme = resolvePresetTheme(decodePreset("b2Whd5Ob2")!)
    expect(theme.light).toMatchObject({
      foreground: "oklch(0.148 0.004 228.8)",
      primary: "oklch(0.52 0.105 223.128)",
      "chart-2": "oklch(0.667 0.295 322.15)",
      radius: "0px"
    })
    expect(theme.dark.primary).toBe("oklch(0.45 0.085 224.283)")
    expect(theme.headingFamily).toBe("Geist Variable")
  })

  it("resolves an independent heading font and an inverted, bold menu", () => {
    const theme = resolvePresetTheme(decodePreset("b8OmeHVSIb")!)
    expect(theme.fontFamily).toBe("Inter Variable")
    expect(theme.headingFamily).toBe("Instrument Serif")
    expect(theme.radius).toBe("0.875rem")
    expect(theme.light.accent).toBe(theme.light.primary)
    expect(theme.invertedMenu).toBe(true)
    expect(presetThemeCss(theme)).toContain("html[data-preset-preview] :is(")
  })

  it("keeps translucent accents subtle and applies the radius limits of each style", () => {
    const config = {
      ...defaultPreset,
      theme: "blue",
      menuAccent: "bold",
      menuColor: "inverted-translucent"
    } as const
    const theme = resolvePresetTheme(config)
    expect(theme.translucentMenu).toBe(true)
    expect(theme.light.accent).toBe("oklch(0.97 0 0)")
    expect(
      resolvePresetTheme({ ...config, style: "lyra", radius: "large" }).radius
    ).toBe("0px")
    expect(
      resolvePresetTheme({ ...config, style: "rhea", radius: "large" }).radius
    ).toBe("0.625rem")
  })

  it("uses the selected base when a palette isn't available for it", () => {
    const theme = resolvePresetTheme({
      ...defaultPreset,
      baseColor: "mist",
      theme: "gray",
      chartColor: "stone"
    })
    expect(theme.light.primary).toBe("oklch(0.218 0.008 223.9)")
    expect(theme.light["chart-1"]).toBe("oklch(0.872 0.007 219.6)")
  })
})

describe("create picker data", () => {
  it("groups every supported font once, in shadcn's picker order", () => {
    const grouped = fontGroups.flatMap((group) => group.fonts)
    expect(new Set(grouped).size).toBe(grouped.length)
    expect([...grouped].sort()).toEqual([...presetOptions.font].sort())
    expect(fontGroups.map((group) => group.label)).toEqual([
      "Sans",
      "Mono",
      "Serif"
    ])
    expect(fontLabel("source-sans-3")).toBe("Source Sans 3")
  })

  it("uses muted foreground for base color swatches and primary for accents", () => {
    expect(presetColorSwatch("stone")).not.toBe(presetColorSwatch("cyan"))
    expect(presetColorSwatch("cyan")).toBe(
      resolvePresetTheme({ ...defaultPreset, theme: "cyan" }).dark.primary
    )
  })
})
