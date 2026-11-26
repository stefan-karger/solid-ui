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
import { merge, omit, Show, type Component } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
type SheetProps = ComponentProps<typeof SdkDialog>
const Sheet: Component<SheetProps> = (props) => <SdkDialog {...props} />
type SheetTriggerProps = Omit<
  ComponentProps<typeof SdkDialogTrigger>,
  "class"
> & {
  class?: string
}
const SheetTrigger = (props: SheetTriggerProps) => (
  <SdkDialogTrigger {...props} />
)
type SheetCloseProps = Omit<ComponentProps<typeof SdkDialogClose>, "class"> & {
  class?: string
}
const SheetClose = (props: SheetCloseProps) => <SdkDialogClose {...props} />
type SheetOverlayProps = Omit<
  ComponentProps<typeof SdkDialogBackdrop>,
  "class"
> & {
  class?: string
}
const SheetOverlay = (props: SheetOverlayProps) => (
  <SdkDialogBackdrop
    {...props}
    class={cn("cn-sheet-overlay fixed inset-0 isolate z-50", props.class)}
  />
)
type SheetContentProps = (Omit<
  ComponentProps<typeof SdkDialogContent>,
  "class"
> & {
  class?: string
  "data-slot"?: string
}) & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}
const SheetContent = (props: SheetContentProps) => {
  const others = omit(
    props,
    "children",
    "side",
    "showCloseButton",
    "render",
    "data-slot"
  )
  const renderContent: SheetContentProps["render"] = (part, state) => {
    const attributes = merge(part, () => ({
      "data-slot": props["data-slot"] ?? "sheet-content"
    }))
    return props.render ? (
      props.render(attributes, state)
    ) : (
      <div {...attributes} />
    )
  }
  return (
    <>
      <SheetOverlay />
      <SdkDialogContent
        data-side={props.side ?? "right"}
        {...others}
        class={cn("cn-sheet-content", props.class)}
        render={renderContent}
      >
        {props.children}
        <Show when={props.showCloseButton !== false}>
          <SdkDialogClose
            render={(partProps) => (
              <Button {...partProps} variant="ghost" size="icon-sm" />
            )}

            class="cn-sheet-close"
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
type SheetHeaderProps = ComponentProps<"div">
const SheetHeader = (props: SheetHeaderProps) => (
  <div
    data-slot="sheet-header"
    {...props}
    class={cn("cn-sheet-header flex flex-col", props.class)}
  />
)
type SheetFooterProps = ComponentProps<"div">
const SheetFooter = (props: SheetFooterProps) => (
  <div
    data-slot="sheet-footer"
    {...props}
    class={cn("cn-sheet-footer mt-auto flex flex-col", props.class)}
  />
)
type SheetTitleProps = Omit<ComponentProps<typeof SdkDialogTitle>, "class"> & {
  class?: string
}
const SheetTitle = (props: SheetTitleProps) => (
  <SdkDialogTitle {...props} class={cn("cn-sheet-title", props.class)} />
)
type SheetDescriptionProps = Omit<
  ComponentProps<typeof SdkDialogDescription>,
  "class"
> & {
  class?: string
}
const SheetDescription = (props: SheetDescriptionProps) => (
  <SdkDialogDescription
    {...props}
    class={cn("cn-sheet-description", props.class)}
  />
)
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
