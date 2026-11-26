import { writeFileSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { createProject, TEMPLATE_TSCONFIG } from "../../test/project"
import {
  addPathAlias,
  findAppTsConfig,
  readTsConfig,
  resolveAlias
} from "./tsconfig"

describe("tsconfig", () => {
  it("adds ~/* without baseUrl and keeps the comments", () => {
    const cwd = createProject()
    const file = readTsConfig(path.join(cwd, "tsconfig.json"))!
    const { text, config } = addPathAlias(file, "~", "./src/*")
    expect(config.compilerOptions?.paths).toMatchObject({ "~/*": ["./src/*"] })
    expect(text).toContain("// Type Checking & Safety")
    expect(text).toMatch(/"paths": \{\s+"~\/\*": \[\s*"\.\/src\/\*"\s*\]\s+\}/)
    expect(text).not.toContain("baseUrl")

    writeFileSync(file.path, text)
    const updated = readTsConfig(file.path)!
    expect(resolveAlias(updated, "~/components/ui")).toBe(
      path.join(cwd, "src", "components", "ui")
    )
  })

  it("follows a solution-style tsconfig to the one that includes src", () => {
    const cwd = createProject({
      files: {
        "tsconfig.json": `{
  "files": [],
  "references": [{ "path": "./tsconfig.node.json" }, { "path": "./tsconfig.app.json" }]
}`,
        "tsconfig.node.json": `{ "include": ["vite.config.ts"] }`,
        "tsconfig.app.json": TEMPLATE_TSCONFIG.replace(
          '  "compilerOptions"',
          '  "include": ["src"],\n  "compilerOptions"'
        )
      }
    })
    expect(path.basename(findAppTsConfig(cwd)!.path)).toBe("tsconfig.app.json")
  })

  it("resolves aliases against baseUrl when a project still sets it", () => {
    const cwd = createProject({
      files: {
        "tsconfig.json": `{ "compilerOptions": { "baseUrl": "src", "paths": { "@/*": ["*"] } } }`
      }
    })
    expect(resolveAlias(findAppTsConfig(cwd)!, "@/lib/utils")).toBe(
      path.join(cwd, "src", "lib", "utils")
    )
    expect(resolveAlias(findAppTsConfig(cwd)!, "~/lib/utils")).toBeNull()
  })
})
