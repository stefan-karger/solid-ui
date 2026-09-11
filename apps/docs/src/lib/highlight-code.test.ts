import { describe, expect, it } from "vitest"

import { highlightCode } from "./highlight-code"

describe("highlightCode", () => {
  it("uses the shared dual themes and line hooks", async () => {
    const html = await highlightCode("const answer = 42", "ts")

    expect(html).toContain("background-color:#ffffff")
    expect(html).toContain("--shiki-dark-bg")
    expect(html).toContain("--shiki-dark")
    expect(html).toContain("!bg-transparent")
    expect(html).toContain('data-line-numbers=""')
    expect(html).toContain('data-line=""')
  })

  it("escapes plain-text input", async () => {
    const html = await highlightCode('<script>alert("nope")</script>', "text")

    expect(html).toContain("&#x3C;script>")
    expect(html).not.toContain("<script>")
  })
})
