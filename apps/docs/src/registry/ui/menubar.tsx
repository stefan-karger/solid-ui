import * as MenubarPrimitive from "@kobalte/core/menubar"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { CheckIcon, ChevronRightIcon } from "lucide-solid"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type MenubarProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const Menubar = <T extends ValidComponent = "div">(props: MenubarProps<T>) => {
  const others = omit(props as MenubarProps, "class")
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      class={cn("cn-menubar flex items-center", props.class)}
      {...others}
    />
  )
}

type MenubarMenuProps = MenubarPrimitive.MenubarMenuProps

const MenubarMenu = (props: MenubarMenuProps) => {
  const others = omit(props, "gutter")
  return <MenubarPrimitive.Menu data-slot="menubar-menu" gutter={props.gutter ?? 8} {...others} />
}

type MenubarPortalProps = MenubarPrimitive.MenubarPortalProps

const MenubarPortal = (props: MenubarPortalProps) => {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

type MenubarTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class">

const MenubarTrigger = <T extends ValidComponent = "button">(props: MenubarTriggerProps<T>) => {
  const others = omit(props as MenubarTriggerProps, "class")
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      class={cn("cn-menubar-trigger flex items-center outline-hidden select-none", props.class)}
      {...others}
    />
  )
}

type MenubarContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const MenubarContent = <T extends ValidComponent = "div">(props: MenubarContentProps<T>) => {
  const others = omit(props as MenubarContentProps, "class")
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        class={cn(
          "cn-menubar-content z-50 max-h-(--kb-popper-available-height) min-w-32 origin-(--kb-menu-content-transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
          props.class
        )}
        {...others}
      />
    </MenubarPortal>
  )
}

type MenubarGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">

const MenubarGroup = <T extends ValidComponent = "div">(props: MenubarGroupProps<T>) => {
  const others = omit(props as MenubarGroupProps, "class")
  return <MenubarPrimitive.Group data-slot="menubar-group" class={props.class} {...others} />
}

type MenubarItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarItemProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean
    variant?: "default" | "destructive"
  }

const MenubarItem = <T extends ValidComponent = "div">(rawProps: MenubarItemProps<T>) => {
  const local = merge({ variant: "default" } as MenubarItemProps<T>, rawProps) as MenubarItemProps
  const others = omit(rawProps as MenubarItemProps, "class", "inset", "variant")
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
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

type MenubarCheckboxItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarCheckboxItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const MenubarCheckboxItem = <T extends ValidComponent = "div">(
  props: MenubarCheckboxItemProps<T>
) => {
  const others = omit(props as MenubarCheckboxItemProps, "class", "children")
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
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
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {props.children}
    </MenubarPrimitive.CheckboxItem>
  )
}

type MenubarRadioGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRadioGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">

const MenubarRadioGroup = <T extends ValidComponent = "div">(props: MenubarRadioGroupProps<T>) => {
  const others = omit(props as MenubarRadioGroupProps, "class")
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" class={props.class} {...others} />
  )
}

type MenubarRadioItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRadioItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const MenubarRadioItem = <T extends ValidComponent = "div">(props: MenubarRadioItemProps<T>) => {
  const others = omit(props as MenubarRadioItemProps, "class", "children")
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
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
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {props.children}
    </MenubarPrimitive.RadioItem>
  )
}

type MenubarLabelProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarGroupLabelProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean
  }

const MenubarLabel = <T extends ValidComponent = "span">(props: MenubarLabelProps<T>) => {
  const others = omit(props as MenubarLabelProps, "class", "inset")
  return (
    <MenubarPrimitive.GroupLabel
      data-slot="menubar-label"
      data-inset={props.inset || undefined}
      class={cn("cn-menubar-label data-inset:pl-8", props.class)}
      {...others}
    />
  )
}

type MenubarSeparatorProps<T extends ValidComponent = "hr"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSeparatorProps<T>
> &
  Pick<ComponentProps<T>, "class">

const MenubarSeparator = <T extends ValidComponent = "hr">(props: MenubarSeparatorProps<T>) => {
  const others = omit(props as MenubarSeparatorProps, "class")
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      class={cn("cn-menubar-separator -mx-1 my-1 h-px", props.class)}
      {...others}
    />
  )
}

type MenubarShortcutProps = ComponentProps<"span">

const MenubarShortcut = (props: MenubarShortcutProps) => {
  const others = omit(props, "class")
  return (
    <span
      data-slot="menubar-shortcut"
      class={cn("cn-menubar-shortcut ml-auto", props.class)}
      {...others}
    />
  )
}

type MenubarSubProps = MenubarPrimitive.MenubarSubProps

const MenubarSub = (props: MenubarSubProps) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

type MenubarSubTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSubTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    inset?: boolean
  }

const MenubarSubTrigger = <T extends ValidComponent = "div">(props: MenubarSubTriggerProps<T>) => {
  const others = omit(props as MenubarSubTriggerProps, "class", "children", "inset")
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={props.inset || undefined}
      class={cn(
        "cn-menubar-sub-trigger flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      {props.children}
      <ChevronRightIcon class="ml-auto" />
    </MenubarPrimitive.SubTrigger>
  )
}

type MenubarSubContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSubContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const MenubarSubContent = <T extends ValidComponent = "div">(props: MenubarSubContentProps<T>) => {
  const others = omit(props as MenubarSubContentProps, "class")
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        data-slot="menubar-sub-content"
        class={cn(
          "cn-menubar-sub-content z-50 max-h-(--kb-popper-available-height) min-w-32 origin-(--kb-menu-content-transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
          props.class
        )}
        {...others}
      />
    </MenubarPrimitive.Portal>
  )
}

export {
  Menubar,
  MenubarMenu,
  MenubarPortal,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
}
