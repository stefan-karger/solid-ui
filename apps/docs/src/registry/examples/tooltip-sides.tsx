import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

const sides = ["left", "top", "bottom", "right"] as const

export default function TooltipSides() {
  return (
    <div class="flex flex-wrap gap-2">
      <For each={sides}>
        {(side) => (
          <Tooltip>
            <TooltipTrigger
              render={(partProps) => (
                <Button {...partProps} variant="outline" class="w-fit capitalize" />
              )}
            >
              {side}
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        )}
      </For>
    </div>
  )
}
