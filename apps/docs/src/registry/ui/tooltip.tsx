import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as TooltipPrimitive from "@kobalte/core/tooltip"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

const Tooltip = (props: TooltipPrimitive.TooltipRootProps) => {
  const others = omit(props, "openDelay", "placement")
  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      openDelay={props.openDelay ?? 0}
      placement={props.placement ?? "top"}
      {...others}
    />
  )
}

type TooltipTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  TooltipPrimitive.TooltipTriggerProps<T>
>

const TooltipTrigger = <T extends ValidComponent = "button">(props: TooltipTriggerProps<T>) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
)

type TooltipContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TooltipPrimitive.TooltipContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const TooltipContent = <T extends ValidComponent = "div">(props: TooltipContentProps<T>) => {
  const others = omit(props as TooltipContentProps, "class", "children")
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        class={cn(
          "cn-tooltip-content z-50 w-fit max-w-xs origin-(--kb-tooltip-content-transform-origin) bg-foreground text-background",
          props.class
        )}
        {...others}
      >
        {props.children}
        <TooltipPrimitive.Arrow size={19} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
