import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as PopoverPrimitive from "@kobalte/core/popover"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type PopoverProps = PopoverPrimitive.PopoverRootProps

const Popover = (props: PopoverProps) => {
  const others = omit(props, "gutter", "placement")
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      gutter={props.gutter ?? 4}
      placement={props.placement ?? "bottom"}
      {...others}
    />
  )
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
  const others = omit(props as PopoverContentProps, "class", "children")
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        class={cn(
          "cn-popover-content z-50 w-72 origin-(--kb-popover-content-transform-origin) outline-hidden",
          props.class
        )}
        {...others}
      >
        {props.children}
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
  const others = omit(props as PopoverCloseButtonProps, "class")
  return (
    <PopoverPrimitive.CloseButton
      data-slot="popover-close-button"
      class={cn(props.class)}
      {...others}
    />
  )
}

type PopoverHeaderProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const PopoverHeader = (props: PopoverHeaderProps) => {
  const others = omit(props, "class")
  return <div data-slot="popover-header" class={cn("cn-popover-header", props.class)} {...others} />
}

type PopoverTitleProps<T extends ValidComponent = "h2"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverTitleProps<T>
> &
  Pick<ComponentProps<T>, "class">

const PopoverTitle = <T extends ValidComponent = "h2">(props: PopoverTitleProps<T>) => {
  const others = omit(props as PopoverTitleProps, "class")
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      class={cn("cn-popover-title", props.class)}
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
  const others = omit(props as PopoverDescriptionProps, "class")
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      class={cn("cn-popover-description", props.class)}
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
  const others = omit(props as PopoverArrowProps, "class")
  return <PopoverPrimitive.Arrow data-slot="popover-arrow" class={cn(props.class)} {...others} />
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
