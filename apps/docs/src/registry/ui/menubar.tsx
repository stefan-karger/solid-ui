import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as MenubarPrimitive from "@kobalte/core/menubar"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "@/lib/utils"

const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

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
        "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
        local.class
      )}
      {...others}
    />
  )
}

const MenubarMenu: Component<MenubarPrimitive.MenubarMenuProps> = (props) => {
  return <MenubarPrimitive.Menu gutter={8} {...props} />
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
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        local.class
      )}
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
          "z-50 min-w-48 origin-[var(--kb-menu-content-transform-origin)] animate-content-hide overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-content-show",
          local.class
        )}
        {...others}
      />
    </MenubarPrimitive.Portal>
  )
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
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...others}
    >
      {local.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="ml-auto size-4"
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
          "z-50 min-w-32 origin-[var(--kb-menu-content-transform-origin)] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in",
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
}

const MenubarItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarItemProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarItemProps, ["class", "inset"])
  return (
    <MenubarPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.inset && "pl-8",
        local.class
      )}
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
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...others}
    >
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
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
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...others}
    >
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-2 fill-current"
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
      class={cn("px-2 py-1.5 text-sm font-semibold", local.inset && "pl-8", local.class)}
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
      class={cn("px-2 py-1.5 text-sm font-semibold", local.inset && "pl-8", local.class)}
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
    <MenubarPrimitive.Separator class={cn("-mx-1 my-1 h-px bg-muted", local.class)} {...others} />
  )
}

const MenubarShortcut: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn("ml-auto text-xs tracking-widest text-muted-foreground", local.class)}
      {...others}
    />
  )
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarItemLabel,
  MenubarGroupLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut
}
