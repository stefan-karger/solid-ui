import { createSignal } from "solid-js"

import { IconChevronsUpDown } from "~/components/icons"
import { Button } from "~/registry/new-york-v4/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "~/registry/new-york-v4/ui/collapsible"

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <Collapsible class="flex w-[350px] flex-col gap-2" onOpenChange={setIsOpen} open={isOpen()}>
      <div class="flex items-center justify-between gap-4 px-4">
        <h4 class="font-semibold text-sm">@peduarte starred 3 repositories</h4>

        <Button as={CollapsibleTrigger} class="size-8" size="icon" variant="ghost">
          <IconChevronsUpDown />
          <span class="sr-only">Toggle</span>
        </Button>
      </div>
      <div class="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
      <CollapsibleContent class="flex flex-col gap-2">
        <div class="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
        <div class="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
