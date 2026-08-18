import * as PopoverPrimitive from "@kobalte/core/popover"
import { mergeProps, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type { Component, ComponentProps, ValidComponent } from "solid-js"

import { cn } from "~/lib/utils"

const PopoverTrigger = PopoverPrimitive.Trigger

const Popover: Component<PopoverPrimitive.PopoverRootProps> = (props) => {
  return <PopoverPrimitive.Root gutter={4} {...props} />
}

type PopoverContentProps<T extends ValidComponent = "div"> =
  PopoverPrimitive.PopoverContentProps<T> & { class?: string | undefined }

const PopoverContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PopoverContentProps<T>>
) => {
  const [local, others] = splitProps(props as PopoverContentProps, ["class"])
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          "cn-popover-content z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          local.class
        )}
        {...others}
      />
    </PopoverPrimitive.Portal>
  )
}

const PopoverHeader = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      data-slot="popover-header"
      class={cn("cn-popover-header flex flex-col gap-0.5 text-sm", local.class)}
      {...others}
    />
  )
}

type PopoverTitleProps<T extends ValidComponent = "div"> =
  PopoverPrimitive.PopoverTitleProps<T> & { class?: string | undefined }

const PopoverTitle = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, PopoverTitleProps<T>>
) => {
  const props = mergeProps({ as: "div" } as PopoverTitleProps, rawProps)
  const [local, others] = splitProps(props, ["class", "as"])

  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      class={cn("cn-popover-title font-medium", local.class)}
      {...others}
    />
  )
}

type PopoverDescriptionProps<T extends ValidComponent = "div"> =
  PopoverPrimitive.PopoverDescriptionProps<T> & { class?: string | undefined }

const PopoverDescription = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, PopoverDescriptionProps<T>>
) => {
  const props = mergeProps({ as: "div" } as PopoverDescriptionProps, rawProps)
  const [local, others] = splitProps(props, ["class", "as"])

  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      class={cn("cn-popover-description text-muted-foreground", local.class)}
      {...others}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription
}
