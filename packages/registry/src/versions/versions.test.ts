import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { computeSupportedVersions, toSupportedRange } from "./compute.ts"
import { SUPPORTED_VERSIONS, supportedRange } from "./index.ts"

const read = (path: string) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"))

describe("supported versions", () => {
  it("matches the pins in the root and docs manifests", () => {
    expect(
      SUPPORTED_VERSIONS,
      "Run `pnpm sync:versions` after changing a pinned version."
    ).toEqual(
      computeSupportedVersions(
        read("../../../../package.json"),
        read("../../../../apps/docs/package.json")
      )
    )
  })

  it("allows later releases but holds prereleases to the tested build", () => {
    expect(toSupportedRange("solid-js", "2.0.1")).toBe("^2.0.1")
    expect(toSupportedRange("@ui-sdk/solid", "0.1.0-beta.17")).toBe(
      "0.1.0-beta.17"
    )
    expect(() => toSupportedRange("solid-js", "^2.0.1")).toThrow(
      "solid-js must be pinned to an exact version"
    )
  })

  it("lists the project requirements apart from the packages it installs", () => {
    expect(Object.keys(SUPPORTED_VERSIONS.requirements).sort()).toEqual([
      "@solidjs/vite-plugin",
      "@solidjs/web",
      "solid-js",
      "tailwindcss",
      "vite"
    ])
    expect(supportedRange("clsx")).toMatch(/^\^/)
    expect(supportedRange("@solid-ui/registry")).toBeUndefined()
  })
})
