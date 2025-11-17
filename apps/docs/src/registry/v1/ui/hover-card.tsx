import type { Component, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as HoverCardPrimitive from "@kobalte/core/hover-card"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

const HoverCard: Component<HoverCardPrimitive.HoverCardRootProps> = (props) => {
  return <HoverCardPrimitive.Root data-slot="hover-card" gutter={4} {...props} />
}

const HoverCardTrigger: Component<HoverCardPrimitive.HoverCardRootProps> = (props) => (
  <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
)

type HoverCardContentProps<T extends ValidComponent = "div"> =
  HoverCardPrimitive.HoverCardContentProps<T> & {
    class?: string | undefined
  }

const HoverCardContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, HoverCardContentProps<T>>
) => {
  const [local, others] = splitProps(props as HoverCardContentProps, ["class"])
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 w-64 origin-(--kb-hovercard-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[closed]:animate-out data-[expanded]:animate-in",
          local.class
        )}
        data-slot="hover-card-content"
        {...others}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
