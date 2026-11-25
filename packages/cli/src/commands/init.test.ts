import { existsSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

import { componentsJsonSchema } from "@solid-ui/registry/config"
import { supportedRange } from "@solid-ui/registry/versions"
import { describe, expect, it } from "vitest"

import type { Installer } from "~/utils/package-manager"

import {
  fakeRegistry,
  recordingInstaller,
  recordingUi,
  UTILS_SOURCE
} from "../../test/harness"
import {
  createProject,
  supportedInstall,
  TEMPLATE_TSCONFIG,
  TEMPLATE_VITE_CONFIG
} from "../../test/project"
import { runInit, type InitOptions } from "./init"

const read = (cwd: string, file: string) =>
  readFileSync(path.join(cwd, file), "utf8")

async function init(
  cwd: string,
  options: Partial<InitOptions> = {},
  {
    interactive = false,
    confirm,
    install
  }: {
    interactive?: boolean
    confirm?: (message: string) => boolean
    install?: Installer
  } = {}
) {
  const registry = fakeRegistry()
  const installer = recordingInstaller()
  const { ui, messages } = recordingUi({ confirm })
  await runInit(
    { cwd, yes: true, force: false, ...options },
    {
      client: registry.client,
      install: install ?? installer.install,
      ui,
      interactive
    }
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
    expect(read(cwd, "vite.config.ts")).toBe(
      TEMPLATE_VITE_CONFIG.replace(
        "defineConfig({\n",
        "defineConfig({\n  resolve: { tsconfigPaths: true },\n"
      )
    )
    // One line per finished step, in the order init takes them.
    expect(messages.filter((message) => message.startsWith("task:"))).toEqual([
      `task: Loaded the nova style for preset ${config.preset}.`,
      "task: Wrote components.json",
      "task: Wrote src/solid-ui.css",
      "task: Updated src/App.css",
      'task: Updated tsconfig.json (added "~/*")',
      "task: Updated vite.config.ts (added resolve.tsconfigPaths)",
      "task: Wrote src/lib/utils.ts",
      expect.stringMatching(/^task: Installed \d+ packages with /)
    ])
    expect(messages.join("\n")).not.toContain("Vite can't resolve")
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

  it("asks before turning tsconfigPaths: false on", async () => {
    const files = (vite: string) => ({
      "tsconfig.json": TEMPLATE_TSCONFIG,
      "vite.config.ts": vite,
      "src/App.css": "@import 'tailwindcss';\n"
    })
    const off = TEMPLATE_VITE_CONFIG.replace(
      "defineConfig({\n",
      "defineConfig({\n  resolve: { tsconfigPaths: false },\n"
    )

    const kept = createProject({ files: files(off) })
    const asked = await init(
      kept,
      { yes: false, preset: "b0" },
      {
        interactive: true,
        confirm: (message) => !message.includes("tsconfigPaths")
      }
    )
    expect(read(kept, "vite.config.ts")).toBe(off)
    const text = asked.messages.join("\n")
    expect(text).not.toContain("Updated vite.config.ts")
    expect(text).toContain(
      "init left vite.config.ts alone because you kept resolve.tsconfigPaths: false"
    )
    expect(asked.messages.at(-1)).toContain(
      "outro: Finish the vite.config.ts step above"
    )

    const forced = createProject({ files: files(off) })
    const { messages } = await init(forced)
    expect(read(forced, "vite.config.ts")).toContain(
      "resolve: { tsconfigPaths: true },"
    )
    expect(messages.join("\n")).toContain(
      "Updated vite.config.ts (set resolve.tsconfigPaths to true)"
    )
  })

  it("leaves a config it can't patch alone and says so at the end", async () => {
    const vite =
      "import { mergeConfig } from 'vite'\nexport default mergeConfig(base, {})\n"
    const cwd = createProject({
      files: {
        "tsconfig.json": TEMPLATE_TSCONFIG,
        "vite.config.ts": vite,
        "src/App.css": "@import 'tailwindcss';\n"
      }
    })
    const { messages } = await init(cwd)
    expect(read(cwd, "vite.config.ts")).toBe(vite)
    expect(messages.at(-2)).toMatch(
      /^warn: Vite can't resolve ~\/ yet\. init left vite\.config\.ts alone because its export default calls mergeConfig/
    )
    expect(messages.at(-2)).toContain("resolve: { tsconfigPaths: true }")
  })

  it("warns when the install leaves requirements outside the ranges", async () => {
    const cwd = createProject()
    const pnpmLowest: Installer = async (dir) => {
      // pnpm resolving the lowest versions the template's ranges allow.
      writeFileSync(
        path.join(dir, "node_modules/solid-js/package.json"),
        JSON.stringify({ name: "solid-js", version: "2.0.0" })
      )
    }
    const { messages } = await init(cwd, {}, { install: pnpmLowest })
    const text = messages.join("\n")
    expect(text).toContain(
      `solid-js 2.0.0 (needs ${supportedRange("solid-js")})`
    )
    expect(text).toMatch(/Update them with:\n\n {2}\S+ \S+ solid-js@\^/)
  })

  it("updates requirements the install moved when asked", async () => {
    const cwd = createProject()
    const calls: { specs: string[]; dev?: boolean }[] = []
    const install: Installer = async (dir, specs, { dev }) => {
      calls.push({ specs, dev })
      if (calls.length === 1)
        writeFileSync(
          path.join(dir, "node_modules/vite/package.json"),
          JSON.stringify({ name: "vite", version: "8.0.0" })
        )
    }
    await init(
      cwd,
      { yes: false, preset: "b0" },
      { interactive: true, confirm: () => true, install }
    )
    expect(calls.at(-1)).toEqual({
      specs: [`vite@${supportedRange("vite")}`],
      dev: false
    })
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
