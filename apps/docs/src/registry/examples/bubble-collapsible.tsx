import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { Collapsible, CollapsibleTrigger } from "~/registry/ui/collapsible"

const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`

const previewLength = 180

export default function BubbleCollapsible() {
  const [open, setOpen] = createSignal(false)
  const isLong = text.length > previewLength
  const preview = `${text.slice(0, previewLength)}...`

  return (
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>

      <Bubble variant="muted" align="end">
        <BubbleContent class="whitespace-pre-line">
          <Collapsible open={open()} onOpenChange={setOpen}>
            <div>{open() || !isLong ? text : preview}</div>
            {isLong ? (
              <CollapsibleTrigger
                render={(partProps) => (
                  <Button
                    {...partProps}
                    variant="link"
                    class="gap-1 p-0 text-muted-foreground"
                  >
                    {open() ? "Show less" : "Show more"}
                    <IconPlaceholder
                      lucide="ChevronDownIcon"
                      data-icon="inline-end"
                      class="group-data-open/button:rotate-180"
                    />
                  </Button>
                )}
              />
            ) : null}
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </div>
  )
}
