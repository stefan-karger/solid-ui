import type { JSX, ValidComponent } from "solid-js"
import { type Component, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as TooltipPrimitive from "@kobalte/core/tooltip"

import { cn } from "~/lib/utils"

const TooltipTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, TooltipPrimitive.TooltipTriggerProps<T>>
) => <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />

const Tooltip: Component<TooltipPrimitive.TooltipRootProps> = (props) => {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

type TooltipContentProps<T extends ValidComponent = "div"> =
  TooltipPrimitive.TooltipContentProps<T> & { class?: string | undefined; children?: JSX.Element }

const TooltipContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TooltipContentProps<T>>
) => {
  const [local, others] = splitProps(props as TooltipContentProps, ["class", "children"])
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "fade-in-0 zoom-in-95 data-[closed]:fade-out-0 data-[closed]:zoom-out-95 z-50 w-fit origin-(--kb-popover-content-transform-origin) animate-in text-balance rounded-md bg-foreground px-3 py-1.5 text-background text-xs data-[closed]:animate-out",
          local.class
        )}
        data-slot="tooltip-content"
        {...others}
      >
        <TooltipPrimitive.Arrow />
        {local.children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
