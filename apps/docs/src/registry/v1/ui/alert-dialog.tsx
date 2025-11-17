import type { Component, ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as AlertDialogPrimitive from "@kobalte/core/alert-dialog"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"
import { Button, buttonVariants } from "~/registry/v1/ui/button"

const AlertDialog: Component<AlertDialogPrimitive.AlertDialogRootProps> = (props) => (
  <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
)

const AlertDialogTrigger: Component<AlertDialogPrimitive.AlertDialogTriggerProps> = (props) => (
  <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
)

const AlertDialogPortal: Component<AlertDialogPrimitive.AlertDialogPortalProps> = (props) => (
  <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
)

type AlertDialogOverlayProps<T extends ValidComponent = "div"> =
  AlertDialogPrimitive.AlertDialogOverlayProps<T> & {
    class?: string | undefined
  }

const AlertDialogOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AlertDialogOverlayProps<T>>
) => {
  const [local, others] = splitProps(props as AlertDialogOverlayProps, ["class"])
  return (
    <AlertDialogPrimitive.Overlay
      class={cn(
        "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[closed]:animate-out data-[expanded]:animate-in",
        local.class
      )}
      data-slot="alert-dialog-overlay"
      {...others}
    />
  )
}

type AlertDialogContentProps<T extends ValidComponent = "div"> =
  AlertDialogPrimitive.AlertDialogContentProps<T> & {
    class?: string | undefined
  }

const AlertDialogContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AlertDialogContentProps<T>>
) => {
  const [local, others] = splitProps(props as AlertDialogContentProps, ["class"])
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[closed]:animate-out data-[expanded]:animate-in sm:max-w-lg",
          local.class
        )}
        {...others}
      />
    </AlertDialogPortal>
  )
}

const AlertDialogHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex flex-col gap-2 text-center sm:text-left", local.class)}
      data-slot="alert-dialog-header"
      {...others}
    />
  )
}

const AlertDialogFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", local.class)}
      data-slot="alert-dialog-footer"
      {...others}
    />
  )
}

type AlertDialogTitleProps<T extends ValidComponent = "h2"> =
  AlertDialogPrimitive.AlertDialogTitleProps<T> & {
    class?: string | undefined
  }

const AlertDialogTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, AlertDialogTitleProps<T>>
) => {
  const [local, others] = splitProps(props as AlertDialogTitleProps, ["class"])
  return (
    <AlertDialogPrimitive.Title
      class={cn("font-semibold text-lg", local.class)}
      data-slot="alert-dialog-title"
      {...others}
    />
  )
}

type AlertDialogDescriptionProps<T extends ValidComponent = "p"> =
  AlertDialogPrimitive.AlertDialogDescriptionProps<T> & {
    class?: string | undefined
  }

const AlertDialogDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, AlertDialogDescriptionProps<T>>
) => {
  const [local, others] = splitProps(props as AlertDialogDescriptionProps, ["class"])
  return (
    <AlertDialogPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      data-slot="alert-dialog-description"
      {...others}
    />
  )
}

const AlertDialogAction: Component<ComponentProps<typeof Button>> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Button class={cn(buttonVariants(), local.class)} data-slot="alert-dialog-action" {...others} />
  )
}

type AlertDialogCancelProps<T extends ValidComponent = "button"> =
  AlertDialogPrimitive.AlertDialogCloseButtonProps<T> & {
    class?: string | undefined
  }

const AlertDialogCancel = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AlertDialogCancelProps<T>>
) => {
  const [local, others] = splitProps(props as AlertDialogCancelProps, ["class"])
  return (
    <AlertDialogPrimitive.CloseButton
      class={cn(buttonVariants({ variant: "outline" }), local.class)}
      data-slot="alert-dialog-cancel"
      {...others}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
}
