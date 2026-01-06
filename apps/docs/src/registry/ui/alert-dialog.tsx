import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as AlertDialogPrimitive from "@kobalte/core/alert-dialog"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

const AlertDialog: Component<AlertDialogPrimitive.AlertDialogRootProps> = (props) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

const AlertDialogTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AlertDialogPrimitive.AlertDialogTriggerProps<T>>
) => {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}

const AlertDialogPortal: Component<AlertDialogPrimitive.AlertDialogPortalProps> = (props) => {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}

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
      class={cn("cn-alert-dialog-overlay fixed inset-0 z-50", local.class)}
      data-slot="alert-dialog-overlay"
      {...others}
    />
  )
}

type AlertDialogContentProps<T extends ValidComponent = "div"> =
  AlertDialogPrimitive.AlertDialogContentProps<T> & {
    class?: string | undefined
    size?: "default" | "sm"
  }

const AlertDialogContent = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, AlertDialogContentProps<T>>
) => {
  const props = mergeProps({ size: "default" }, rawProps)
  const [local, others] = splitProps(props as AlertDialogContentProps, ["class", "size"])
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        class={cn(
          "cn-alert-dialog-content group/alert-dialog-content -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 grid w-full outline-none",
          local.class
        )}
        data-size={local.size}
        data-slot="alert-dialog-content"
        {...others}
      />
    </AlertDialogPortal>
  )
}

type AlertDialogHeaderProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const AlertDialogHeader: Component<AlertDialogHeaderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-alert-dialog-header", local.class)}
      data-slot="alert-dialog-header"
      {...others}
    />
  )
}

type AlertDialogFooterProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const AlertDialogFooter: Component<AlertDialogFooterProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-alert-dialog-footer flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        local.class
      )}
      data-slot="alert-dialog-footer"
      {...others}
    />
  )
}

type AlertDialogMediaProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const AlertDialogMedia: Component<AlertDialogMediaProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-alert-dialog-media", local.class)}
      data-slot="alert-dialog-media"
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
      class={cn("cn-alert-dialog-title", local.class)}
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
      class={cn("cn-alert-dialog-description", local.class)}
      data-slot="alert-dialog-description"
      {...others}
    />
  )
}

type AlertDialogActionProps<T extends ValidComponent = "button"> =
  AlertDialogPrimitive.AlertDialogCloseButtonProps<T> &
    Pick<ButtonProps, "variant" | "size"> & {
      class?: string | undefined
      children?: JSX.Element
    }

const AlertDialogAction = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, AlertDialogActionProps<T>>
) => {
  const props = mergeProps({ variant: "default", size: "default" } as const, rawProps)
  const [local, others] = splitProps(props as AlertDialogActionProps, [
    "class",
    "variant",
    "size",
    "children"
  ])
  return (
    <Button
      as={AlertDialogPrimitive.CloseButton}
      size={local.size}
      variant={local.variant}
      {...others}
    >
      <span class={cn("cn-alert-dialog-action", local.class)} data-slot="alert-dialog-action">
        {local.children}
      </span>
    </Button>
  )
}

type AlertDialogCancelProps<T extends ValidComponent = "button"> =
  AlertDialogPrimitive.AlertDialogCloseButtonProps<T> &
    Pick<ButtonProps, "variant" | "size"> & {
      class?: string | undefined
      children?: JSX.Element
    }

const AlertDialogCancel = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, AlertDialogCancelProps<T>>
) => {
  const props = mergeProps({ variant: "outline", size: "default" } as const, rawProps)
  const [local, others] = splitProps(props as AlertDialogCancelProps, [
    "class",
    "variant",
    "size",
    "children"
  ])
  return (
    <Button
      as={AlertDialogPrimitive.CloseButton}
      size={local.size}
      variant={local.variant}
      {...others}
    >
      <span class={cn("cn-alert-dialog-cancel", local.class)} data-slot="alert-dialog-cancel">
        {local.children}
      </span>
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
}
