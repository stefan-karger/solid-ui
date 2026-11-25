import { SUPPORTED_VERSIONS } from "@solid-ui/registry/versions"
import semver from "semver"
import { describe, expect, it } from "vitest"

import {
  createProject,
  supportedInstall,
  TEMPLATE_TSCONFIG,
  TEMPLATE_VITE_CONFIG
} from "../../test/project"
import { runInitPreflight, type InitPreflight } from "./init"

const options = { cliVersion: "1.0.0" }

function codes(result: InitPreflight) {
  return result.issues.map((issue) => `${issue.level}:${issue.code}`)
}

function message(result: InitPreflight, code: string) {
  return result.issues.find((issue) => issue.code === code)?.message ?? ""
}

describe("init preflight", () => {
  it("accepts the solid-v2 Tailwind template and plans the ~/* alias", () => {
    const result = runInitPreflight(createProject(), options)
    expect(codes(result)).toEqual([])
    expect(result.ok && result.project).toMatchObject({
      tailwindCss: "src/App.css",
      needsTildeAlias: true,
      tildeTarget: "./src/*",
      vite: { plan: { kind: "patch", enable: false } },
      hasConfig: false
    })
  })

  it("keeps an existing ~/* alias and sees Vite's tsconfig paths", () => {
    const cwd = createProject({
      files: {
        "tsconfig.json": TEMPLATE_TSCONFIG.replace(
          '"strict": true,',
          '"strict": true,\n    "paths": { "~/*": ["./app/*"] },'
        ),
        "vite.config.ts": TEMPLATE_VITE_CONFIG.replace(
          "export default defineConfig({",
          "export default defineConfig({\n  resolve: { tsconfigPaths: true },"
        ),
        "src/App.css": '@import "tailwindcss";\n',
        "components.json": "{}"
      }
    })
    const result = runInitPreflight(cwd, options)
    expect(result.ok && result.project).toMatchObject({
      needsTildeAlias: false,
      vite: { plan: { kind: "resolved" } },
      hasConfig: true
    })
  })

  it("points Solid 1 and Tailwind CSS 3 projects to the legacy CLI only", () => {
    const cwd = createProject({
      installed: {
        "solid-js": "1.9.14",
        tailwindcss: "3.4.17",
        vite: supportedInstall.vite!,
        "@solidjs/start": "2.2.3",
        typescript: "5.9.3"
      }
    })
    const result = runInitPreflight(cwd, options)
    expect(codes(result)).toEqual(["error:legacy-versions"])
    expect(message(result, "legacy-versions")).toContain(
      "Found solid-js 1.9.14, tailwindcss 3.4.17."
    )
    expect(message(result, "legacy-versions")).toContain(
      "npx solidui-cli@0.7.2 init"
    )
  })

  it("stops projects that still have the legacy ui.config.json", () => {
    const cwd = createProject({
      files: {
        "tsconfig.json": TEMPLATE_TSCONFIG,
        "src/App.css": "@import 'tailwindcss';\n",
        "ui.config.json": "{}"
      }
    })
    expect(codes(runInitPreflight(cwd, options))).toContain(
      "error:legacy-project"
    )
  })

  it("rejects versions newer than the tested ranges", () => {
    const solid = SUPPORTED_VERSIONS.requirements["solid-js"]!
    const nextMajor = `${semver.major(semver.minVersion(solid)!) + 1}.0.0`
    const result = runInitPreflight(
      createProject({
        installed: {
          ...supportedInstall,
          "solid-js": nextMajor,
          typescript: "7.0.2"
        }
      }),
      options
    )
    expect(codes(result)).toEqual(["error:unsupported-version"])
    const text = message(result, "unsupported-version")
    expect(text).toContain("solidui-cli 1.0.0 supports these versions")
    expect(text).toContain(`solid-js ${nextMajor}`)
    expect(text).toContain(`solid-js ${solid}`)
    expect(text).toContain("npx solidui-cli@latest init")
  })

  it("reads the lowest declared version before an install", () => {
    const { tailwindcss, ...rest } = supportedInstall
    const cwd = createProject({
      installed: { ...rest, typescript: "7.0.2" },
      declared: { tailwindcss: `^${tailwindcss}` }
    })
    const result = runInitPreflight(cwd, options)
    expect(codes(result)).toEqual([])
    expect(result.ok && result.project.versions.tailwindcss).toMatchObject({
      source: "declared",
      version: tailwindcss
    })
  })

  it("needs TypeScript and one Tailwind stylesheet", () => {
    const result = runInitPreflight(
      createProject({
        installed: { ...supportedInstall },
        files: {
          "src/App.css": "@import 'tailwindcss';\n",
          "src/other.css": '@import "tailwindcss" source(none);\n'
        }
      }),
      options
    )
    expect(codes(result)).toEqual([
      "error:ambiguous-tailwind-css",
      "error:no-typescript"
    ])
    expect(message(result, "ambiguous-tailwind-css")).toContain(
      "src/App.css, src/other.css"
    )
  })

  it("takes the stylesheet from --css and warns about the JSX import source", () => {
    const cwd = createProject({
      files: {
        "tsconfig.json": TEMPLATE_TSCONFIG.replace("@solidjs/web", "solid-js"),
        "src/App.css": "@import 'tailwindcss';\n",
        "src/extra.css": "@import 'tailwindcss';\n"
      }
    })
    const result = runInitPreflight(cwd, { ...options, css: "src/extra.css" })
    expect(codes(result)).toEqual(["warning:jsx-import-source"])
    expect(result.ok && result.project.tailwindCss).toBe("src/extra.css")
  })

  it("asks for a package.json first", () => {
    const result = runInitPreflight(
      process.platform === "win32" ? "C:\\" : "/",
      options
    )
    expect(codes(result)).toEqual(["error:no-project"])
  })
})
