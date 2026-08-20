import { For, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

const placements = [
  "top-start",
  "top",
  "top-end",
  "right-start",
  "right",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
  "left-start",
  "left",
  "left-end"
] as const

export default function TooltipPlacement() {
  return (
    <div class="flex flex-wrap justify-center gap-2">
      <For each={placements}>
        {(placement, index) => (
          <>
            <Tooltip placement={placement}>
              <TooltipTrigger as={Button<"button">} variant="outline">
                {placement}
              </TooltipTrigger>
              <TooltipContent>
                <p>Showing on the {placement}.</p>
              </TooltipContent>
            </Tooltip>
            <Show when={(index() + 1) % 3 === 0}>
              <div class="w-full" />
            </Show>
          </>
        )}
      </For>
    </div>
  )
}
