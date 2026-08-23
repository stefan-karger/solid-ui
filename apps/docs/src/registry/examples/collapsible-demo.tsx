import { createSignal } from "solid-js"

import { ChevronsUpDown } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/registry/ui/collapsible"

export default function CollapsibleDemo() {
  const [open, setOpen] = createSignal(false)

  return (
    <Collapsible class="flex w-[350px] flex-col gap-2" onOpenChange={setOpen} open={open()}>
      <div class="flex items-center justify-between gap-4 px-4">
        <h4 class="font-semibold text-sm">Order #4189</h4>
        <CollapsibleTrigger
          aria-label="Toggle details"
          as={Button}
          class="size-8"
          size="icon"
          variant="ghost"
        >
          <ChevronsUpDown />
        </CollapsibleTrigger>
      </div>
      <div class="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
        <span class="text-muted-foreground">Status</span>
        <span class="font-medium">Shipped</span>
      </div>
      <CollapsibleContent class="flex flex-col gap-2">
        <div class="rounded-md border px-4 py-2 text-sm">
          <p class="font-medium">Shipping address</p>
          <p class="text-muted-foreground">100 Market St, San Francisco</p>
        </div>
        <div class="rounded-md border px-4 py-2 text-sm">
          <p class="font-medium">Items</p>
          <p class="text-muted-foreground">2x Studio Headphones</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
