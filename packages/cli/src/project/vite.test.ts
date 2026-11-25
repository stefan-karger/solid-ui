import { describe, expect, it } from "vitest"

import { TEMPLATE_VITE_CONFIG } from "../../test/project"
import { planViteAlias } from "./vite"

function patched(text: string, file?: string) {
  const plan = planViteAlias(text, file)
  if (plan.kind !== "patch")
    throw new Error(`expected a patch, got ${plan.kind}`)
  return plan.text
}

describe("planViteAlias", () => {
  it("adds resolve to the solid-v2 template and keeps every comment", () => {
    const text = patched(TEMPLATE_VITE_CONFIG)
    expect(text).toBe(
      TEMPLATE_VITE_CONFIG.replace(
        "export default defineConfig({\n",
        "export default defineConfig({\n  resolve: { tsconfigPaths: true },\n"
      )
    )
    expect(planViteAlias(text)).toEqual({ kind: "resolved" })
  })

  it("follows the layout of the config object", () => {
    expect(patched("export default defineConfig({ plugins: [] })\n")).toBe(
      "export default defineConfig({ resolve: { tsconfigPaths: true }, plugins: [] })\n"
    )
    expect(patched("export default defineConfig({})\n")).toBe(
      "export default defineConfig({ resolve: { tsconfigPaths: true } })\n"
    )
    expect(
      patched("export default defineConfig({\r\n\tplugins: [],\r\n})\r\n")
    ).toBe(
      "export default defineConfig({\r\n\tresolve: { tsconfigPaths: true },\r\n\tplugins: [],\r\n})\r\n"
    )
  })

  it("adds tsconfigPaths next to the other resolve options", () => {
    expect(
      patched(`export default defineConfig({
  resolve: {
    // dedupe for linked packages
    dedupe: ["solid-js"],
  },
})
`)
    ).toBe(`export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    // dedupe for linked packages
    dedupe: ["solid-js"],
  },
})
`)
    expect(
      patched(
        `export default defineConfig({ resolve: { conditions: ["solid"] } })`
      )
    ).toBe(
      `export default defineConfig({ resolve: { tsconfigPaths: true, conditions: ["solid"] } })`
    )
  })

  it("turns tsconfigPaths: false into true and leaves true alone", () => {
    expect(
      planViteAlias(
        "export default defineConfig({ resolve: { tsconfigPaths: false } })"
      )
    ).toEqual({
      kind: "patch",
      enable: true,
      text: "export default defineConfig({ resolve: { tsconfigPaths: true } })"
    })
    expect(
      planViteAlias(
        "export default defineConfig({ resolve: { tsconfigPaths: true } })"
      )
    ).toEqual({ kind: "resolved" })
  })

  it("sees other ways of resolving ~/", () => {
    const resolved = [
      `import paths from "vite-tsconfig-paths"\nexport default defineConfig({ plugins: [paths()] })`,
      `export default defineConfig({ resolve: { alias: { "~": "/src" } } })`,
      `export default defineConfig({ resolve: { alias: [{ find: /^~\\//, replacement: "/src/" }] } })`
    ]
    for (const text of resolved)
      expect(planViteAlias(text, "vite.config.js")).toEqual({
        kind: "resolved"
      })
  })

  it("finds the config behind functions, constants and type annotations", () => {
    const shapes = [
      "export default defineConfig(({ mode }) => ({ plugins: [] }))",
      "export default defineConfig(async () => {\n  const x = 1\n  return { plugins: [] }\n})",
      "export default { plugins: [] } satisfies UserConfig",
      "const config: UserConfig = { plugins: [] }\nexport default defineConfig(config)",
      "const config = defineConfig({ plugins: [] })\nexport default config"
    ]
    for (const text of shapes)
      expect(patched(text)).toContain(
        "{ resolve: { tsconfigPaths: true }, plugins: [] }"
      )
  })

  it("leaves configs it can't change safely to the user", () => {
    const cases: [string, string][] = [
      [
        "export default mergeConfig(base, { plugins: [] })",
        "calls mergeConfig"
      ],
      [
        "export default defineConfig({ ...base, plugins: [] })",
        "spreads other options"
      ],
      [
        "export default defineConfig({ resolve: sharedResolve })",
        "not an object literal"
      ],
      [
        "export default defineConfig({ resolve: { tsconfigPaths: isDev } })",
        "not true or false"
      ],
      [
        "export default defineConfig((env) => env.mode === 'a' ? { a: 1 } : { b: 1 })",
        "not a config object"
      ],
      ["module.exports = { plugins: [] }", "no export default"],
      ["export default defineConfig({", "could not parse"]
    ]
    for (const [text, reason] of cases) {
      const plan = planViteAlias(text)
      expect(plan.kind).toBe("manual")
      expect(plan.kind === "manual" && plan.reason).toContain(reason)
    }
  })
})
