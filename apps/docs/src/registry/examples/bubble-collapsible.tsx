import { ChevronDown } from "lucide-solid";
import { createSignal, Show } from "solid-js";
import { Bubble, BubbleContent } from "~/registry/ui/bubble";
import { Button } from "~/registry/ui/button";
import { Collapsible, CollapsibleTrigger } from "~/registry/ui/collapsible";


const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

const previewLength = 180;

export default function BubbleCollapsible() {
  const [open, setOpen] = createSignal(false);
  const preview = `${text.slice(0, previewLength)}...`;

  return (
    <div class="flex w-full max-w-md flex-col gap-8">
      <Collapsible open={open()} onOpenChange={setOpen}>
        <Bubble variant="muted" align="end">
          <BubbleContent class="whitespace-pre-line">
            <Show when={open()} fallback={<div>{preview}</div>}>
              <div>{text}</div>
            </Show>
            <CollapsibleTrigger
              as={Button}
              variant="link"
              class="group h-auto gap-1 p-0 text-muted-foreground"
            >
              {open() ? "Show less" : "Show more"}
              <ChevronDown
                data-icon="inline-end"
                class="transition-transform group-data-[expanded]:rotate-180"
              />
            </CollapsibleTrigger>
          </BubbleContent>
        </Bubble>
      </Collapsible>
      <Bubble variant="ghost">
        <BubbleContent>
          <span class="whitespace-pre-wrap">{`Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Use this for content that needs the whole row.`}</span>
        </BubbleContent>
      </Bubble>
    </div>
  );
}
