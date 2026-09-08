import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

const placements = [
  { label: "Left", placement: "left", text: "Placed to the left side." },
  { label: "Top", placement: "top", text: "Placed above the trigger." },
  { label: "Bottom", placement: "bottom", text: "Placed below the trigger." },
  { label: "Right", placement: "right", text: "Placed to the right side." }
] as const

export default function TooltipSides() {
  return (
    <div class="flex flex-wrap gap-2">
      <For each={placements}>
        {(item) => (
          <Tooltip placement={item.placement}>
            <TooltipTrigger as={Button} size="sm" variant="outline">
              {item.label}
            </TooltipTrigger>
            <TooltipContent>{item.text}</TooltipContent>
          </Tooltip>
        )}
      </For>
    </div>
  )
}
