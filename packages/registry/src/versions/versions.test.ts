import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import {
  computeSupportedVersions,
  toRequirementRange,
  toSupportedRange
} from "./compute.ts"
import { SUPPORTED_VERSIONS, supportedRange } from "./index.ts"

const read = (path: string) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"))

describe("supported versions", () => {
  it("matches the pins in the docs manifest", () => {
    expect(
      SUPPORTED_VERSIONS,
      "Run `pnpm sync:versions` after changing a pinned version."
    ).toEqual(
      computeSupportedVersions(read("../../../../apps/docs/package.json"))
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

  it("lets a project keep older patches of its requirements", () => {
    // The solid-v2 template's lockfile pins solid-js 2.0.0.
    expect(toRequirementRange("solid-js", "2.0.1")).toBe("^2.0.0")
    // A minor can add utilities the components use.
    expect(toRequirementRange("tailwindcss", "4.3.5")).toBe("^4.3.0")
    expect(toRequirementRange("x", "1.0.0-rc.1")).toBe("1.0.0-rc.1")
  })

  it("lists the project requirements apart from the packages it installs", () => {
    expect(Object.keys(SUPPORTED_VERSIONS.requirements).sort()).toEqual([
      "solid-js",
      "tailwindcss"
    ])
    // The project brings @solidjs/web; the CLI never installs it.
    expect(supportedRange("@solidjs/web")).toBeUndefined()
    expect(supportedRange("clsx")).toMatch(/^\^/)
    expect(supportedRange("@solid-ui/registry")).toBeUndefined()
  })
})
