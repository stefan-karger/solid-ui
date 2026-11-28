import { existsSync, readdirSync, readFileSync } from "node:fs"
import { relative, resolve } from "node:path"

import { describe, expect, it } from "vitest"

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
  // A page's Markdown version is at its path plus `.md`.
  const path = link.replace(/^\/docs\/?/, "").replace(/(?:\.md|\/)$/, "")
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
})
