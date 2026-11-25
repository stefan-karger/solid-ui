import { existsSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

import { componentsJsonSchema } from "@solid-ui/registry/config"
import { describe, expect, it } from "vitest"

import {
  fakeRegistry,
  recordingInstaller,
  recordingUi,
  UTILS_SOURCE
} from "../../test/harness"
import { createProject, supportedInstall } from "../../test/project"
import { runInit, type InitOptions } from "./init"

const read = (cwd: string, file: string) =>
  readFileSync(path.join(cwd, file), "utf8")

async function init(
  cwd: string,
  options: Partial<InitOptions> = {},
  interactive = false
) {
  const registry = fakeRegistry()
  const installer = recordingInstaller()
  const { ui, messages } = recordingUi()
  await runInit(
    { cwd, yes: true, force: false, ...options },
    { client: registry.client, install: installer.install, ui, interactive }
  )
  return { registry, installer, messages }
}

describe("init", () => {
  it("sets up the solid-v2 Tailwind template with the default preset", async () => {
    const cwd = createProject()
    const { installer, messages, registry } = await init(cwd)

    const config = componentsJsonSchema.parse(
      JSON.parse(read(cwd, "components.json"))
    )
    expect(config).toMatchObject({
      $schema: "https://solid-ui.com/schema.json",
      style: "nova",
      tailwind: { css: "src/App.css" },
      menuColor: "default",
      aliases: { ui: "~/components/ui", utils: "~/lib/utils" }
    })

    expect(read(cwd, "src/App.css")).toBe(
      "@layer ui-sdk;\n\n@import 'tailwindcss';\n@import \"./solid-ui.css\";\n"
    )
    const solidUiCss = read(cwd, "src/solid-ui.css")
    expect(solidUiCss).toContain(`from preset ${config.preset} (style nova)`)
    expect(solidUiCss).toContain('@import "@fontsource-variable/geist";')
    expect(solidUiCss).toContain("@custom-variant data-open")
    expect(read(cwd, "src/lib/utils.ts")).toBe(UTILS_SOURCE)
    expect(read(cwd, "tsconfig.json")).toContain('"~/*": [')
    expect(read(cwd, "tsconfig.json")).toContain("// Type Checking & Safety")

    expect(installer.calls).toHaveLength(1)
    expect(installer.calls[0]).toEqual(
      expect.arrayContaining([
        "clsx@^2.1.1",
        "tailwind-merge@^3.7.1",
        expect.stringMatching(/^class-variance-authority@\^/),
        expect.stringMatching(/^tw-animate-css@\^/),
        expect.stringMatching(/^@fontsource-variable\/geist@\^/)
      ])
    )
    expect(registry.requests).toEqual([
      "https://registry.test/r/styles/nova/utils.json",
      "https://registry.test/r/styles/nova/style-utilities.json"
    ])
    expect(messages.join("\n")).toContain("resolve: { tsconfigPaths: true }")
  })

  it("applies a preset code from the Create page", async () => {
    const cwd = createProject()
    await init(cwd, { preset: "--preset b8OmeHVSIb" })
    const config = JSON.parse(read(cwd, "components.json"))
    expect(config).toMatchObject({
      preset: "b8OmeHVSIb",
      menuColor: "inverted"
    })
    expect(read(cwd, "src/solid-ui.css")).toContain(
      '@import "@fontsource/instrument-serif";'
    )
  })

  it("is idempotent and keeps a changed lib/utils.ts", async () => {
    const cwd = createProject()
    await init(cwd)
    const appCss = read(cwd, "src/App.css")
    const tsconfig = read(cwd, "tsconfig.json")
    writeFileSync(path.join(cwd, "src/lib/utils.ts"), "export const cn = 1\n")

    const { messages, installer } = await init(cwd, {
      force: true,
      preset: "b0"
    })
    expect(read(cwd, "src/App.css")).toBe(appCss)
    expect(read(cwd, "tsconfig.json")).toBe(tsconfig)
    expect(read(cwd, "src/lib/utils.ts")).toBe("export const cn = 1\n")
    expect(messages.join("\n")).toContain("Kept src/lib/utils.ts")
    expect(JSON.parse(read(cwd, "components.json")).preset).toBe("b0")
    // The fake install didn't add packages, so they are still missing.
    expect(installer.calls).toHaveLength(1)
  })

  it("leaves an existing components.json alone without --force", async () => {
    const cwd = createProject()
    writeFileSync(path.join(cwd, "components.json"), "{}")
    await expect(init(cwd)).rejects.toThrow("Run init with --force")
    expect(existsSync(path.join(cwd, "src/solid-ui.css"))).toBe(false)
  })

  it("changes nothing when the preflight fails", async () => {
    const cwd = createProject({
      installed: { ...supportedInstall, "solid-js": "1.9.14" }
    })
    await expect(init(cwd)).rejects.toThrow("init stopped")
    expect(existsSync(path.join(cwd, "components.json"))).toBe(false)
    expect(read(cwd, "src/App.css")).toBe("@import 'tailwindcss';\n")
  })

  it("keeps installed packages outside the tested range unless asked", async () => {
    const cwd = createProject({
      installed: { ...supportedInstall, typescript: "7.0.2", clsx: "1.2.1" }
    })
    const { installer, messages } = await init(cwd)
    expect(installer.calls[0]).not.toContainEqual(
      expect.stringMatching(/^clsx@/)
    )
    expect(messages.join("\n")).toContain(
      "Kept clsx 1.2.1. Solid UI is tested with ^2.1.1."
    )
  })

  it("needs a preset or --yes when it can't ask", async () => {
    await expect(init(createProject(), { yes: false })).rejects.toThrow(
      "Pass --preset <code> or --yes"
    )
    await expect(init(createProject(), { preset: "nova" })).rejects.toThrow(
      "nova is not a preset code"
    )
  })
})
