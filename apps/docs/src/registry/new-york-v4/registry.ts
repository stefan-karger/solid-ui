import { z } from "zod"

import { type Registry, registryItemSchema } from "~/registry/schema"

import { themes } from "../themes"
import { blocks } from "./blocks/_registry"
// import { charts } from "./charts/_registry"
import { examples } from "./examples/_registry"
import { hooks } from "./hooks/_registry"
// import { internal } from "./internal/_registry"
import { lib } from "./lib/_registry"
import { ui } from "./ui/_registry"

// Shared between index and style for backward compatibility.
const NEW_YORK_V4_STYLE = {
  type: "registry:style",
  dependencies: ["class-variance-authority"],
  devDependencies: ["tw-animate-css"],
  registryDependencies: ["utils"],
  cssVars: {},
  files: []
}

export const registry = {
  name: "SolidUI",
  homepage: "https://www.solid-ui.com",
  items: z.array(registryItemSchema).parse([
    {
      name: "index",
      ...NEW_YORK_V4_STYLE
    },
    {
      name: "style",
      ...NEW_YORK_V4_STYLE
    },
    ...ui,
    ...blocks,
    // ...charts,
    ...lib,
    ...hooks,
    ...themes,
    ...examples
    // ...internal
  ])
} satisfies Registry
