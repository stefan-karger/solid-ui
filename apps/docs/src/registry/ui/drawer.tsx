import type { ComponentProps } from "@solidjs/web"
import {
  Drawer as SdkDrawer,
  DrawerTrigger as SdkDrawerTrigger,
  DrawerClose as SdkDrawerClose,
  DrawerContent as SdkDrawerContent,
  DrawerBackdrop as SdkDrawerBackdrop,
  DrawerHandle as SdkDrawerHandle,
  DrawerTitle as SdkDrawerTitle,
  DrawerDescription as SdkDrawerDescription
} from "@ui-sdk/solid/drawer"

import { cn } from "~/lib/utils"

export const Drawer = SdkDrawer
export const DrawerTrigger = SdkDrawerTrigger
export const DrawerClose = SdkDrawerClose
export function DrawerOverlay(
  props: Omit<ComponentProps<typeof SdkDrawerBackdrop>, "class"> & { class?: string }
) {
  return <SdkDrawerBackdrop {...props} class={cn("cn-drawer-overlay", props.class)} />
}
export function DrawerContent(
  props: Omit<ComponentProps<typeof SdkDrawerContent>, "class"> & { class?: string }
) {
  // The SDK positions and moves the sheet. Only its contents and appearance are styled here.
  return (
    <>
      <DrawerOverlay />
      <SdkDrawerContent
        {...props}
        class={cn(
          "cn-drawer-content flex max-h-[90svh] flex-col data-[side=left]:max-w-sm data-[side=right]:max-w-sm",
          props.class
        )}
      />
    </>
  )
}
export function DrawerHandle(
  props: Omit<ComponentProps<typeof SdkDrawerHandle>, "class"> & { class?: string }
) {
  return (
    <SdkDrawerHandle
      aria-label="Resize drawer"
      {...props}
      class={cn("mx-auto my-3 h-1 w-24 shrink-0 rounded-full bg-muted", props.class)}
    />
  )
}
export function DrawerTitle(
  props: Omit<ComponentProps<typeof SdkDrawerTitle>, "class"> & { class?: string }
) {
  return <SdkDrawerTitle {...props} class={cn("cn-drawer-title", props.class)} />
}
export function DrawerDescription(
  props: Omit<ComponentProps<typeof SdkDrawerDescription>, "class"> & { class?: string }
) {
  return <SdkDrawerDescription {...props} class={cn("cn-drawer-description", props.class)} />
}
export function DrawerHeader(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="drawer-header"
      class={cn("cn-drawer-header flex flex-col", props.class)}
    />
  )
}
export function DrawerFooter(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="drawer-footer"
      class={cn("cn-drawer-footer mt-auto flex flex-col", props.class)}
    />
  )
}
