import {
  Content,
  Item,
  Menu,
  Portal,
  Root,
  Trigger,
  Viewport,
  type NavigationMenuContentProps as NavigationMenuContentPrimitiveProps,
  type NavigationMenuItemProps as NavigationMenuLinkPrimitiveProps,
  type NavigationMenuRootProps,
  type NavigationMenuTriggerProps as NavigationMenuTriggerPrimitiveProps
} from "@kobalte/core/navigation-menu"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-solid"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type NavigationMenuProps<T extends ValidComponent = "ul"> = PolymorphicProps<
  T,
  NavigationMenuRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    viewport?: boolean
  }

const NavigationMenu = <T extends ValidComponent = "ul">(props: NavigationMenuProps<T>) => {
  const local = merge(
    { gutter: 6, placement: "bottom-start", viewport: true },
    props
  ) as NavigationMenuProps
  const others = omit(
    props as NavigationMenuProps,
    "class",
    "children",
    "gutter",
    "placement",
    "viewport"
  )
  return (
    <Root
      data-slot="navigation-menu"
      data-viewport={local.viewport}
      gutter={local.gutter ?? 6}
      placement={local.placement ?? "bottom-start"}
      class={cn(
        "cn-navigation-menu group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        local.class
      )}
      {...others}
    >
      {local.children}
      {local.viewport && <NavigationMenuViewport />}
    </Root>
  )
}

type NavigationMenuListProps = ComponentProps<"div">

const NavigationMenuList = (props: NavigationMenuListProps) => {
  const others = omit(props, "class")
  return (
    <div
      data-slot="navigation-menu-list"
      class={cn(
        "cn-navigation-menu-list group flex flex-1 list-none items-center justify-center",
        props.class
      )}
      {...others}
    />
  )
}

type NavigationMenuItemProps = ComponentProps<"div">

const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const others = omit(props, "class")
  return (
    <Menu>
      <div
        data-slot="navigation-menu-item"
        class={cn("cn-navigation-menu-item relative", props.class)}
        {...others}
      />
    </Menu>
  )
}

const navigationMenuTriggerStyle = cva(
  "cn-navigation-menu-trigger group/navigation-menu-trigger relative z-0 inline-flex h-9 w-max items-center justify-center outline-none focus-visible:z-10 disabled:pointer-events-none data-expanded:z-10"
)

type NavigationMenuTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  NavigationMenuTriggerPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    showIcon?: boolean
  }

const NavigationMenuTrigger = <T extends ValidComponent = "button">(
  props: NavigationMenuTriggerProps<T>
) => {
  const others = omit(props as NavigationMenuTriggerProps, "class", "children", "showIcon")
  const showIcon = () => {
    if (props.showIcon !== undefined) {
      return props.showIcon
    }
    return !("href" in (others as Record<string, unknown>))
  }
  return (
    <Trigger
      data-slot="navigation-menu-trigger"
      class={cn(navigationMenuTriggerStyle(), "group", props.class)}
      {...others}
    >
      {props.children}
      {showIcon() && <ChevronDownIcon class="cn-navigation-menu-trigger-icon" aria-hidden="true" />}
    </Trigger>
  )
}

type NavigationMenuContentProps<T extends ValidComponent = "ul"> = PolymorphicProps<
  T,
  NavigationMenuContentPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const NavigationMenuContent = <T extends ValidComponent = "ul">(
  props: NavigationMenuContentProps<T>
) => {
  const others = omit(props as NavigationMenuContentProps, "class")
  return (
    <Portal>
      <Content
        data-slot="navigation-menu-content"
        class={cn(
          "cn-navigation-menu-content top-0 left-0 w-full group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none md:absolute md:w-auto",
          props.class
        )}
        {...others}
      />
    </Portal>
  )
}

type NavigationMenuViewportProps = ComponentProps<typeof Viewport>

const NavigationMenuViewport = (props: NavigationMenuViewportProps) => {
  const others = omit(props, "class")
  return (
    <Viewport
      data-slot="navigation-menu-viewport"
      class={cn(
        "cn-navigation-menu-viewport h-(--kb-navigation-menu-viewport-height) w-(--kb-navigation-menu-viewport-width) max-w-(--kb-popper-available-width) origin-(--kb-menu-content-transform-origin) overflow-hidden",
        props.class
      )}
      {...others}
    />
  )
}

type NavigationMenuLinkProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  NavigationMenuLinkPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const NavigationMenuLink = <T extends ValidComponent = "a">(props: NavigationMenuLinkProps<T>) => {
  const others = omit(props as NavigationMenuLinkProps, "class")
  return (
    <Item
      data-slot="navigation-menu-link"
      class={cn("cn-navigation-menu-link", props.class)}
      {...others}
    />
  )
}

type NavigationMenuIndicatorProps = ComponentProps<"div"> & {
  class?: string
}

const NavigationMenuIndicator = (props: NavigationMenuIndicatorProps) => {
  const others = omit(props, "class")
  return (
    <div
      data-slot="navigation-menu-indicator"
      class={cn(
        "cn-navigation-menu-indicator top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
        props.class
      )}
      {...others}
    >
      <div class="cn-navigation-menu-indicator-arrow relative top-[60%] h-2 w-2 rotate-45" />
    </div>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
}
