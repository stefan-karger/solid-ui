import * as HoverCardPrimitive from "@kobalte/core/hover-card"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

const HoverCard = (props: HoverCardPrimitive.HoverCardRootProps) => {
  const others = omit(props, "gutter")
  return <HoverCardPrimitive.Root data-slot="hover-card" gutter={props.gutter ?? 4} {...others} />
}

type HoverCardTriggerProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  HoverCardPrimitive.HoverCardTriggerProps<T>
>

const HoverCardTrigger = <T extends ValidComponent = "a">(props: HoverCardTriggerProps<T>) => (
  <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
)

type HoverCardContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  HoverCardPrimitive.HoverCardContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const HoverCardContent = <T extends ValidComponent = "div">(props: HoverCardContentProps<T>) => {
  const others = omit(props as HoverCardContentProps, "class", "children")
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        class={cn(
          "cn-hover-card-content z-50 origin-(--kb-hovercard-content-transform-origin) outline-hidden",
          props.class
        )}
        {...others}
      >
        {props.children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
