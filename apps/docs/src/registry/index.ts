import { hooks } from "~/registry/hooks/_registry"
import { lib } from "~/registry/lib/_registry"
import { ui } from "~/registry/ui/_registry"

export const registry = {
  name: "SolidUI",
  homepage: "https://www.solid-ui.com",
  items: [...lib, ...ui, ...hooks]
}
