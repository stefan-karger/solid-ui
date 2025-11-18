import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import type { Portal } from "solid-js/web"

import type {
  ContentProps,
  DescriptionProps,
  DynamicProps,
  LabelProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TriggerProps
} from "@corvu/drawer"
import DrawerPrimitive from "@corvu/drawer"

import { cn } from "~/lib/utils"

const Drawer: Component<RootProps> = (props) => <DrawerPrimitive data-slot="drawer" {...props} />

const DrawerTrigger = <T extends ValidComponent = "button">(
  props: DynamicProps<T, TriggerProps<T>>
) => <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />

const DrawerPortal: Component<PortalProps & ComponentProps<typeof Portal>> = (props) => (
  <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
)

const DrawerClose = <T extends ValidComponent = "button">(
  props: DynamicProps<T, TriggerProps<T>>
) => <DrawerPrimitive.Close data-slot="drawer-close" {...props} />

type DrawerOverlayProps<T extends ValidComponent = "div"> = OverlayProps<T> & { class?: string }

const DrawerOverlay = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerOverlayProps<T>>
) => {
  const [local, others] = splitProps(props as DrawerOverlayProps, ["class"])
  const drawerContext = DrawerPrimitive.useContext()
  return (
    <DrawerPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 data-[transitioning]:transition-colors data-[transitioning]:duration-300",
        local.class
      )}
      data-slot="drawer-overlay"
      style={{
        "background-color": `rgb(0 0 0 / ${0.8 * drawerContext.openPercentage()})`
      }}
      {...others}
    />
  )
}

type DrawerContentProps<T extends ValidComponent = "div"> = ContentProps<T> & {
  class?: string
  children?: JSX.Element
}

const DrawerContent = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerContentProps<T>>
) => {
  const [local, others] = splitProps(props as DrawerContentProps, ["class", "children"])
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        class={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-background before:absolute before:bg-inherit after:absolute after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-300 md:select-none",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:mb-24 data-[side=top]:max-h-[80vh] data-[side=top]:rounded-b-lg data-[side=top]:border-b data-[side=top]:before:inset-x-0 data-[side=top]:before:bottom-full data-[side=top]:before:h-1/2",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:mt-24 data-[side=bottom]:max-h-[80vh] data-[side=bottom]:rounded-t-lg data-[side=bottom]:border-t data-[side=bottom]:after:inset-x-0 data-[side=bottom]:after:top-full data-[side=bottom]:after:h-1/2",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:after:inset-y-0 data-[side=right]:after:left-full data-[side=right]:after:w-1/2 data-[side=right]:sm:max-w-sm",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:before:inset-y-0 data-[side=left]:before:right-full data-[side=left]:before:w-1/2 data-[side=left]:sm:max-w-sm",
          local.class
        )}
        data-slot="drawer-content"
        {...others}
      >
        <div class="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[side=bottom]/drawer-content:block" />
        {local.children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

const DrawerHeader: Component<ComponentProps<"div">> = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <div class={cn("flex flex-col gap-1.5 p-4", props.class)} data-slot="drawer-header" {...rest} />
  )
}

const DrawerFooter: Component<ComponentProps<"div">> = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <div
      class={cn("mt-auto flex flex-col gap-2 p-4", props.class)}
      data-slot="drawer-footer"
      {...rest}
    />
  )
}

type DrawerTitleProps<T extends ValidComponent = "div"> = LabelProps<T> & { class?: string }

const DrawerTitle = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerTitleProps<T>>
) => {
  const [, rest] = splitProps(props as DrawerTitleProps, ["class"])
  return (
    <DrawerPrimitive.Label
      class={cn("font-semibold text-foreground", props.class)}
      data-slot="drawer-title"
      {...rest}
    />
  )
}

type DrawerDescriptionProps<T extends ValidComponent = "div"> = DescriptionProps<T> & {
  class?: string
}

const DrawerDescription = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerDescriptionProps<T>>
) => {
  const [, rest] = splitProps(props as DrawerDescriptionProps, ["class"])
  return (
    <DrawerPrimitive.Description
      class={cn("text-muted-foreground text-sm", props.class)}
      data-slot="drawer-description"
      {...rest}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
}
