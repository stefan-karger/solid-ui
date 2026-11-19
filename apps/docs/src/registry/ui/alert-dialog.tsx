import { type ComponentProps } from "@solidjs/web"
import {
  AlertDialog as SdkAlertDialog,
  AlertDialogTrigger as SdkAlertDialogTrigger,
  AlertDialogBackdrop as SdkAlertDialogBackdrop,
  AlertDialogContent as SdkAlertDialogContent,
  AlertDialogTitle as SdkAlertDialogTitle,
  AlertDialogDescription as SdkAlertDialogDescription,
  AlertDialogClose as SdkAlertDialogClose
} from "@ui-sdk/solid/alert-dialog"
import { omit, type Component } from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"
type AlertDialogProps = ComponentProps<typeof SdkAlertDialog>
const AlertDialog: Component<AlertDialogProps> = (props) => <SdkAlertDialog {...props} />
type AlertDialogTriggerProps = Omit<ComponentProps<typeof SdkAlertDialogTrigger>, "class"> & {
  class?: string
}
const AlertDialogTrigger = (props: AlertDialogTriggerProps) => <SdkAlertDialogTrigger {...props} />
type AlertDialogOverlayProps = Omit<ComponentProps<typeof SdkAlertDialogBackdrop>, "class"> & {
  class?: string
}
const AlertDialogOverlay = (props: AlertDialogOverlayProps) => (
  <SdkAlertDialogBackdrop
    {...props}
    class={cn("cn-alert-dialog-overlay fixed inset-0 isolate z-50", props.class)}
  />
)
type AlertDialogContentProps = (Omit<ComponentProps<typeof SdkAlertDialogContent>, "class"> & {
  class?: string
}) & {
  size?: "default" | "sm"
}
const AlertDialogContent = (props: AlertDialogContentProps) => {
  const others = omit(props, "size")
  return (
    <>
      <AlertDialogOverlay />
      <SdkAlertDialogContent
        data-size={props.size ?? "default"}
        {...others}
        class={cn(
          "group/alert-dialog-content cn-alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none",
          props.class
        )}
      />
    </>
  )
}
type AlertDialogHeaderProps = ComponentProps<"div">
const AlertDialogHeader = (props: AlertDialogHeaderProps) => (
  <div
    data-slot="alert-dialog-header"
    {...props}
    class={cn("cn-alert-dialog-header", props.class)}
  />
)
type AlertDialogFooterProps = ComponentProps<"div">
const AlertDialogFooter = (props: AlertDialogFooterProps) => (
  <div
    data-slot="alert-dialog-footer"
    {...props}
    class={cn(
      "cn-alert-dialog-footer flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
      props.class
    )}
  />
)
type AlertDialogMediaProps = ComponentProps<"div">
const AlertDialogMedia = (props: AlertDialogMediaProps) => (
  <div data-slot="alert-dialog-media" {...props} class={cn("cn-alert-dialog-media", props.class)} />
)
type AlertDialogTitleProps = Omit<ComponentProps<typeof SdkAlertDialogTitle>, "class"> & {
  class?: string
}
const AlertDialogTitle = (props: AlertDialogTitleProps) => (
  <SdkAlertDialogTitle {...props} class={cn("cn-alert-dialog-title", props.class)} />
)
type AlertDialogDescriptionProps = Omit<
  ComponentProps<typeof SdkAlertDialogDescription>,
  "class"
> & {
  class?: string
}
const AlertDialogDescription = (props: AlertDialogDescriptionProps) => (
  <SdkAlertDialogDescription {...props} class={cn("cn-alert-dialog-description", props.class)} />
)
type AlertDialogActionProps = (Omit<ComponentProps<typeof SdkAlertDialogClose>, "class"> & {
  class?: string
}) &
  Pick<ButtonProps, "variant" | "size" | "class">
const AlertDialogAction = (props: AlertDialogActionProps) => {
  const others = omit(props, "variant", "size")
  return (
    <SdkAlertDialogClose
      render={(partProps) => (
        <Button
          {...partProps}
          variant={props.variant ?? "default"}
          size={props.size ?? "default"}
        />
      )}

      value="confirm"
      {...others}
      class={cn("cn-alert-dialog-action", props.class)}
    />
  )
}
type AlertDialogCancelProps = (Omit<ComponentProps<typeof SdkAlertDialogClose>, "class"> & {
  class?: string
}) &
  Pick<ButtonProps, "variant" | "size" | "class">
const AlertDialogCancel = (props: AlertDialogCancelProps) => {
  const others = omit(props, "variant", "size")
  return (
    <SdkAlertDialogClose
      render={(partProps) => (
        <Button
          {...partProps}
          variant={props.variant === undefined ? "outline" : (props.variant ?? "default")}
          size={props.size ?? "default"}
        />
      )}

      value="cancel"
      {...others}
      class={cn("cn-alert-dialog-cancel", props.class)}
    />
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
  AlertDialogTitle,
  AlertDialogTrigger
}
