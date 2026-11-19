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
          <Popover>
            <PopoverTrigger
              render={(partProps) => <Button {...partProps} size="sm" variant="outline" />}
            >
              {item.label}
            </PopoverTrigger>
            <PopoverContent
              side={item.placement.split("-")[0] as "top" | "bottom" | "left" | "right"}
              align={(item.placement.split("-")[1] ?? "center") as "start" | "center" | "end"}
              class="w-56"
            >
              <PopoverTitle>{item.label}</PopoverTitle>
              <PopoverDescription>Aligned to {item.label.toLowerCase()}</PopoverDescription>
            </PopoverContent>
          </Popover>
        )}
      </For>
    </div>
  )
}
