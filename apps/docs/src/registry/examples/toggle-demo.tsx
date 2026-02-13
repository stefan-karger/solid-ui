import { Bold } from "lucide-solid"

import { Toggle } from "~/registry/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold class="size-4" />
    </Toggle>
  )
}
