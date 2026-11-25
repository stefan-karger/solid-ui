import { describe, expect, it } from "vitest"

import { patchAppCss } from "./app-css"

describe("patchAppCss", () => {
  it("declares the ui-sdk layer first and imports solid-ui.css after Tailwind", () => {
    const css = `@import "@fontsource/inter";\n@import "tailwindcss";\n\nbody { margin: 0; }\n`
    expect(patchAppCss(css)).toBe(
      `@layer ui-sdk;\n\n@import "@fontsource/inter";\n@import "tailwindcss";\n@import "./solid-ui.css";\n\nbody { margin: 0; }\n`
    )
  })

  it("is idempotent and keeps @charset and CRLF line endings", () => {
    const css = `@charset "utf-8";\r\n@import url("tailwindcss") source(none);`
    const once = patchAppCss(css)
    expect(once).toBe(
      `@charset "utf-8";\r\n@layer ui-sdk;\r\n\r\n@import url("tailwindcss") source(none);\r\n@import "./solid-ui.css";\r\n`
    )
    expect(patchAppCss(once)).toBe(once)
  })

  it("keeps an existing layer declaration and import", () => {
    const css = `@layer ui-sdk;\n@import "tailwindcss";\n@import './solid-ui.css';\n`
    expect(patchAppCss(css)).toBe(css)
  })
})
