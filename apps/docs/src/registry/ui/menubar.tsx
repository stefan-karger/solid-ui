// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { type ComponentProps } from "@solidjs/web"
import {
  Menu as SdkMenu,
  MenuTrigger as SdkMenuTrigger,
  MenuContent as SdkMenuContent,
  MenuGroup as SdkMenuGroup,
  MenuItem as SdkMenuItem,
  MenuCheckboxItem as SdkMenuCheckboxItem,
  MenuItemIndicator as SdkMenuItemIndicator,
  MenuRadioGroup as SdkMenuRadioGroup,
  MenuRadioItem as SdkMenuRadioItem,
  MenuGroupLabel as SdkMenuGroupLabel,
  MenuSeparator as SdkMenuSeparator,
  MenuSub as SdkMenuSub,
  MenuSubTrigger as SdkMenuSubTrigger,
  MenuSubContent as SdkMenuSubContent
} from "@ui-sdk/solid/menu"
import { Menubar as SdkMenubar } from "@ui-sdk/solid/menubar"
import { createUniqueId, merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
type MenubarProps = Omit<ComponentProps<typeof SdkMenubar>, "class"> & {
  class?: string
}
const Menubar = (props: MenubarProps) => (
  <SdkMenubar
    {...props}
    class={cn("cn-menubar flex items-center", props.class)}
  />
)
type MenubarMenuProps = ComponentProps<typeof SdkMenu>
const MenubarMenu = (props: MenubarMenuProps) => <SdkMenu {...props} />
type MenubarTriggerProps = Omit<
  ComponentProps<typeof SdkMenuTrigger>,
  "class"
> & {
  class?: string
}
const MenubarTrigger = (props: MenubarTriggerProps) => (
  <SdkMenuTrigger
    {...props}
    class={cn(
      "cn-menubar-trigger flex items-center outline-hidden select-none",
      props.class
    )}
  />
)
type MenubarContentProps = Omit<
  ComponentProps<typeof SdkMenuContent>,
  "class"
> & {
  class?: string
}
const MenubarContent = (props: MenubarContentProps) => (
  <>
    <SdkMenuContent
      {...props}
      class={cn(
        "cn-menubar-content cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
        props.class
      )}
    />
  </>
)
type MenubarGroupProps = Omit<ComponentProps<typeof SdkMenuGroup>, "class"> & {
  class?: string
}
const MenubarGroup = (props: MenubarGroupProps) => (
  <SdkMenuGroup {...props} class={props.class} />
)
type MenubarItemProps = (Omit<ComponentProps<typeof SdkMenuItem>, "class"> & {
  class?: string
}) & {
  inset?: boolean
  variant?: "default" | "destructive"
}
const MenubarItem = (rawProps: MenubarItemProps) => {
  const local = merge(
    { variant: "default" } as MenubarItemProps,
    rawProps
  ) as MenubarItemProps
  const others = omit(rawProps, "class", "inset", "variant")
  return (
    <SdkMenuItem
      data-inset={local.inset || undefined}
      data-variant={local.variant}
      class={cn(
        "cn-menubar-item group/menubar-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      {...others}
    />
  )
}
type MenubarCheckboxItemProps = Omit<
  Omit<ComponentProps<typeof SdkMenuCheckboxItem>, "value"> & {
    value?: string
  },
  "class"
> & {
  class?: string
}
const MenubarCheckboxItem = (props: MenubarCheckboxItemProps) => {
  const others = omit(props, "class", "children", "value")
  const value = createUniqueId()
  return (
    <SdkMenuCheckboxItem
      value={props.value ?? value}

      class={cn(
        "cn-menubar-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      <span
        data-slot="menubar-checkbox-item-indicator"
        class="cn-menubar-checkbox-item-indicator pointer-events-none absolute flex items-center justify-center"
      >
        <SdkMenuItemIndicator>
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
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </SdkMenuItemIndicator>
      </span>
      {props.children}
    </SdkMenuCheckboxItem>
  )
}
type MenubarRadioGroupProps = Omit<
  ComponentProps<typeof SdkMenuRadioGroup>,
  "class"
> & {
  class?: string
}
const MenubarRadioGroup = (props: MenubarRadioGroupProps) => (
  <SdkMenuRadioGroup {...props} class={props.class} />
)
type MenubarRadioItemProps = Omit<
  ComponentProps<typeof SdkMenuRadioItem>,
  "class"
> & {
  class?: string
}
const MenubarRadioItem = (props: MenubarRadioItemProps) => {
  const others = omit(props, "class", "children")
  return (
    <SdkMenuRadioItem
      class={cn(
        "cn-menubar-radio-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      <span
        data-slot="menubar-radio-item-indicator"
        class="cn-menubar-radio-item-indicator pointer-events-none absolute flex items-center justify-center"
      >
        <SdkMenuItemIndicator>
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
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </SdkMenuItemIndicator>
      </span>
      {props.children}
    </SdkMenuRadioItem>
  )
}
type MenubarLabelProps = (Omit<
  ComponentProps<typeof SdkMenuGroupLabel>,
  "class"
> & {
  class?: string
}) & {
  inset?: boolean
}
const MenubarLabel = (props: MenubarLabelProps) => {
  const others = omit(props, "class", "inset")
  return (
    <SdkMenuGroupLabel
      data-inset={props.inset || undefined}
      class={cn("cn-menubar-label data-inset:pl-8", props.class)}
      {...others}
    />
  )
}
type MenubarSeparatorProps = Omit<
  ComponentProps<typeof SdkMenuSeparator>,
  "class"
> & {
  class?: string
}
const MenubarSeparator = (props: MenubarSeparatorProps) => (
  <SdkMenuSeparator
    {...props}
    class={cn("cn-menubar-separator -mx-1 my-1 h-px", props.class)}
  />
)
type MenubarShortcutProps = ComponentProps<"span">
const MenubarShortcut = (props: MenubarShortcutProps) => (
  <span
    data-slot="menubar-shortcut"
    {...props}
    class={cn("cn-menubar-shortcut ml-auto", props.class)}
  />
)
type MenubarSubProps = ComponentProps<typeof SdkMenuSub>
const MenubarSub = (props: MenubarSubProps) => <SdkMenuSub {...props} />
type MenubarSubTriggerProps = (Omit<
  ComponentProps<typeof SdkMenuSubTrigger>,
  "class"
> & {
  class?: string
}) & {
  inset?: boolean
}
const MenubarSubTrigger = (props: MenubarSubTriggerProps) => {
  const others = omit(props, "class", "children", "inset")
  return (
    <SdkMenuSubTrigger
      data-inset={props.inset || undefined}
      class={cn(
        "cn-menubar-sub-trigger flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      {props.children}
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
        class="ml-auto"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </SdkMenuSubTrigger>
  )
}
type MenubarSubContentProps = Omit<
  ComponentProps<typeof SdkMenuSubContent>,
  "class"
> & {
  class?: string
}
const MenubarSubContent = (props: MenubarSubContentProps) => (
  <>
    <SdkMenuSubContent
      {...props}
      class={cn(
        "cn-menubar-sub-content cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
        props.class
      )}
    />
  </>
)
export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
}
