import type { Component, ComponentProps, JSX, ParentComponent, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as PopoverPrimitive from "@kobalte/core/popover"

import { cn } from "~/lib/utils"

const Popover: Component<PopoverPrimitive.PopoverRootProps> = (props) => (
  <PopoverPrimitive.Root data-slot="popover" {...props} />
)

const PopoverTrigger: ParentComponent<PopoverPrimitive.PopoverTriggerProps> = (props) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
)

const PopoverAnchor = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PopoverPrimitive.PopoverAnchorProps<T>>
) => <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />

type PopoverContentProps<T extends ValidComponent = "div"> =
  PopoverPrimitive.PopoverContentProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const PopoverContent = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, PopoverContentProps<T>>
) => {
  const props = mergeProps({ gutter: 4 }, rawProps)
  const [local, others] = splitProps(props as PopoverContentProps, ["class", "children"])

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          "cn-popover-content data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 w-72 origin-(--kb-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[closed]:animate-out data-[expanded]:animate-in",
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

const PopoverHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-popover-header flex flex-col gap-1 text-sm", local.class)}
      data-slot="popover-header"
      {...others}
    />
  )
}

const PopoverTitle: Component<ComponentProps<"h2">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <h2
      class={cn("cn-popover-title font-medium", local.class)}
      data-slot="popover-title"
      {...others}
    />
  )
}

const PopoverDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      class={cn("cn-popover-description text-muted-foreground", local.class)}
      data-slot="popover-description"
      {...others}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription
}
