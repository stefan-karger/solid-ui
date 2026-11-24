import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

const componentsDir = resolve("apps/docs/src/content/docs/components")
const componentPages = readdirSync(componentsDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => ({
    file,
    source: readFileSync(resolve(componentsDir, file), "utf8")
  }))

const reactEraReferences = [
  /\bfor React\b/,
  /radix-ui\.com/,
  /\bvaul\b/i,
  /embla-carousel\.com/,
  /\bEmbla\b/,
  /input-otp\.rodz\.dev|guilhermerodz/
]

describe("component docs content", () => {
  it("describes the UI SDK primitives instead of the replaced React libraries", () => {
    const findings = componentPages.flatMap(({ file, source }) =>
      reactEraReferences
        .filter((pattern) => pattern.test(source))
        .map((pattern) => `${file}: ${pattern}`)
    )
    expect(findings).toEqual([])
  })
})
