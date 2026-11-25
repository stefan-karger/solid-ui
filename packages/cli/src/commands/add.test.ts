import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

import { DEFAULT_ALIASES } from "@solid-ui/registry/config"
import type { RegistryItem } from "@solid-ui/registry/schema"
import { supportedRange } from "@solid-ui/registry/versions"
import { describe, expect, it } from "vitest"

import {
  fakeRegistry,
  recordingInstaller,
  recordingUi,
  registryItems,
  UTILS_SOURCE
} from "../../test/harness"
import { createProject, TEMPLATE_TSCONFIG } from "../../test/project"
import { runAdd, type AddOptions } from "./add"

const UI_SDK = `@ui-sdk/solid@${supportedRange("@ui-sdk/solid")}`

const items: Record<string, Partial<RegistryItem>> = {
  button: {
    name: "button",
    type: "registry:ui",
    dependencies: ["class-variance-authority@^0.7.1"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
        content: `import { cn } from "~/lib/utils"\nexport const Button = () => <button class={cn("inline-flex")} />\n`
      }
    ]
  },
  "dropdown-menu": {
    name: "dropdown-menu",
    type: "registry:ui",
    dependencies: [UI_SDK],
    registryDependencies: ["button", "utils"],
    files: [
      {
        path: "ui/dropdown-menu.tsx",
        type: "registry:ui",
        content: `import { Button } from "~/components/ui/button"\nconst content = "cn-menu-target cn-menu-translucent z-50 bg-popover"\n`
      }
    ]
  },
  marker: {
    name: "marker",
    type: "registry:ui",
    registryDependencies: ["style-utilities", "utils"],
    files: [
      { path: "ui/marker.tsx", type: "registry:ui", content: "export {}\n" }
    ]
  },
  "use-mobile": {
    name: "use-mobile",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:hook",
        content: "export const useMobile = () => false\n"
      }
    ]
  },
  "button-demo": {
    name: "button-demo",
    type: "registry:example",
    files: [{ path: "examples/button-demo.tsx", type: "registry:example" }]
  }
}

function setUp(config: Record<string, unknown> = {}) {
  return createProject({
    files: {
      "tsconfig.json": TEMPLATE_TSCONFIG.replace(
        '"strict": true,',
        '"strict": true,\n    "paths": { "~/*": ["./src/*"], "@/*": ["./app/*"] },'
      ),
      "src/App.css": '@import "tailwindcss";\n',
      "components.json": JSON.stringify({
        style: "nova",
        preset: "b0",
        tailwind: { css: "src/App.css" },
        ...config
      })
    }
  })
}

async function add(
  cwd: string,
  names: string[],
  options: Partial<AddOptions> = {},
  registry = fakeRegistry(registryItems(items))
) {
  const installer = recordingInstaller()
  const { ui, messages } = recordingUi()
  await runAdd(
    names,
    { cwd, overwrite: false, yes: false, all: false, ...options },
    {
      client: registry.client,
      install: installer.install,
      ui,
      interactive: false
    }
  )
  return { installer, messages, registry }
}

const read = (cwd: string, file: string) =>
  readFileSync(path.join(cwd, file), "utf8")

