import { type ComponentProps, createSignal, splitProps } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/v1/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/registry/v1/ui/collapsible"
import { Separator } from "~/registry/v1/ui/separator"

export function CodeCollapsibleWrapper(props: ComponentProps<typeof Collapsible>) {
  const [local, other] = splitProps(props, ["class", "children"])
  const [isOpened, setIsOpened] = createSignal(false)

  return (
    <Collapsible
      class={cn("md:-mx-1 relative", local.class)}
      forceMount
      onOpenChange={setIsOpened}
      open={isOpened()}
      {...other}
    >
      <CollapsibleTrigger as="div" class="absolute top-1.5 right-9 z-10 flex items-center">
        <Button class="h-7 rounded-md px-2 text-muted-foreground" size="sm" variant="ghost">
          {isOpened() ? "Collapse" : "Expand"}
        </Button>
        <Separator class="!h-4 mx-1.5" orientation="vertical" />
      </CollapsibleTrigger>
      <CollapsibleContent class="[&>figure]:md:!mx-0 relative mt-6 overflow-hidden data-[closed]:max-h-64 [&>figure]:mt-0">
        {local.children}
      </CollapsibleContent>
      <CollapsibleTrigger class="-bottom-2 absolute inset-x-0 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b from-code/70 to-code text-muted-foreground text-sm data-[expanded]:hidden">
        {isOpened() ? "Collapse" : "Expand"}
      </CollapsibleTrigger>
    </Collapsible>
  )
}
