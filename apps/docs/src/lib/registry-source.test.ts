import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

import { styles } from "./appearance"
import {
  extractStyleMap,
  getRegistryDisplayPath,
  inferRegistryLanguage,
  prepareRegistrySource
} from "./registry-source"

const styleCss = `
@layer components {
  .cn-button {
    @supports (color: red) { color: red; }
    @apply rounded-md;
    @apply text-sm [&_svg:not([class*='size-'])]:size-4;
  }
}`

describe("registry source preparation", () => {
  it("accepts empty upstream theme placeholders", () => {
    expect(
      extractStyleMap(
        ".cn-placeholder {} .cn-button { @apply rounded-md; }",
        "test"
      ).get("cn-button")
    ).toBe("rounded-md")
  })
  it("reads an upstream apply declaration without a final semicolon", () => {
    expect(
      extractStyleMap(".cn-button { @apply rounded-md }", "test").get(
        "cn-button"
      )
    ).toBe("rounded-md")
  })
  it("extracts style utilities through nested blocks", () => {
    expect(extractStyleMap(styleCss, "test").get("cn-button")).toBe(
      "rounded-md text-sm [&_svg:not([class*='size-'])]:size-4"
    )
  })

  it("normalizes, rewrites aliases, expands tokens, and preserves default exports", async () => {
    const result = await prepareRegistrySource(
      `import { Button } from "~/registry/ui/button"\r\nexport default () => <Button class="cn-button" />\r\n`,
      { registryPath: "examples/demo.tsx", styleName: "test", styleCss }
    )

    expect(result.code).toContain('from "~/components/ui/button"')
    expect(result.code).toContain(
      `class="rounded-md text-sm [&_svg:not([class*='size-'])]:size-4"`
    )
    expect(result.code).toContain("export default")
    expect(result.code.endsWith("\n")).toBe(false)
  })

  it("expands mapped semantic tokens and removes unmapped helpers", async () => {
    const result = await prepareRegistrySource(
      `const value = "flex cn-missing cn-button grid"`,
      {
        registryPath: "examples/demo.ts",
        styleName: "test",
        styleCss
      }
    )

    expect(result.code).toContain(
      `const value = "flex rounded-md text-sm [&_svg:not([class*='size-'])]:size-4 grid"`
    )
    expect(result.code).not.toContain("cn-missing")
    expect(result.code).not.toContain("flex  rounded")
  })

  it("strips preset-only menu helpers like shadcn's default menu color", async () => {
    for (const theme of styles) {
      const css = readFileSync(
        resolve(`apps/docs/src/registry/styles/style-${theme}.css`),
        "utf8"
      )
      const result = await prepareRegistrySource(
        'const value = "cn-select-content cn-menu-target cn-menu-translucent"',
        { registryPath: "ui/select.tsx", styleName: theme, styleCss: css }
      )
      expect(result.code).toContain("bg-popover")
      expect(result.code).not.toContain("bg-popover/70")
      expect(result.code).not.toContain("backdrop-blur")
      expect(result.code).not.toMatch(/\bcn-/)
    }
  })

  it("rejects semantic helpers in interpolated template literals", async () => {
    await expect(
      prepareRegistrySource("const value = `cn-button ${variant}`", {
        registryPath: "examples/demo.ts",
        styleName: "test",
        styleCss
      })
    ).rejects.toThrow(
      "Cannot safely transform a semantic class in a template expression"
    )
  })

  it("maps display paths and languages", () => {
    expect(getRegistryDisplayPath("ui/button.tsx")).toBe(
      "components/ui/button.tsx"
    )
    expect(getRegistryDisplayPath("ui/button.tsx", "custom/button.tsx")).toBe(
      "custom/button.tsx"
    )
    expect(inferRegistryLanguage("data.json")).toBe("json")
    expect(inferRegistryLanguage("README.md")).toBe("text")
  })
})
