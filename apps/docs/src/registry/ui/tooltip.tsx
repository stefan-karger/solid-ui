type TooltipProps = ComponentProps<typeof SdkTooltip>
import { type ComponentProps } from "@solidjs/web"
import {
  Tooltip as SdkTooltip,
  TooltipTrigger as SdkTooltipTrigger,
  TooltipContent as SdkTooltipContent,
  TooltipArrow as SdkTooltipArrow
} from "@ui-sdk/solid/tooltip"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
const Tooltip = (props: TooltipProps) => <SdkTooltip {...props} />
type TooltipTriggerProps = Omit<ComponentProps<typeof SdkTooltipTrigger>, "class"> & {
  class?: string
}
const TooltipTrigger = (props: TooltipTriggerProps) => <SdkTooltipTrigger {...props} />
type TooltipContentProps = Omit<ComponentProps<typeof SdkTooltipContent>, "class"> & {
  class?: string
}
const TooltipContent = (props: TooltipContentProps) => {
  const others = omit(props, "class", "children")
  return (
    <>
      <SdkTooltipContent
        class={cn(
          "cn-tooltip-content z-50 w-fit max-w-xs origin-(--transform-origin) bg-foreground text-background",
          props.class
        )}
        {...others}
      >
        {props.children}
        <SdkTooltipArrow class="cn-tooltip-arrow z-50 bg-foreground fill-foreground" />
      </SdkTooltipContent>
    </>
  )
}
export { Tooltip, TooltipContent, TooltipTrigger }
