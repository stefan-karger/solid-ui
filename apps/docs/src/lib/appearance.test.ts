import { describe, expect, it } from "vitest"

import {
  appearanceBootstrap,
  appearanceKey,
  colorModeBootstrap,
  isDocsStyle,
  readAppearance,
  styles
} from "./appearance"

describe("documentation appearance", () => {
  it("reads supported styles and explicit color preferences", () => {
    expect(styles).toEqual([
      "vega",
      "nova",
      "maia",
      "lyra",
      "mira",
      "luma",
      "sera",
      "rhea"
    ])
    expect(
      readAppearance({ getItem: () => '{"style":"lyra","mode":"dark"}' })
    ).toEqual({
      style: "lyra",
      mode: "dark"
    })
    expect(isDocsStyle("luma")).toBe(true)
    expect(isDocsStyle("luna")).toBe(false)
  })
  it("uses system color mode when no preference exists and rejects corrupt data", () => {
    expect(readAppearance({ getItem: () => null }, true)).toEqual({
      style: "nova",
      mode: "dark"
    })
    expect(
      readAppearance({ getItem: () => '{"style":"unknown","mode":"oops"}' })
    ).toEqual({
      style: "nova",
      mode: "light"
    })
    expect(readAppearance({ getItem: () => "broken" })).toEqual({
      style: "nova",
      mode: "light"
    })
  })
  it("handles unavailable storage and applies saved appearance before hydration", () => {
    expect(
      readAppearance({
        getItem: () => {
          throw new Error("blocked")
        }
      })
    ).toEqual({ style: "nova", mode: "light" })
    localStorage.setItem(appearanceKey, '{"style":"mira","mode":"dark"}')
    new Function(appearanceBootstrap)()
    expect(document.documentElement.dataset.docsStyle).toBe("mira")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    localStorage.removeItem(appearanceKey)
    document.documentElement.classList.remove("dark", "style-mira")
  })

  it("bootstraps the saved color mode without switching the preset style", () => {
    const root = document.documentElement
    root.classList.add("dark", "style-sera")
    localStorage.setItem(appearanceKey, '{"style":"mira","mode":"light"}')
    try {
      new Function(colorModeBootstrap)()
      expect(root.classList.value).toBe("style-sera")
      expect(root.dataset.colorMode).toBe("light")
      expect(root.style.colorScheme).toBe("light")
    } finally {
      localStorage.removeItem(appearanceKey)
      root.classList.remove("style-sera")
      delete root.dataset.colorMode
      root.style.removeProperty("color-scheme")
    }
  })
})
