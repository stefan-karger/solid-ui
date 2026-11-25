import type { Registry } from "@solid-ui/registry/schema"

import { components } from "./components/_registry.ts"
import { examples } from "./examples/_registry.ts"
import { aiExamples } from "./examples/ai-elements/_registry.ts"
import { hooks } from "./hooks/_registry.ts"
import { lib } from "./lib/_registry.ts"
import { ui } from "./ui/_registry.ts"

export const registry = {
  name: "SolidUI",
  homepage: "https://www.solid-ui.com",
  items: [...lib, ...ui, ...hooks, ...components, ...examples, ...aiExamples]
} satisfies Registry
