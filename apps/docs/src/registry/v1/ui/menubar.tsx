import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as MenubarPrimitive from "@kobalte/core/menubar"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

type MenubarRootProps<T extends ValidComponent = "div"> = MenubarPrimitive.MenubarRootProps<T> & {
  class?: string | undefined
}

const Menubar = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarRootProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarRootProps, ["class"])
  return (
    <MenubarPrimitive.Root
      class={cn(
        "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
        local.class
      )}
      data-slot="menubar"
      {...others}
    />
  )
}

const MenubarMenu: Component<MenubarPrimitive.MenubarMenuProps> = (props) => {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" gutter={8} {...props} />
}

const MenubarGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarPrimitive.MenubarGroupProps<T>>
) => {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

const MenubarPortal: Component<MenubarPrimitive.MenubarPortalProps> = (props) => {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

const MenubarRadioGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarPrimitive.MenubarRadioGroupProps<T>>
) => {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

type MenubarTriggerProps<T extends ValidComponent = "button"> =
  MenubarPrimitive.MenubarTriggerProps<T> & { class?: string | undefined }

const MenubarTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, MenubarTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarTriggerProps, ["class"])
  return (
    <MenubarPrimitive.Trigger
      class={cn(
        "flex select-none items-center rounded-sm px-2 py-1 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground",
        local.class
      )}
      data-slot="menubar-trigger"
      {...others}
    />
  )
}

type MenubarContentProps<T extends ValidComponent = "div"> =
  MenubarPrimitive.MenubarContentProps<T> & { class?: string | undefined }

const MenubarContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarContentProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarContentProps, ["class"])
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 min-w-[12rem] origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in",
          local.class
        )}
        {...others}
      />
    </MenubarPrimitive.Portal>
  )
}

type MenubarItemProps<T extends ValidComponent = "div"> = MenubarPrimitive.MenubarItemProps<T> & {
  class?: string | undefined
  inset?: boolean
  variant?: "default" | "destructive"
}

const MenubarItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarItemProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarItemProps, ["class", "inset", "variant"])
  return (
    <MenubarPrimitive.Item
      class={cn(
        "data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-inset={local.inset}
      data-slot="menubar-item"
      data-variant={local.variant}
      {...others}
    />
  )
}

type MenubarCheckboxItemProps<T extends ValidComponent = "div"> =
  MenubarPrimitive.MenubarCheckboxItemProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const MenubarCheckboxItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarCheckboxItemProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarCheckboxItemProps, ["class", "children"])
  return (
    <MenubarPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="menubar-checkbox-item"
      {...others}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <svg
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.CheckboxItem>
  )
}

type MenubarRadioItemProps<T extends ValidComponent = "div"> =
  MenubarPrimitive.MenubarRadioItemProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const MenubarRadioItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarRadioItemProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarRadioItemProps, ["class", "children"])
  return (
    <MenubarPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="menubar-radio-item"
      {...others}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <svg
            class="size-2 fill-current"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.RadioItem>
  )
}

type MenubarItemLabelProps<T extends ValidComponent = "div"> =
  MenubarPrimitive.MenubarItemLabelProps<T> & {
    class?: string | undefined
    inset?: boolean
  }

const MenubarItemLabel = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarItemLabelProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarItemLabelProps, ["class", "inset"])
  return (
    <MenubarPrimitive.ItemLabel
      class={cn("px-2 py-1.5 font-medium text-sm data-[inset]:pl-8", local.class)}
      data-inset={local.inset}
      data-slot="menubar-item-label"
      {...others}
    />
  )
}

type MenubarGroupLabelProps<T extends ValidComponent = "span"> =
  MenubarPrimitive.MenubarGroupLabelProps<T> & {
    class?: string | undefined
    inset?: boolean
  }

const MenubarGroupLabel = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, MenubarGroupLabelProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarGroupLabelProps, ["class", "inset"])
  return (
    <MenubarPrimitive.GroupLabel
      class={cn("px-2 py-1.5 font-medium text-sm data-[inset]:pl-8", local.class)}
      data-inset={local.inset}
      data-slot="menubar-group-label"
      {...others}
    />
  )
}

type MenubarSeparatorProps<T extends ValidComponent = "hr"> =
  MenubarPrimitive.MenubarSeparatorProps<T> & { class?: string | undefined }

const MenubarSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, MenubarSeparatorProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarSeparatorProps, ["class"])
  return (
    <MenubarPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-border", local.class)}
      data-slot="menubar-separator"
      {...others}
    />
  )
}

const MenubarShortcut: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn("ml-auto text-muted-foreground text-xs tracking-widest", local.class)}
      data-slot="menubar-shortcut"
      {...others}
    />
  )
}

const MenubarSub: Component<MenubarPrimitive.MenubarSubProps> = (props) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

type MenubarSubTriggerProps<T extends ValidComponent = "div"> =
  MenubarPrimitive.MenubarSubTriggerProps<T> & {
    class?: string | undefined
    children?: JSX.Element
    inset?: boolean
  }

const MenubarSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarSubTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarSubTriggerProps, [
    "class",
    "children",
    "inset"
  ])
  return (
    <MenubarPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[expanded]:bg-accent data-[inset]:pl-8 data-[expanded]:text-accent-foreground",
        local.class
      )}
      data-inset={local.inset}
      data-slot="menubar-sub-trigger"
      {...others}
    >
      {local.children}
      <svg
        class="ml-auto h-4 w-4"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 6l6 6l-6 6" />
      </svg>
    </MenubarPrimitive.SubTrigger>
  )
}

type MenubarSubContentProps<T extends ValidComponent = "div"> =
  MenubarPrimitive.MenubarSubContentProps<T> & {
    class?: string | undefined
  }

const MenubarSubContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarSubContentProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarSubContentProps, ["class"])
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 min-w-[8rem] origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[closed]:animate-out data-[expanded]:animate-in",
          local.class
        )}
        data-slot="menubar-sub-content"
        {...others}
      />
    </MenubarPrimitive.Portal>
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarItemLabel,
  MenubarGroupLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
}
