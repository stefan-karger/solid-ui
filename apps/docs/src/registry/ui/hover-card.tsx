import type { Component, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as HoverCardPrimitive from "@kobalte/core/hover-card"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

const HoverCard: Component<HoverCardPrimitive.HoverCardRootProps> = (props) => {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

const HoverCardTrigger = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T, HoverCardPrimitive.HoverCardTriggerProps<T>>
) => <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />

type HoverCardContentProps<T extends ValidComponent = "div"> =
  HoverCardPrimitive.HoverCardContentProps<T> & {
    class?: string | undefined
  }

const HoverCardContent = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, HoverCardContentProps<T>>
) => {
  const props = mergeProps({ gutter: 4 }, rawProps)
  const [local, others] = splitProps(props as HoverCardContentProps, ["class"])
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        class={cn(
          "cn-hover-card-content data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--kb-popper-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
          local.class
        )}
        data-slot="hover-card-content"
        {...others}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
