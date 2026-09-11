import { describe, expect, it } from "vitest"

import { parseRegistryDirectory } from "./registry-directory"

const validEntry = {
  name: "solid-widgets",
  description: "Solid-compatible interface widgets.",
  homepage: "https://example.com/widgets",
  registryUrl: "https://example.com/widgets/registry.json",
  tags: ["solid", "widgets"]
}

describe("parseRegistryDirectory", () => {
  it("accepts valid entries and sorts them deterministically", () => {
    const entries = parseRegistryDirectory([
      { ...validEntry, name: "zeta" },
      { ...validEntry, name: "alpha", logo: "/registry-directory/alpha.png" }
    ])

    expect(entries.map((entry) => entry.name)).toEqual(["alpha", "zeta"])
  })

  it("rejects duplicate names and identifies the entry", () => {
    expect(() => parseRegistryDirectory([validEntry, validEntry])).toThrow(
      "Duplicate registry directory entry: solid-widgets"
    )
  })

  it.each([
    ["an unsafe homepage", { ...validEntry, homepage: "http://example.com" }],
    ["an unsupported registry protocol", { ...validEntry, registryUrl: "ftp://example.com" }],
    ["a raw markup logo", { ...validEntry, logo: "<svg>" }],
    ["a protocol-relative logo", { ...validEntry, logo: "//example.com/logo.png" }],
    ["an invalid name", { ...validEntry, name: "Solid Widgets" }],
    ["mixed-case tags", { ...validEntry, tags: ["Solid"] }],
    ["duplicate tags", { ...validEntry, tags: ["solid", "solid"] }]
  ])("rejects %s", (_label, entry) => {
    expect(() => parseRegistryDirectory([entry])).toThrow(/.+/)
  })
})
