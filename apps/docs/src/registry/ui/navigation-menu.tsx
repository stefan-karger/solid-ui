// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { type ComponentProps } from "@solidjs/web"
import {
  NavigationMenu as SdkNavigationMenu,
  NavigationMenuContent as SdkNavigationMenuContent,
  NavigationMenuLink as SdkNavigationMenuLink,
  NavigationMenuItem as SdkNavigationMenuItem,
  NavigationMenuList as SdkNavigationMenuList,
  NavigationMenuTrigger as SdkNavigationMenuTrigger,
  NavigationMenuViewport as SdkNavigationMenuViewport,
  NavigationMenuIndicator as SdkNavigationMenuIndicator
} from "@ui-sdk/solid/navigation-menu"
import { cva } from "class-variance-authority"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
type NavigationMenuProps = (Omit<
  ComponentProps<typeof SdkNavigationMenu>,
  "class"
> & {
  class?: string
}) & {
  viewport?: boolean
}
const NavigationMenu = (props: NavigationMenuProps) => {
  const local = merge({ viewport: true }, props) as NavigationMenuProps
  const others = omit(props, "class", "children", "viewport")
  return (
    <SdkNavigationMenu
      data-viewport={local.viewport}
      class={cn(
        "cn-navigation-menu group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        local.class
      )}
      {...others}
    >
      {local.children}
      {local.viewport && <NavigationMenuViewport />}
    </SdkNavigationMenu>
  )
}
type NavigationMenuListProps = ComponentProps<typeof SdkNavigationMenuList>
const NavigationMenuList = (props: NavigationMenuListProps) => (
  <SdkNavigationMenuList
    {...props}
    class={cn(
      "cn-navigation-menu-list group flex flex-1 list-none items-center justify-center",
      props.class
    )}
  />
)
type NavigationMenuItemProps = ComponentProps<typeof SdkNavigationMenuItem>
const NavigationMenuItem = (props: NavigationMenuItemProps) => (
  <SdkNavigationMenuItem
    {...props}
    class={cn("cn-navigation-menu-item relative", props.class)}
  />
)
const navigationMenuTriggerStyle = cva(
  "cn-navigation-menu-trigger group/navigation-menu-trigger relative z-0 inline-flex h-9 w-max items-center justify-center outline-none focus-visible:z-10 disabled:pointer-events-none data-open:z-10"
)
type NavigationMenuTriggerProps = (Omit<
  ComponentProps<typeof SdkNavigationMenuTrigger>,
  "class"
> & {
  class?: string
}) & {
  showIcon?: boolean
}
const NavigationMenuTrigger = (props: NavigationMenuTriggerProps) => {
  const others = omit(props, "class", "children", "showIcon")
  const showIcon = () => {
    if (props.showIcon !== undefined) {
      return props.showIcon
    }
    return !("href" in (others as Record<string, unknown>))
  }
  return (
    <SdkNavigationMenuTrigger
      class={cn(navigationMenuTriggerStyle(), "group", props.class)}
      {...others}
    >
      {props.children}
      {showIcon() && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="cn-navigation-menu-trigger-icon"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
    </SdkNavigationMenuTrigger>
  )
}
type NavigationMenuContentProps = Omit<
  ComponentProps<typeof SdkNavigationMenuContent>,
  "class"
> & {
  class?: string
}
const NavigationMenuContent = (props: NavigationMenuContentProps) => (
  <>
    <SdkNavigationMenuContent
      {...props}
      class={cn(
        "cn-navigation-menu-content top-0 left-0 w-full group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none md:absolute md:w-auto",
        props.class
      )}
    />
  </>
)
type NavigationMenuViewportProps = ComponentProps<
  typeof SdkNavigationMenuViewport
>
const NavigationMenuViewport = (props: NavigationMenuViewportProps) => (
  <SdkNavigationMenuViewport
    {...props}
    class={cn(
      "cn-navigation-menu-viewport h-(--viewport-height) w-(--viewport-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden",
      props.class
    )}
  />
)
type NavigationMenuLinkProps = Omit<
  ComponentProps<typeof SdkNavigationMenuLink>,
  "class"
> & {
  class?: string
}
const NavigationMenuLink = (props: NavigationMenuLinkProps) => (
  <SdkNavigationMenuLink
    {...props}
    class={cn("cn-navigation-menu-link", props.class)}
  />
)
type NavigationMenuIndicatorProps = Omit<
  ComponentProps<typeof SdkNavigationMenuIndicator>,
  "class"
> & {
  class?: string
}
const NavigationMenuIndicator = (props: NavigationMenuIndicatorProps) => (
  <SdkNavigationMenuIndicator
    {...props}
    class={cn(
      "cn-navigation-menu-indicator absolute top-full left-(--active-item-left) z-1 flex h-1.5 w-(--active-item-width) items-end justify-center overflow-hidden not-data-visible:hidden",
      props.class
    )}
  >
    <div class="cn-navigation-menu-indicator-arrow relative top-[60%] h-2 w-2 rotate-45" />
  </SdkNavigationMenuIndicator>
)
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport
}
