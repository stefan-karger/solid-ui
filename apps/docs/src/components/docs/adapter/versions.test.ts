import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

type Manifest = {
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  peerDependencies: Record<string, string>
}
const read = (path: string) =>
  JSON.parse(readFileSync(resolve(path), "utf8")) as Manifest

describe("workspace compatibility target", () => {
  it("keeps the docs, fixture, test runtime and upstream packages on the stable Solid stack", () => {
    const root = read("package.json")
    const docs = read("apps/docs/package.json")
    const fixture = read("apps/docs/test/fixtures/adapter/package.json")
    for (const pkg of ["solid-js", "@solidjs/web"]) {
      expect(root.devDependencies[pkg]).toBe("2.0.1")
      expect(docs.dependencies[pkg]).toBe("2.0.1")
      for (const upstream of ["integrations/solid", "renderers/solid-js"])
        expect(
          read(`vendor/astro-solid/upstream/packages/${upstream}/package.json`)
            .peerDependencies[pkg]
        ).toBe("^2.0.0")
    }
    for (const pkg of ["@ui-sdk/core", "@ui-sdk/solid"]) {
      expect(docs.dependencies[pkg]).toBe("0.1.0-beta.17")
      expect(fixture.dependencies[pkg]).toBe(docs.dependencies[pkg])
    }
    expect(root.devDependencies["@solidjs/vite-plugin"]).toBe("3.0.1")
    const workspace = readFileSync(resolve("pnpm-workspace.yaml"), "utf8")
    for (const pkg of [
      "@solidjs/signals",
      "@solidjs/compiler",
      "@solidjs/babel-plugin"
    ])
      expect(workspace).toContain(`${pkg}": "2.0.1"`)
    expect(docs.dependencies["@astrojs/solid-js"]).toContain(
      "8.0.0-pr.17891.bbf9faa.tgz"
    )
  })
})
