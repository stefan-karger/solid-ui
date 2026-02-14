import type { Component, JSX, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as NavigationMenuPrimitive from "@kobalte/core/navigation-menu"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-solid"

import { cn } from "~/lib/utils"

type NavigationMenuRootProps<T extends ValidComponent = "ul"> =
  NavigationMenuPrimitive.NavigationMenuRootProps<T> & {
    class?: string | undefined
    viewport?: boolean
    children?: JSX.Element
  }

const NavigationMenu = <T extends ValidComponent = "ul">(
  rawProps: PolymorphicProps<T, NavigationMenuRootProps<T>>
) => {
  const props = mergeProps({ viewport: true }, rawProps)
  const [local, others] = splitProps(props as NavigationMenuRootProps, [
    "class",
    "viewport",
    "children"
  ])
  return (
    <NavigationMenuPrimitive.Root
      class={cn("cn-navigation-menu group/navigation-menu relative", local.class)}
      data-slot="navigation-menu"
      data-viewport={local.viewport}
      {...others}
    >
      {local.children}
      {local.viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

type NavigationMenuListProps<T extends ValidComponent = "ul"> =
  NavigationMenuPrimitive.NavigationMenuRootProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const NavigationMenuList = <T extends ValidComponent = "ul">(
  props: PolymorphicProps<T, NavigationMenuListProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuListProps, ["class"])
  return (
    <div
      class={cn(
        "cn-navigation-menu-list group flex flex-1 list-none items-center justify-center gap-1",
        local.class
      )}
      data-slot="navigation-menu-list"
    >
      {others.children}
    </div>
  )
}

const NavigationMenuMenu: Component<NavigationMenuPrimitive.NavigationMenuMenuProps> = (props) => {
  return <NavigationMenuPrimitive.Menu data-slot="navigation-menu-menu" {...props} />
}

const navigationMenuTriggerStyle = cva(
  "cn-navigation-menu-trigger group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm outline-hidden transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[expanded]:bg-accent/50 data-[expanded]:text-accent-foreground data-[expanded]:focus:bg-accent data-[expanded]:hover:bg-accent"
)

type NavigationMenuTriggerProps<T extends ValidComponent = "button"> =
  NavigationMenuPrimitive.NavigationMenuTriggerProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const NavigationMenuTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, NavigationMenuTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuTriggerProps, ["class", "children"])
  return (
    <NavigationMenuPrimitive.Trigger
      class={cn(navigationMenuTriggerStyle(), "group", local.class)}
      data-slot="navigation-menu-trigger"
      {...others}
    >
      {local.children}{" "}
      <ChevronDown class="relative top-px ml-1 size-3 transition-transform duration-300 group-data-[expanded]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  )
}

type NavigationMenuContentProps<T extends ValidComponent = "ul"> =
  NavigationMenuPrimitive.NavigationMenuContentProps<T> & {
    class?: string | undefined
  }

const NavigationMenuContent = <T extends ValidComponent = "ul">(
  props: PolymorphicProps<T, NavigationMenuContentProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuContentProps, ["class"])
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Content
        class={cn(
          "cn-navigation-menu-content data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 group-data-[viewport=false]/navigation-menu:data-[closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[expanded]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[expanded]:zoom-in-95 top-0 left-0 w-full p-2 pr-2.5 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0 group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-[closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[expanded]:animate-in md:absolute md:w-auto",
          local.class
        )}
        data-slot="navigation-menu-content"
        {...others}
      />
    </NavigationMenuPrimitive.Portal>
  )
}

type NavigationMenuLinkProps<T extends ValidComponent = "a"> =
  NavigationMenuPrimitive.NavigationMenuItemProps<T> & {
    class?: string | undefined
  }

const NavigationMenuLink = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T, NavigationMenuLinkProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuLinkProps, ["class"])
  return (
    <NavigationMenuPrimitive.Item
      class={cn(
        "cn-navigation-menu-link flex flex-col gap-1 rounded-sm p-2 text-sm outline-hidden transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active]:bg-accent/50 data-[active]:text-accent-foreground data-[active]:focus:bg-accent data-[active]:hover:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        local.class
      )}
      data-slot="navigation-menu-link"
      {...others}
    />
  )
}

type NavigationMenuViewportProps<T extends ValidComponent = "li"> =
  NavigationMenuPrimitive.NavigationMenuViewportProps<T> & {
    class?: string | undefined
  }

const NavigationMenuViewport = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, NavigationMenuViewportProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuViewportProps, ["class"])
  return (
    <div class={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        class={cn(
          "cn-navigation-menu-viewport data-[closed]:zoom-out-95 data-[expanded]:zoom-in-90 relative mt-1.5 h-[var(--kb-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[closed]:animate-out data-[expanded]:animate-in md:w-[var(--kb-navigation-menu-viewport-width)]",
          local.class
        )}
        data-slot="navigation-menu-viewport"
        {...others}
      />
    </div>
  )
}

type NavigationMenuIndicatorProps<T extends ValidComponent = "div"> =
  NavigationMenuPrimitive.NavigationMenuArrowProps<T> & {
    class?: string | undefined
  }

const NavigationMenuIndicator = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NavigationMenuIndicatorProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuIndicatorProps, ["class"])
  return (
    <NavigationMenuPrimitive.Arrow
      class={cn(
        "cn-navigation-menu-indicator data-[closed]:fade-out data-[expanded]:fade-in relative top-[60%] z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[closed]:animate-out data-[expanded]:animate-in",
        local.class
      )}
      data-slot="navigation-menu-indicator"
      {...others}
    >
      <div class="relative h-2 w-2 rotate-45 rounded-tl-sm border bg-border shadow-md" />
    </NavigationMenuPrimitive.Arrow>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuMenu,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
}
export type { VariantProps }
