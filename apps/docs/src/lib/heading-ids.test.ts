import { describe, expect, it } from "vitest"

import { createHeadingId } from "./heading-ids"

describe("createHeadingId", () => {
  it.each([
    ["Installation", "installation"],
    ["  Repeated   whitespace\nworks  ", "repeated-whitespace-works"],
    ["What's new?", "whats-new"],
    ["Use <code>aria-label</code> here", "use-aria-label-here"],
    ['<span class="accent">Inline markup</span>', "inline-markup"],
    ["Version 2.0: API!", "version-2.0:-api!"],
    [" <span></span> ", ""]
  ])("derives an ID from %j", (content, expected) => {
    expect(createHeadingId(content)).toBe(expected)
  })
})
