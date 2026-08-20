import type { ComponentProps, JSX, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import {
  Content,
  Menu,
  type NavigationMenuContentProps as NavigationMenuContentPrimitiveProps,
  type NavigationMenuRootProps,
  type NavigationMenuTriggerProps as NavigationMenuTriggerPrimitiveProps,
  Portal,
  Root,
  Trigger,
  Viewport
} from "@kobalte/core/navigation-menu"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-solid"

import { cn } from "~/lib/utils"

type NavigationMenuProps<T extends ValidComponent = "ul"> = PolymorphicProps<
  T,
  NavigationMenuRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const NavigationMenu = <T extends ValidComponent = "ul">(props: NavigationMenuProps<T>) => {
  const mergedProps = mergeProps({ gutter: 8, placement: "bottom-start" }, props)
  const [local, others] = splitProps(mergedProps as NavigationMenuProps, ["class", "children"])
  return (
    <Root
      class={cn(
        "group/navigation-menu cn-navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        local.class
      )}
      data-slot="navigation-menu"
      {...others}
    >
      <div
        class="group cn-navigation-menu-list flex flex-1 list-none items-center justify-center"
        data-slot="navigation-menu-list"
      >
        {local.children}
      </div>
      <Viewport class="origin-(--kb-menu-content-transform-origin)" />
    </Root>
  )
}

type NavigationMenuItemProps = ComponentProps<"div">

const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Menu>
      <div
        class={cn("cn-navigation-menu-item relative", local.class)}
        data-slot="navigation-menu-item"
        {...others}
      />
    </Menu>
  )
}

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger cn-navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none"
)

type NavigationMenuTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  NavigationMenuTriggerPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const NavigationMenuTrigger = <T extends ValidComponent = "div">(
  props: NavigationMenuTriggerProps<T>
) => {
  const [local, others] = splitProps(props as NavigationMenuTriggerProps, ["class", "children"])
  return (
    <Trigger
      class={cn(navigationMenuTriggerStyle(), "group", local.class)}
      data-slot="navigation-menu-trigger"
      {...others}
    >
      {local.children}
      <ChevronDown aria-hidden="true" class="cn-navigation-menu-trigger-icon" />
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
  const [local, others] = splitProps(props as NavigationMenuContentProps, ["class"])
  return (
    <Portal>
      <Content
        class={cn(
          "cn-navigation-menu-content absolute top-0 h-full w-auto origin-(--kb-menu-content-transform-origin) **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0",
          local.class
        )}
        data-slot="navigation-menu-content"
        {...others}
      />
    </Portal>
  )
}

type NavigationMenuLinkProps = ComponentProps<"a"> & {
  class?: string
  children?: JSX.Element
}

const NavigationMenuLink = (props: NavigationMenuLinkProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <a
      class={cn("cn-navigation-menu-link", local.class)}
      data-slot="navigation-menu-link"
      {...others}
    />
  )
}

type NavigationMenuIndicatorProps = ComponentProps<"div"> & {
  class?: string
}

const NavigationMenuIndicator = (props: NavigationMenuIndicatorProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-navigation-menu-indicator top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
        local.class
      )}
      data-slot="navigation-menu-indicator"
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
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
}
