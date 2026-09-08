import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger
} from "~/registry/ui/popover"

const placements = [
  { label: "Start", placement: "bottom-start" },
  { label: "Center", placement: "bottom" },
  { label: "End", placement: "bottom-end" }
] as const

export default function PopoverAlignments() {
  return (
    <div class="flex gap-6">
      <For each={placements}>
        {(item) => (
          <Popover placement={item.placement}>
            <PopoverTrigger as={Button} size="sm" variant="outline">
              {item.label}
            </PopoverTrigger>
            <PopoverContent class="w-56">
              <PopoverTitle>{item.label} aligned</PopoverTitle>
              <PopoverDescription>
                Uses <code>{item.placement}</code> placement to align content.
              </PopoverDescription>
            </PopoverContent>
          </Popover>
        )}
      </For>
    </div>
  )
}
