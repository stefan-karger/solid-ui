import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as SheetPrimitive from "@kobalte/core/dialog"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

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
      class={cn(
        "data-[closed=]:fade-out-0 data-[expanded=]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[closed=]:animate-out data-[expanded=]:animate-in",
        local.class
      )}
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
  const props = mergeProps<SheetContentProps<T>[]>(
    { side: "right", showCloseButton: true },
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
        class={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[closed=]:animate-out data-[expanded=]:animate-in data-[closed=]:duration-300 data-[expanded=]:duration-500",
          local.side === "right" &&
            "data-[closed=]:slide-out-to-right data-[expanded=]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          local.side === "left" &&
            "data-[closed=]:slide-out-to-left data-[expanded=]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          local.side === "top" &&
            "data-[closed=]:slide-out-to-top data-[expanded=]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          local.side === "bottom" &&
            "data-[closed=]:slide-out-to-bottom data-[expanded=]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          local.class
        )}
        data-slot="sheet-content"
        {...others}
      >
        {local.children}
        {local.showCloseButton && (
          <SheetClose class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <svg
              class="size-4"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
            <span class="sr-only">Close</span>
          </SheetClose>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

const SheetHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex flex-col gap-1.5 p-4", local.class)}
      data-slot="sheet-header"
      {...others}
    />
  )
}

const SheetFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("mt-auto flex flex-col gap-2 p-4", local.class)}
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
    <SheetPrimitive.Title class={cn("font-semibold text-foreground", local.class)} {...others} />
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
      class={cn("text-muted-foreground text-sm", local.class)}
      {...others}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
}