describe("add", () => {
  it("adds a component with its registry dependencies and packages", async () => {
    const cwd = setUp()
    const { installer, messages, registry } = await add(cwd, ["dropdown-menu"])

    expect(read(cwd, "src/lib/utils.ts")).toBe(UTILS_SOURCE)
    expect(read(cwd, "src/components/ui/button.tsx")).toContain(
      'from "~/lib/utils"'
    )
    expect(read(cwd, "src/components/ui/dropdown-menu.tsx")).toContain(
      'const content = "z-50 bg-popover"'
    )
    expect(registry.requests.slice(1)).toEqual([
      "https://registry.test/r/styles/nova/utils.json",
      "https://registry.test/r/styles/nova/button.json",
      "https://registry.test/r/styles/nova/dropdown-menu.json"
    ])
    expect(installer.calls).toEqual([
      [
        "clsx@^2.1.1",
        "tailwind-merge@^3.7.1",
        "class-variance-authority@^0.7.1",
        UI_SDK
      ]
    ])
    expect(messages.join("\n")).toContain(
      "task: Wrote src/components/ui/button.tsx"
    )
  })

  it("resolves menu markers from the project's menu color", async () => {
    const cwd = setUp({ menuColor: "inverted-translucent" })
    await add(cwd, ["dropdown-menu"])
    const source = read(cwd, "src/components/ui/dropdown-menu.tsx")
    expect(source).toMatch(/"dark z-50 .*bg-popover\/70/)
    expect(source).not.toContain("cn-menu")
  })

  it("leaves style-utilities to init and places hooks by alias", async () => {
    const cwd = setUp()
    const { registry } = await add(cwd, ["marker", "use-mobile"])
    expect(registry.requests.join(" ")).not.toContain("style-utilities")
    expect(read(cwd, "src/hooks/use-mobile.ts")).toContain("useMobile")
  })

  it("writes to and imports from custom aliases", async () => {
    const cwd = setUp({
      aliases: {
        ...DEFAULT_ALIASES,
        ui: "@/ui",
        utils: "@/utils/cn",
        lib: "@/utils"
      }
    })
    await add(cwd, ["button"])
    expect(read(cwd, "app/utils/utils.ts")).toBe(UTILS_SOURCE)
    expect(read(cwd, "app/ui/button.tsx")).toContain('from "@/utils/cn"')
  })

  it("keeps a changed file unless --overwrite is set", async () => {
    const cwd = setUp()
    await add(cwd, ["button"])
    const file = path.join(cwd, "src/components/ui/button.tsx")
    writeFileSync(file, "// mine\n")

    const kept = await add(cwd, ["button"])
    expect(read(cwd, "src/components/ui/button.tsx")).toBe("// mine\n")
    expect(kept.messages.join("\n")).toContain(
      "Kept src/components/ui/button.tsx (yours differs from the registry)"
    )
    // Files that match the registry get no line.
    expect(kept.messages.join("\n")).not.toContain("src/lib/utils.ts")
    expect(kept.messages.at(-2)).toBe(
      "info: Run add with --overwrite to replace files that differ."
    )

    await add(cwd, ["button"], { overwrite: true })
    expect(read(cwd, "src/components/ui/button.tsx")).toContain("inline-flex")
  })

  it("adds every component with --all but no examples", async () => {
    const cwd = setUp()
    const { registry } = await add(cwd, [], { all: true })
    const fetched = registry.requests.map((url) => path.basename(url))
    expect(fetched).toContain("marker.json")
    expect(fetched).not.toContain("button-demo.json")
    expect(fetched).not.toContain("use-mobile.json")
  })

  it("suggests names for unknown components", async () => {
    await expect(add(setUp(), ["buton", "dropdown"])).rejects.toThrow(
      /buton \(did you mean button\?\)\n {2}dropdown \(did you mean dropdown-menu\?\)/
    )
  })

  it("points to init, the legacy CLI or a fix for components.json", async () => {
    const empty = createProject()
    await expect(add(empty, ["button"])).rejects.toThrow(
      "npx solidui-cli@latest init"
    )

    const legacy = createProject({
      files: { "ui.config.json": "{}", "tsconfig.json": TEMPLATE_TSCONFIG }
    })
    await expect(add(legacy, ["button"])).rejects.toThrow(
      "npx solidui-cli@0.7.2 add <component>"
    )

    const shadcn = setUp({ rsc: true, style: "new-york" })
    await expect(add(shadcn, ["button"])).rejects.toThrow(
      /doesn't match solidui-cli 1\.x:\n {2}(?:style|\(root\))/
    )
  })

  it("notes when the registry is ahead of the CLI's UI SDK anchor", async () => {
    const cwd = setUp()
    const ahead = registryItems({
      ...items,
      "dropdown-menu": {
        ...items["dropdown-menu"],
        dependencies: ["@ui-sdk/solid@0.1.0-beta.99"]
      }
    })
    const { messages } = await add(
      cwd,
      ["dropdown-menu"],
      {},
      fakeRegistry(ahead)
    )
    expect(messages.join("\n")).toContain(
      "The registry uses @ui-sdk/solid 0.1.0-beta.99"
    )
  })
})
