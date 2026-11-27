import { describe, expect, it } from "vitest"

import {
  componentsJsonJsonSchema,
  componentsJsonSchema,
  DEFAULT_ALIASES
} from "./config.ts"

describe("components.json", () => {
  it("fills in Lucide, the menu options and the ~/ aliases", () => {
    expect(
      componentsJsonSchema.parse({
        style: "nova",
        preset: "b0",
        tailwind: { css: "src/App.css" }
      })
    ).toEqual({
      style: "nova",
      preset: "b0",
      tailwind: { css: "src/App.css" },
      iconLibrary: "lucide",
      menuColor: "default",
      menuAccent: "subtle",
      aliases: DEFAULT_ALIASES
    })
  })

  it("rejects shadcn options that solidui-cli doesn't support", () => {
    const base = { style: "nova", preset: "b0", tailwind: { css: "a.css" } }
    expect(componentsJsonSchema.safeParse({ ...base, rsc: true }).success).toBe(
      false
    )
    expect(
      componentsJsonSchema.safeParse({
        ...base,
        tailwind: { css: "a.css", config: "tailwind.config.js" }
      }).success
    ).toBe(false)
    expect(
      componentsJsonSchema.safeParse({ ...base, preset: "--preset b0" }).success
    ).toBe(false)
    expect(
      componentsJsonSchema.safeParse({ ...base, style: "new-york" }).success
    ).toBe(false)
  })

  it("exports a JSON schema for editors", () => {
    const schema = componentsJsonJsonSchema()
    expect(schema).toMatchObject({
      type: "object",
      additionalProperties: false,
      required: ["style", "preset", "tailwind"]
    })
  })
})
