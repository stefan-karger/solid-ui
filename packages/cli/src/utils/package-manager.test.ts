import { utimesSync } from "node:fs"
import path from "node:path"

import { afterEach, describe, expect, it, vi } from "vitest"

import { recordingUi } from "../../test/harness"
import { createProject } from "../../test/project"
import {
  cliCommand,
  detectAgent,
  formatCommand,
  installCommand
} from "./package-manager"

function project(files: Record<string, string>) {
  return createProject({ installed: {}, files })
}

// How the CLI was started, as npm_config_user_agent tells it.
function ranWith(tool: "npm" | "pnpm" | "bun" | "yarn" | null) {
  vi.stubEnv(
    "npm_config_user_agent",
    tool ? `${tool}/1.0.0 node/v24.13.0 win32 x64` : ""
  )
}

const everything = async () => true

// The solid-v2 templates ship a pnpm lockfile and workspace file.
const TEMPLATE_FILES = {
  "pnpm-lock.yaml": "lockfileVersion: '9.0'\n",
  "pnpm-workspace.yaml": "packages:\n  - '.'\n"
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("detectAgent", () => {
  it("keeps the manager that installed node_modules", async () => {
    ranWith("bun")
    // npm install in the solid-v2 template.
    const npm = project({
      ...TEMPLATE_FILES,
      "node_modules/.package-lock.json": "{}",
      "package-lock.json": "{}"
    })
    expect(await detectAgent(npm)).toBe("npm")

    const pnpm = project({ "node_modules/.modules.yaml": "" })
    expect(await detectAgent(pnpm)).toBe("pnpm")
  })

  it("reads the newest lockfile when node_modules has no marker", async () => {
    ranWith("npm")
    // bun install wrote bun.lock after the template's pnpm lockfile.
    const cwd = project({
      ...TEMPLATE_FILES,
      "bun.lock": "{}",
      "node_modules/x/index.js": ""
    })
    const scaffolded = new Date(Date.now() - 60_000)
    utimesSync(path.join(cwd, "pnpm-lock.yaml"), scaffolded, scaffolded)
    expect(await detectAgent(cwd)).toBe("bun")
  })

  it("follows the command for a project nobody installed yet", async () => {
    for (const tool of ["pnpm", "bun", "yarn"] as const) {
      ranWith(tool)
      expect(await detectAgent(project(TEMPLATE_FILES))).toBe(tool)
    }
    ranWith("bun")
    const pinned = project({
      ...TEMPLATE_FILES,
      "package.json": JSON.stringify({ packageManager: "pnpm@10.0.0" })
    })
    expect(await detectAgent(pinned)).toBe("pnpm")
  })

  it("asks under npx when the lockfile belongs to another tool", async () => {
    ranWith("npm")
    const cwd = project(TEMPLATE_FILES)

    const { ui, messages } = recordingUi({ select: "bun" })
    expect(
      await detectAgent(cwd, { ui, prompt: true, available: everything })
    ).toBe("bun")
    expect(messages.join("\n")).toContain(
      "This project has pnpm-lock.yaml from pnpm, but init runs through npx"
    )

    // Without a prompt the command decides: npm create solid copies the
    // template's pnpm-lock.yaml, then npx solidui-cli init --yes.
    expect(await detectAgent(cwd, { available: everything })).toBe("npm")
    // Started with node directly, as when testing a local build.
    ranWith(null)
    expect(await detectAgent(cwd, { available: everything })).toBe("npm")
    // Nothing to choose from when only npm is installed.
    const quiet = recordingUi({ select: "pnpm" })
    expect(
      await detectAgent(cwd, {
        ui: quiet.ui,
        prompt: true,
        available: async () => false
      })
    ).toBe("npm")
    expect(quiet.messages).toEqual([])
  })

  it("uses npm for npx without another tool's lockfile", async () => {
    ranWith("npm")
    expect(await detectAgent(project({}))).toBe("npm")
    ranWith(null)
    expect(await detectAgent(project({ "package-lock.json": "{}" }))).toBe(
      "npm"
    )
  })

  it("looks in parent folders for a workspace root", async () => {
    ranWith("bun")
    const root = project({
      "node_modules/.modules.yaml": "",
      "apps/web/package.json": "{}"
    })
    expect(await detectAgent(path.join(root, "apps/web"))).toBe("pnpm")
  })
})

describe("cliCommand", () => {
  it("suggests commands the way the CLI was started", () => {
    expect(cliCommand("add button")).toBe("npx solidui-cli@latest add button")
    ranWith("pnpm")
    expect(cliCommand("add button")).toBe(
      "pnpm dlx solidui-cli@latest add button"
    )
    ranWith("bun")
    expect(cliCommand("init", "0.7.2")).toBe("bun x solidui-cli@0.7.2 init")
  })
})

describe("installCommand", () => {
  it("builds installs for packages, dev packages and the whole project", () => {
    expect(
      formatCommand(installCommand(["solid-js@^2.0.1"], { agent: "npm" }))
    ).toBe("npm i solid-js@^2.0.1")
    expect(
      formatCommand(
        installCommand(["vite@^8.3.8"], { agent: "pnpm", dev: true })
      )
    ).toBe("pnpm add -D vite@^8.3.8")
    expect(
      formatCommand(installCommand(["clsx@^2.1.1"], { agent: "deno" }))
    ).toBe("deno add npm:clsx@^2.1.1")
    expect(formatCommand(installCommand([], { agent: "bun" }))).toBe(
      "bun install"
    )
  })
})
