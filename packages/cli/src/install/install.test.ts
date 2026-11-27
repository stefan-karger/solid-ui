import { DEFAULT_ALIASES } from "@solid-ui/registry/config"
import { describe, expect, it } from "vitest"

import { createProject, supportedInstall } from "../../test/project"
import { readPackageJson } from "../project/package-json"
import { parseSpec, planDependencies } from "./dependencies"
import { rewriteAliases, transformSource } from "./transform"

describe("dependencies", () => {
  it("parses scoped and plain specs", () => {
    expect(parseSpec("@ui-sdk/solid@0.1.0-beta.17")).toEqual({
      name: "@ui-sdk/solid",
      range: "0.1.0-beta.17"
    })
    expect(parseSpec("clsx")).toEqual({ name: "clsx", range: "" })
  })

  it("installs missing packages and reports the ones outside the range", () => {
    const cwd = createProject({
      installed: {
        ...supportedInstall,
        clsx: "2.1.1",
        "tailwind-merge": "2.6.0",
        "@ui-sdk/solid": "0.1.0-beta.16"
      }
    })
    const plan = planDependencies(cwd, readPackageJson(cwd)!, [
      "clsx@^2.1.1",
      "tailwind-merge@^3.7.1",
      "@ui-sdk/solid@0.1.0-beta.17",
      "tw-animate-css@^1.4.0",
      "clsx@^2.0.0"
    ])
    expect(plan.satisfied).toEqual(["clsx"])
    expect(plan.install).toEqual(["tw-animate-css@^1.4.0"])
    expect(plan.conflicts.map(({ name, found }) => `${name} ${found}`)).toEqual(
      ["tailwind-merge 2.6.0", "@ui-sdk/solid 0.1.0-beta.16"]
    )
  })
})

describe("transform", () => {
  const code = `import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { useMobile } from "~/hooks/use-mobile"
import type { Chat } from "~/lib/ai-demo-chat"
const lazy = import("~/components/example")
const text = "~/components/ui/button"`

  it("keeps the default aliases", () => {
    expect(rewriteAliases(code, DEFAULT_ALIASES)).toBe(code)
  })

  it("rewrites module specifiers to the project's aliases only", () => {
    const output = rewriteAliases(code, {
      components: "@/components",
      ui: "@/ui",
      lib: "@/lib",
      utils: "@/utils/cn",
      hooks: "@/hooks"
    })
    expect(output).toContain('from "@/ui/button"')
    expect(output).toContain('from "@/utils/cn"')
    expect(output).toContain('from "@/hooks/use-mobile"')
    expect(output).toContain('from "@/lib/ai-demo-chat"')
    expect(output).toContain('import("@/components/example")')
    expect(output).toContain('const text = "~/components/ui/button"')
  })

  it("resolves menu markers in scripts and leaves other files alone", () => {
    const menu = `const c = "cn-menu-target z-50"`
    const config = {
      aliases: DEFAULT_ALIASES,
      menuColor: "inverted" as const,
      iconLibrary: "lucide" as const
    }
    expect(transformSource("ui/menu.tsx", menu, config)).toBe(
      `const c = "dark z-50"`
    )
    expect(transformSource("styles/x.css", menu, config)).toBe(menu)
  })
})
