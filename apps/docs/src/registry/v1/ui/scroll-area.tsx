import { splitProps } from "solid-js"

import { ScrollArea as ScrollAreaPrimitive } from "@ark-ui/solid/scroll-area"

import { cn } from "~/registry/v1/lib/utils"

const ScrollArea = (props: ScrollAreaPrimitive.RootProps) => {
  const [local, other] = splitProps(props, ["class", "children"])

  return (
    <ScrollAreaPrimitive.Root
      class={cn("relative", local.class)}
      data-slot="scroll-area"
      {...other}
    >
      <ScrollAreaPrimitive.Viewport
        class="size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50"
        data-slot="scroll-area-viewport"
      >
        <ScrollAreaPrimitive.Content data-slot="scroll-area-content">
          {local.children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

const ScrollBar = (props: ScrollAreaPrimitive.ScrollbarProps) => {
  const [local, other] = splitProps(props, ["class", "orientation"])

  return (
    <ScrollAreaPrimitive.Scrollbar
      class={cn(
        "flex touch-none select-none p-px transition-colors",
        local.orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        local.orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        local.class
      )}
      data-slot="scroll-area-scrollbar"
      orientation={local.orientation}
      {...other}
    >
      <ScrollAreaPrimitive.Thumb
        class="relative flex-1 rounded-full bg-border"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
