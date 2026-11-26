import { For } from "solid-js"

import { showcaseColumns } from "."

// The home page cards, in column order, flowing into as many columns as the preview frame fits.
const cards = showcaseColumns.flatMap((column) => column.cards)

export default function ShowcasePreview() {
  return (
    <div class="min-h-svh bg-muted px-3 py-4 sm:px-6 sm:py-6 dark:bg-background">
      <div class="mx-auto max-w-[112rem] gap-4 min-[760px]:columns-2 min-[1140px]:columns-3 min-[1520px]:columns-4 sm:gap-6">
        <For each={cards}>
          {(card) => (
            <div
              data-preset-card={card.id}
              class="mb-4 min-w-0 break-inside-avoid **:data-[slot=card]:w-full sm:mb-6"
            >
              <card.component />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
