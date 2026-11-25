import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "~/registry/ui/hover-card"

const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const

export default function HoverCardSides() {
  return (
    <div class="flex flex-wrap items-center justify-center gap-2">
      <For each={HOVER_CARD_SIDES}>
        {(side) => (
          <HoverCard delay={100} closeDelay={100}>
            <HoverCardTrigger
              render={(partProps) => (
                <Button {...partProps} variant="outline" />
              )}
              class="capitalize"
            >
              {side}
            </HoverCardTrigger>
            <HoverCardContent
              side={side.split("-")[0] as "top" | "bottom" | "left" | "right"}
              align={
                (side.split("-")[1] ?? "center") as "start" | "center" | "end"
              }
            >
              <div class="flex flex-col gap-1">
                <h4 class="font-medium">Hover Card</h4>
                <p>
                  This hover card appears on the {side} side of the trigger.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </For>
    </div>
  )
}
