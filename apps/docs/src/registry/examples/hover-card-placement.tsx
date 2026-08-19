import { For, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/registry/ui/hover-card"

const HOVER_CARD_PLACEMENTS = [
  "left-start",
  "left",
  "left-end",
  "top-start",
  "top",
  "top-end",
  "right-start",
  "right",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
] as const


export default function HoverCardPlacement() {
  return (
    <div class="flex flex-wrap justify-center gap-2">
      <For each={HOVER_CARD_PLACEMENTS}>
        {(placement, index) => {
          const current = () => index() + 1
          return (
            <>
              <HoverCard id={placement} placement={placement} openDelay={100} closeDelay={100}>
                <HoverCardTrigger as={Button<"button">} variant="outline" class="capitalize">
                  {placement}
                </HoverCardTrigger>
                <HoverCardContent>
                  <div class="flex flex-col gap-1">
                    <h4 class="font-medium">Hover Card</h4>
                    <p>This hover card appears on the {placement} position of the trigger.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Show when={current() % 3 === 0}>
                <div class="shrink-0 w-full" />
              </Show>
            </>
          )
        }}
      </For>
    </div>
  )
}
