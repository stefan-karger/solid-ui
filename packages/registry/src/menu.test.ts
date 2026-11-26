import { describe, expect, it } from "vitest"

import { MENU_TRANSLUCENT_CLASSES, transformMenu } from "./menu.ts"

const source = `export const content = cn(
  "cn-menu-target cn-menu-translucent z-50 rounded-lg bg-popover animate-in",
  props.class
)
const label = "cn-menu-target-like text"`

describe("transformMenu", () => {
  it("removes both markers for the default menu color", () => {
    expect(transformMenu(source, "default")).toContain(
      '"z-50 rounded-lg bg-popover animate-in"'
    )
  })

  it("inverts the menu with the dark class", () => {
    expect(transformMenu(source, "inverted")).toContain(
      '"dark z-50 rounded-lg bg-popover animate-in"'
    )
  })

  it("merges the translucent surface over the menu background", () => {
    const output = transformMenu(source, "default-translucent")
    expect(output).toContain("bg-popover/70")
    expect(output).not.toMatch(/\sbg-popover\s/)
    expect(output).not.toMatch(/cn-menu-(?:target|translucent)(?![\w-])/)
    expect(output).not.toContain(" dark ")
  })

  it("combines both for an inverted translucent menu", () => {
    const output = transformMenu(source, "inverted-translucent")
    expect(output).toMatch(/"dark z-50 rounded-lg/)
    for (const name of MENU_TRANSLUCENT_CLASSES.split(" "))
      expect(output).toContain(name)
  })

  it("leaves strings without markers alone", () => {
    expect(transformMenu(source, "inverted")).toContain(
      '"cn-menu-target-like text"'
    )
    expect(transformMenu("const a = `${b} cn-x`", "inverted")).toBe(
      "const a = `${b} cn-x`"
    )
  })
})
