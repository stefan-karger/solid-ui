import { existsSync, readdirSync, readFileSync } from "node:fs"
import { relative, resolve } from "node:path"

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

const docsDir = resolve("apps/docs/src/content/docs")

function listMdx(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? listMdx(resolve(dir, entry.name))
      : entry.name.endsWith(".mdx")
        ? [resolve(dir, entry.name)]
        : []
  )
}

function resolvesToPage(link: string) {
  const path = link.replace(/^\/docs\/?/, "").replace(/\/$/, "")
  const candidates = path ? [`${path}.mdx`, `${path}/index.mdx`] : ["index.mdx"]
  return candidates.some((candidate) => existsSync(resolve(docsDir, candidate)))
}

describe("component docs content", () => {
  it("links only to docs pages that exist", () => {
    const broken = listMdx(docsDir).flatMap((file) =>
      [...readFileSync(file, "utf8").matchAll(/\]\((\/docs[^)#\s]*)/g)]
        .map((match) => match[1]!)
        .filter((link) => !resolvesToPage(link))
        .map((link) => `${relative(docsDir, file)} → ${link}`)
    )
    expect(broken).toEqual([])
  })

  it("describes the UI SDK primitives instead of the replaced React libraries", () => {
    const findings = componentPages.flatMap(({ file, source }) =>
      reactEraReferences
        .filter((pattern) => pattern.test(source))
        .map((pattern) => `${file}: ${pattern}`)
    )
    expect(findings).toEqual([])
  })
})
