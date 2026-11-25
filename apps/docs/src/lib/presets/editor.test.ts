import {
  decodePreset,
  defaultPreset,
  encodePreset,
  presetOptions
} from "@solid-ui/registry/preset"
import { describe, expect, it } from "vitest"

import {
  editPreset,
  parseEditorPreset,
  shufflePreset,
  type PresetField
} from "./editor"

describe("preset editor", () => {
  it("round-trips existing shadcn presets and writes the default icon field", () => {
    for (const code of ["b0", "b2Whd5Ob2", "b1uHSoDTs", "b8OmeHVSIb"])
      expect(encodePreset(decodePreset(code)!)).toBe(code)
    expect(encodePreset(decodePreset("b2Whd5fe4")!)).toBe("b2Whd5Ob2")
    expect(parseEditorPreset(" --preset b2Whd5Ob2 ")).toEqual(
      decodePreset("b2Whd5Ob2")
    )
    expect(parseEditorPreset("--preset a2r6bw")).toBeNull()
  })

  it("sets unprotected accent and chart colors to the newly chosen base color", () => {
    const preset = {
      ...defaultPreset,
      theme: "cyan",
      chartColor: "fuchsia"
    } as const
    expect(editPreset(preset, "baseColor", "mist", new Set())).toMatchObject({
      baseColor: "mist",
      theme: "mist",
      chartColor: "mist"
    })
    expect(
      editPreset(preset, "baseColor", "mist", new Set(["theme"]))
    ).toMatchObject({
      baseColor: "mist",
      theme: "cyan",
      chartColor: "mist"
    })
    expect(
      editPreset(defaultPreset, "baseColor", "mist", new Set(["theme"]))
    ).toBeNull()
  })

  it("pairs a new body font with the heading, keeping a locked heading visually unchanged", () => {
    const preset = {
      ...defaultPreset,
      fontHeading: "playfair-display"
    } as const
    expect(editPreset(preset, "font", "roboto", new Set())).toMatchObject({
      font: "roboto",
      fontHeading: "inherit"
    })
    expect(
      editPreset(preset, "font", "roboto", new Set(["fontHeading"]))
    ).toMatchObject({
      font: "roboto",
      fontHeading: "playfair-display"
    })
    expect(
      editPreset(defaultPreset, "font", "roboto", new Set(["fontHeading"]))
    ).toMatchObject({
      font: "roboto",
      fontHeading: "inter"
    })
    expect(editPreset(preset, "fontHeading", "lora", new Set())).toMatchObject({
      font: "inter",
      fontHeading: "lora"
    })
  })

  it("shuffles to a different compatible preset while honoring dependent locks", () => {
    const preset = { ...defaultPreset, menuAccent: "bold" } as const
    const locks = new Set<PresetField>(["theme", "fontHeading", "menuAccent"])
    const next = shufflePreset(preset, locks, () => 0)
    expect(next).toMatchObject({
      baseColor: "neutral",
      theme: "neutral",
      menuAccent: "bold"
    })
    expect(
      next?.fontHeading === "inherit" ? next.font : next?.fontHeading
    ).toBe(preset.font)
    expect(next).not.toEqual(preset)
    expect(
      shufflePreset(
        preset,
        new Set(Object.keys(presetOptions) as PresetField[])
      )
    ).toBeNull()
  })
})
