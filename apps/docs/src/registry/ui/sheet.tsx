import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { mergeProps, Show, splitProps } from "solid-js"

import * as SheetPrimitive from "@kobalte/core/dialog"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { XIcon } from "lucide-solid"

import { cn } from "~/lib/utils"

const Sheet: Component<SheetPrimitive.DialogRootProps> = (props) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

const SheetTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, SheetPrimitive.DialogTriggerProps<T>>
) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

const SheetClose = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, SheetPrimitive.DialogCloseButtonProps<T>>
) => {
  return <SheetPrimitive.CloseButton data-slot="sheet-close" {...props} />
}

const SheetPortal: Component<SheetPrimitive.DialogPortalProps> = (props) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

type SheetOverlayProps<T extends ValidComponent = "div"> = SheetPrimitive.DialogOverlayProps<T> & {
  class?: string | undefined
}

const SheetOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SheetOverlayProps<T>>
) => {
  const [local, others] = splitProps(props as SheetOverlayProps, ["class"])
  return (
    <SheetPrimitive.Overlay
      class={cn("cn-sheet-overlay fixed inset-0 z-50", local.class)}
      data-slot="sheet-overlay"
      {...others}
    />
  )
}

type SheetContentProps<T extends ValidComponent = "div"> = SheetPrimitive.DialogContentProps<T> & {
  class?: string | undefined
  children?: JSX.Element
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}

const SheetContent = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, SheetContentProps<T>>
) => {
  const props = mergeProps(
    { side: "right", showCloseButton: true } as SheetContentProps<T>,
    rawProps
  )
  const [local, others] = splitProps(props as SheetContentProps, [
    "class",
    "children",
    "side",
    "showCloseButton"
  ])
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        class={cn("cn-sheet-content", local.class)}
        data-side={local.side}
        data-slot="sheet-content"
        {...others}
      >
        {local.children}
        <Show when={local.showCloseButton}>
          <SheetClose class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <XIcon />
            <span class="sr-only">Close</span>
          </SheetClose>
        </Show>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

const SheetHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-sheet-header flex flex-col", local.class)}
      data-slot="sheet-header"
      {...others}
    />
  )
}

const SheetFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-sheet-footer mt-auto flex flex-col", local.class)}
      data-slot="sheet-footer"
      {...others}
    />
  )
}

type SheetTitleProps<T extends ValidComponent = "h2"> = SheetPrimitive.DialogTitleProps<T> & {
  class?: string | undefined
}

const SheetTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, SheetTitleProps<T>>
) => {
  const [local, others] = splitProps(props as SheetTitleProps, ["class"])
  return (
    <SheetPrimitive.Title
      class={cn("cn-font-heading cn-sheet-title", local.class)}
      data-slot="sheet-title"
      {...others}
    />
  )
}

type SheetDescriptionProps<T extends ValidComponent = "p"> =
  SheetPrimitive.DialogDescriptionProps<T> & { class?: string | undefined }

const SheetDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, SheetDescriptionProps<T>>
) => {
  const [local, others] = splitProps(props as SheetDescriptionProps, ["class"])
  return (
    <SheetPrimitive.Description
      class={cn("cn-sheet-description", local.class)}
      data-slot="sheet-description"
      {...others}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
}
