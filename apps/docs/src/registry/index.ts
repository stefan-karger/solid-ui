import { examples } from "~/registry/examples/_registry"
import { hooks } from "~/registry/hooks/_registry"
import { lib } from "~/registry/lib/_registry"
import type { Registry } from "~/registry/schema"
import { ui } from "~/registry/ui/_registry"

export const registry = {
  name: "SolidUI",
  homepage: "https://www.solid-ui.com",
  items: [...lib, ...ui, ...hooks, ...examples]
} satisfies Registry
