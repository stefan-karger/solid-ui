import {
  decodePreset,
  defaultPreset,
  presetOptions
} from "@solid-ui/registry/preset"
import { resolvePresetTheme } from "@solid-ui/registry/theme"
import { describe, expect, it } from "vitest"

import {
  fontGroups,
  fontLabel,
  presetColorSwatch,
  presetThemeCss
} from "./theme"

describe("preset preview", () => {
  it("scopes an inverted menu to the menu targets in the preview", () => {
    const theme = resolvePresetTheme(decodePreset("b8OmeHVSIb")!)
    expect(presetThemeCss(theme)).toContain(
      "html[data-preset-preview] .cn-menu-target{"
    )
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
