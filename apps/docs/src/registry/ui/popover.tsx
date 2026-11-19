import { type ComponentProps } from "@solidjs/web"
import {
  Popover as SdkPopover,
  PopoverTrigger as SdkPopoverTrigger,
  PopoverContent as SdkPopoverContent,
  PopoverClose as SdkPopoverClose,
  PopoverTitle as SdkPopoverTitle,
  PopoverDescription as SdkPopoverDescription,
  PopoverArrow as SdkPopoverArrow
} from "@ui-sdk/solid/popover"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
type PopoverProps = ComponentProps<typeof SdkPopover>
const Popover = (props: PopoverProps) => <SdkPopover {...props} />
type PopoverTriggerProps = Omit<ComponentProps<typeof SdkPopoverTrigger>, "class"> & {
  class?: string
}
const PopoverTrigger = (props: PopoverTriggerProps) => <SdkPopoverTrigger {...props} />
type PopoverContentProps = Omit<ComponentProps<typeof SdkPopoverContent>, "class"> & {
  class?: string
}
const PopoverContent = (props: PopoverContentProps) => {
  const others = omit(props, "class", "children")
  return (
    <>
      <SdkPopoverContent
        class={cn(
          "cn-popover-content z-50 w-72 origin-(--transform-origin) outline-hidden",
          props.class
        )}
        {...others}
      >
        {props.children}
      </SdkPopoverContent>
    </>
  )
}
type PopoverCloseButtonProps = Omit<ComponentProps<typeof SdkPopoverClose>, "class"> & {
  class?: string
}
const PopoverCloseButton = (props: PopoverCloseButtonProps) => (
  <SdkPopoverClose {...props} class={cn(props.class)} />
)
type PopoverHeaderProps = ComponentProps<"div"> & {
  class?: string | undefined
}
const PopoverHeader = (props: PopoverHeaderProps) => (
  <div data-slot="popover-header" {...props} class={cn("cn-popover-header", props.class)} />
)
type PopoverTitleProps = Omit<ComponentProps<typeof SdkPopoverTitle>, "class"> & {
  class?: string
}
const PopoverTitle = (props: PopoverTitleProps) => (
  <SdkPopoverTitle {...props} class={cn("cn-popover-title", props.class)} />
)
type PopoverDescriptionProps = Omit<ComponentProps<typeof SdkPopoverDescription>, "class"> & {
  class?: string
}
const PopoverDescription = (props: PopoverDescriptionProps) => (
  <SdkPopoverDescription {...props} class={cn("cn-popover-description", props.class)} />
)
type PopoverArrowProps = Omit<ComponentProps<typeof SdkPopoverArrow>, "class"> & {
  class?: string
}
const PopoverArrow = (props: PopoverArrowProps) => (
  <SdkPopoverArrow {...props} class={cn(props.class)} />
)
export {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
}
