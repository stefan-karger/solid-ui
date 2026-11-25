import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { extractStyleMap } from "@solid-ui/registry/source"
import { describe, expect, it } from "vitest"

import { styles } from "./appearance"

describe("registry themes", () => {
  it.each(styles)("writes parent variants before dark: in %s", (theme) => {
    const map = extractStyleMap(
      readFileSync(
        resolve(`apps/docs/src/registry/styles/style-${theme}.css`),
        "utf8"
      ),
      theme
    )
    // Nested theme scopes compile `dark:group-*` to a selector that never matches.
    for (const [token, utilities] of map)
      expect({
        token,
        variants: utilities.match(/(?:^|\s)dark:(?:group|peer|in)-\S+/g) ?? []
      }).toEqual({ token, variants: [] })
  })
})
