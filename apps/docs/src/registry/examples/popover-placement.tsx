import { For, Show } from "solid-js"
import { Button } from "~/registry/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/registry/ui/popover"

const popoverPlacement = [
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
  "left-end",
] as const

export default function PopoverAlignments() {
  return (
    <div class="grid gap-4">
      <div class="flex flex-wrap justify-center gap-2">
        <For each={popoverPlacement}>
          {(placement, index) => (
            <>
              <Popover placement={placement}>
                <PopoverTrigger as={Button<"button">} variant="outline" size="sm">{placement}</PopoverTrigger>
                <PopoverContent class="w-auto">
                  Aligned to {placement}
                </PopoverContent>
              </Popover>
              <Show when={(index()+1) % 3 == 0}>
                <div class="w-full" />
              </Show>
            </>
          )}
        </For>
      </div>
    </div>
  )
}
