import path from "node:path"

import { afterEach, describe, expect, it, vi } from "vitest"

import { createProject } from "../../test/project"
import { detectAgent, formatCommand, installCommand } from "./package-manager"

function project(files: Record<string, string>) {
  return createProject({ installed: {}, files })
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("detectAgent", () => {
  it("prefers the manager that installed node_modules over lockfiles", async () => {
    // npm install in the solid-v2 template, which ships pnpm-workspace.yaml.
    const cwd = project({
      "node_modules/.package-lock.json": "{}",
      "package-lock.json": "{}",
      "pnpm-workspace.yaml": "packages:\n  - '.'\n"
    })
    expect(await detectAgent(cwd)).toBe("npm")

    const pnpm = project({
      "node_modules/.modules.yaml": "",
      "package-lock.json": "{}"
    })
    expect(await detectAgent(pnpm)).toBe("pnpm")
  })

  it("falls back to lockfiles, then to the tool that ran the CLI", async () => {
    expect(await detectAgent(project({ "pnpm-lock.yaml": "" }))).toBe("pnpm")
    expect(await detectAgent(project({ "bun.lock": "" }))).toBe("bun")

    vi.stubEnv("npm_config_user_agent", "yarn/1.22.22 npm/? node/v24.13.0")
    expect(await detectAgent(project({}))).toBe("yarn")
  })

  it("looks in parent folders for a workspace root", async () => {
    const root = project({
      "node_modules/.modules.yaml": "",
      "apps/web/package.json": "{}"
    })
    expect(await detectAgent(path.join(root, "apps/web"))).toBe("pnpm")
  })
})

describe("installCommand", () => {
  it("builds dependency and dev dependency installs", () => {
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
  })
})
