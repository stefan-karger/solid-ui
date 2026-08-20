import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as PopoverPrimitive from "@kobalte/core/popover"

import { cn } from "~/lib/utils"

type PopoverProps = PopoverPrimitive.PopoverRootProps

const Popover = (props: PopoverProps) => {
  const mergedProps = mergeProps({ gutter: 4, placement: "bottom" } as const, props)
  return <PopoverPrimitive.Root data-slot="popover" {...mergedProps} />
}

type PopoverTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverTriggerProps<T>
>

const PopoverTrigger = <T extends ValidComponent = "button">(props: PopoverTriggerProps<T>) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

type PopoverAnchorProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverAnchorProps<T>
>

const PopoverAnchor = <T extends ValidComponent = "div">(props: PopoverAnchorProps<T>) => {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

type PopoverContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const PopoverContent = <T extends ValidComponent = "div">(props: PopoverContentProps<T>) => {
  const [local, others] = splitProps(props as PopoverContentProps, ["class", "children"])

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          "cn-popover-content z-50 w-72 origin-(--kb-popover-content-transform-origin) outline-hidden",
          local.class
        )}
        data-slot="popover-content"
        {...others}
      >
        {local.children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

type PopoverCloseButtonProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverCloseButtonProps<T>
> &
  Pick<ComponentProps<T>, "class">

const PopoverCloseButton = <T extends ValidComponent = "button">(
  props: PopoverCloseButtonProps<T>
) => {
  const [local, others] = splitProps(props as PopoverCloseButtonProps, ["class"])
  return (
    <PopoverPrimitive.CloseButton
      class={cn("cn-popover-close-button", local.class)}
      data-slot="popover-close-button"
      {...others}
    />
  )
}

type PopoverHeaderProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const PopoverHeader = (props: PopoverHeaderProps) => {
  const [local, others] = splitProps(props, ["class"])
  return <div class={cn("cn-popover-header", local.class)} data-slot="popover-header" {...others} />
}

type PopoverTitleProps<T extends ValidComponent = "h2"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverTitleProps<T>
> &
  Pick<ComponentProps<T>, "class">

const PopoverTitle = <T extends ValidComponent = "h2">(props: PopoverTitleProps<T>) => {
  const [local, others] = splitProps(props as PopoverTitleProps, ["class"])
  return (
    <PopoverPrimitive.Title
      class={cn("cn-popover-title z-font-heading", local.class)}
      data-slot="popover-title"
      {...others}
    />
  )
}

type PopoverDescriptionProps<T extends ValidComponent = "p"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverDescriptionProps<T>
> &
  Pick<ComponentProps<T>, "class">

const PopoverDescription = <T extends ValidComponent = "p">(props: PopoverDescriptionProps<T>) => {
  const [local, others] = splitProps(props as PopoverDescriptionProps, ["class"])
  return (
    <PopoverPrimitive.Description
      class={cn("cn-popover-description", local.class)}
      data-slot="popover-description"
      {...others}
    />
  )
}

type PopoverArrowProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverArrowProps<T>
> &
  Pick<ComponentProps<T>, "class">

const PopoverArrow = <T extends ValidComponent = "div">(props: PopoverArrowProps<T>) => {
  const [local, others] = splitProps(props as PopoverArrowProps, ["class"])
  return (
    <PopoverPrimitive.Arrow
      class={cn("cn-popover-arrow", local.class)}
      data-slot="popover-arrow"
      {...others}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
}
