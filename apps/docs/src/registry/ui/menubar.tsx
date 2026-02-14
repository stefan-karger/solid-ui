import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as MenubarPrimitive from "@kobalte/core/menubar"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { Check, ChevronRight, Dot } from "lucide-solid"

import { cn } from "~/lib/utils"

type MenubarRootProps<T extends ValidComponent = "div"> = MenubarPrimitive.MenubarRootProps<T> & {
  class?: string | undefined
}

const Menubar = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarRootProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarRootProps, ["class"])
  return (
    <MenubarPrimitive.Root class={cn("cn-menubar", local.class)} data-slot="menubar" {...others} />
  )
}

const MenubarMenu: Component<MenubarPrimitive.MenubarMenuProps> = (props) => {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

const MenubarGroup: Component<MenubarPrimitive.MenubarGroupProps> = (props) => {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

const MenubarPortal: Component<MenubarPrimitive.MenubarPortalProps> = (props) => {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

type MenubarRadioGroupProps<
  T extends ValidComponent = "div",
  TValue = string
> = MenubarPrimitive.MenubarRadioGroupProps<T, TValue>

const MenubarRadioGroup = <T extends ValidComponent = "div", TValue = string>(
  props: PolymorphicProps<T, MenubarRadioGroupProps<T, TValue>>
) => <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />

type MenubarTriggerProps<T extends ValidComponent = "button"> =
  MenubarPrimitive.MenubarTriggerProps<T> & {
    class?: string | undefined
  }

const MenubarTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, MenubarTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarTriggerProps, ["class"])
  return (
    <MenubarPrimitive.Trigger
      class={cn("cn-menubar-trigger", local.class)}
      data-slot="menubar-trigger"
      {...others}
    />
  )
}

type MenubarContentProps<T extends ValidComponent = "div"> =
  MenubarPrimitive.MenubarContentProps<T> & {
    class?: string | undefined
  }

const MenubarContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarContentProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarContentProps, ["class"])
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        class={cn("cn-menubar-content", local.class)}
        data-slot="menubar-content"
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
  rawProps: PolymorphicProps<T, MenubarItemProps<T>>
) => {
  const props = mergeProps({ variant: "default" }, rawProps)
  const [local, others] = splitProps(props as MenubarItemProps, ["class", "inset", "variant"])
  return (
    <MenubarPrimitive.Item
      class={cn(
        "cn-menubar-item group/menubar-item relative flex cursor-default select-none items-center outline-hidden data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        "cn-menubar-checkbox-item relative flex cursor-default select-none items-center outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="menubar-checkbox-item"
      {...others}
    >
      <span
        class="cn-menubar-item-indicator pointer-events-none"
        data-slot="menubar-checkbox-item-indicator"
      >
        <MenubarPrimitive.ItemIndicator>
          <Check />
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
        "cn-menubar-radio-item relative flex cursor-default select-none items-center outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="menubar-radio-item"
      {...others}
    >
      <MenubarPrimitive.ItemIndicator
        class="cn-menubar-item-indicator pointer-events-none"
        data-slot="menubar-radio-item-indicator"
      >
        <Dot />
      </MenubarPrimitive.ItemIndicator>
      {local.children}
    </MenubarPrimitive.RadioItem>
  )
}

type MenubarLabelProps<T extends ValidComponent = "span"> =
  MenubarPrimitive.MenubarGroupLabelProps<T> & {
    class?: string | undefined
    inset?: boolean
  }

const MenubarLabel = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, MenubarLabelProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarLabelProps, ["class", "inset"])
  return (
    <MenubarPrimitive.GroupLabel
      class={cn("cn-menubar-label data-[inset]:pl-8", local.class)}
      data-inset={local.inset}
      data-slot="menubar-label"
      {...others}
    />
  )
}

type MenubarSeparatorProps<T extends ValidComponent = "hr"> =
  MenubarPrimitive.MenubarSeparatorProps<T> & {
    class?: string | undefined
  }

const MenubarSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, MenubarSeparatorProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarSeparatorProps, ["class"])
  return (
    <MenubarPrimitive.Separator
      class={cn("cn-menubar-separator", local.class)}
      data-slot="menubar-separator"
      {...others}
    />
  )
}

const MenubarShortcut: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span class={cn("cn-menubar-shortcut", local.class)} data-slot="menubar-shortcut" {...others} />
  )
}

const MenubarSub: Component<MenubarPrimitive.MenubarSubProps> = (props) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

type MenubarSubTriggerProps<T extends ValidComponent = "div"> =
  MenubarPrimitive.MenubarSubTriggerProps<T> & {
    class?: string | undefined
    inset?: boolean
    children?: JSX.Element
  }

const MenubarSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenubarSubTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as MenubarSubTriggerProps, [
    "class",
    "inset",
    "children"
  ])
  return (
    <MenubarPrimitive.SubTrigger
      class={cn(
        "cn-menubar-sub-trigger flex cursor-default select-none items-center outline-hidden data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-inset={local.inset}
      data-slot="menubar-sub-trigger"
      {...others}
    >
      {local.children}
      <ChevronRight />
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
    <MenubarPrimitive.SubContent
      class={cn("cn-menubar-sub-content", local.class)}
      data-slot="menubar-sub-content"
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
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarGroup,
  MenubarPortal
}
