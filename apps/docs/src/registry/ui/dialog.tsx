// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { type ComponentProps } from "@solidjs/web"
import {
  Dialog as SdkDialog,
  DialogTrigger as SdkDialogTrigger,
  DialogClose as SdkDialogClose,
  DialogBackdrop as SdkDialogBackdrop,
  DialogContent as SdkDialogContent,
  DialogTitle as SdkDialogTitle,
  DialogDescription as SdkDialogDescription
} from "@ui-sdk/solid/dialog"
import { omit, Show, type Component } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
type DialogProps = ComponentProps<typeof SdkDialog>
const Dialog: Component<DialogProps> = (props) => <SdkDialog {...props} />
type DialogTriggerProps = Omit<
  ComponentProps<typeof SdkDialogTrigger>,
  "class"
> & {
  class?: string
}
const DialogTrigger = (props: DialogTriggerProps) => (
  <SdkDialogTrigger {...props} />
)
type DialogCloseProps = Omit<ComponentProps<typeof SdkDialogClose>, "class"> & {
  class?: string
}
const DialogClose = (props: DialogCloseProps) => <SdkDialogClose {...props} />
type DialogOverlayProps = Omit<
  ComponentProps<typeof SdkDialogBackdrop>,
  "class"
> & {
  class?: string
}
const DialogOverlay = (props: DialogOverlayProps) => (
  <SdkDialogBackdrop
    {...props}
    class={cn("cn-dialog-overlay fixed inset-0 isolate z-50", props.class)}
  />
)
type DialogContentProps = (Omit<
  ComponentProps<typeof SdkDialogContent>,
  "class"
> & {
  class?: string
}) & {
  showCloseButton?: boolean
}
const DialogContent = (props: DialogContentProps) => {
  const others = omit(props, "children", "showCloseButton")
  return (
    <>
      <DialogOverlay />
      <SdkDialogContent
        {...others}
        class={cn(
          "cn-dialog-content fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none",
          props.class
        )}
      >
        {props.children}
        <Show when={props.showCloseButton !== false}>
          <SdkDialogClose
            render={(partProps) => (
              <Button {...partProps} variant="ghost" size="icon-sm" />
            )}

            class="cn-dialog-close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span class="sr-only">Close</span>
          </SdkDialogClose>
        </Show>
      </SdkDialogContent>
    </>
  )
}
type DialogHeaderProps = ComponentProps<"div">
const DialogHeader = (props: DialogHeaderProps) => (
  <div
    data-slot="dialog-header"
    {...props}
    class={cn("cn-dialog-header flex flex-col", props.class)}
  />
)
type DialogFooterProps = (Omit<ComponentProps<"div">, "class"> & {
  class?: string
}) & {
  showCloseButton?: boolean
}
const DialogFooter = (props: DialogFooterProps) => {
  const others = omit(props, "children", "showCloseButton")
  return (
    <div
      data-slot="dialog-footer"
      {...others}
      class={cn(
        "cn-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        props.class
      )}
    >
      {props.children}
      <Show when={props.showCloseButton}>
        <SdkDialogClose
          render={(partProps) => <Button {...partProps} variant="outline" />}
        >
          Close
        </SdkDialogClose>
      </Show>
    </div>
  )
}
type DialogTitleProps = Omit<ComponentProps<typeof SdkDialogTitle>, "class"> & {
  class?: string
}
const DialogTitle = (props: DialogTitleProps) => (
  <SdkDialogTitle {...props} class={cn("cn-dialog-title", props.class)} />
)
type DialogDescriptionProps = Omit<
  ComponentProps<typeof SdkDialogDescription>,
  "class"
> & {
  class?: string
}
const DialogDescription = (props: DialogDescriptionProps) => (
  <SdkDialogDescription
    {...props}
    class={cn("cn-dialog-description", props.class)}
  />
)
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  type DialogCloseProps,
  type DialogContentProps,
  type DialogDescriptionProps,
  type DialogFooterProps,
  type DialogHeaderProps,
  type DialogOverlayProps,
  type DialogProps,
  type DialogTitleProps,
  type DialogTriggerProps
}
