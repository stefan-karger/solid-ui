import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { CheckIcon, ChevronRightIcon } from "lucide-solid"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuRootProps

const DropdownMenu = (props: DropdownMenuProps) => {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" gutter={4} {...props} />
}

type DropdownMenuPortalProps = DropdownMenuPrimitive.DropdownMenuPortalProps

const DropdownMenuPortal = (props: DropdownMenuPortalProps) => {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

type DropdownMenuTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class">

const DropdownMenuTrigger = <T extends ValidComponent = "button">(
  props: DropdownMenuTriggerProps<T>
) => {
  const others = omit(props as DropdownMenuTriggerProps, "class")
  return (
    <DropdownMenuPrimitive.Trigger
      class={props.class}
      data-slot="dropdown-menu-trigger"
      {...others}
    />
  )
}

type DropdownMenuContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const DropdownMenuContent = <T extends ValidComponent = "div">(
  props: DropdownMenuContentProps<T>
) => {
  const others = omit(props as DropdownMenuContentProps, "class")
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        class={cn(
          "cn-dropdown-menu-content z-50 max-h-(--kb-popper-available-height) min-w-32 origin-(--kb-menu-content-transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
          props.class
        )}
        {...others}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

type DropdownMenuGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">

const DropdownMenuGroup = <T extends ValidComponent = "div">(props: DropdownMenuGroupProps<T>) => {
  const others = omit(props as DropdownMenuGroupProps, "class")
  return (
    <DropdownMenuPrimitive.Group class={props.class} data-slot="dropdown-menu-group" {...others} />
  )
}

type DropdownMenuLabelProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuGroupLabelProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean
  }

const DropdownMenuLabel = <T extends ValidComponent = "span">(props: DropdownMenuLabelProps<T>) => {
  const others = omit(props as DropdownMenuLabelProps, "class", "inset")
  return (
    <DropdownMenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={props.inset}
      class={cn("cn-dropdown-menu-label data-inset:pl-8", props.class)}
      {...others}
    />
  )
}

type DropdownMenuItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuItemProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean
    variant?: "default" | "destructive"
  }

const DropdownMenuItem = <T extends ValidComponent = "div">(rawProps: DropdownMenuItemProps<T>) => {
  const local = merge(
    { variant: "default" } as DropdownMenuItemProps<T>,
    rawProps
  ) as DropdownMenuItemProps
  const others = omit(rawProps as DropdownMenuItemProps, "class", "inset", "variant")
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={local.inset}
      data-variant={local.variant}
      class={cn(
        "cn-dropdown-menu-item group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      {...others}
    />
  )
}

type DropdownMenuSubProps = DropdownMenuPrimitive.DropdownMenuSubProps

const DropdownMenuSub = (props: DropdownMenuSubProps) => {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

type DropdownMenuSubTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    inset?: boolean
  }

const DropdownMenuSubTrigger = <T extends ValidComponent = "div">(
  props: DropdownMenuSubTriggerProps<T>
) => {
  const others = omit(props as DropdownMenuSubTriggerProps, "class", "inset", "children")
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={props.inset}
      class={cn(
        "cn-dropdown-menu-sub-trigger flex cursor-default items-center outline-hidden select-none data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      {props.children}
      <ChevronRightIcon class="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

type DropdownMenuSubContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuSubContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const DropdownMenuSubContent = <T extends ValidComponent = "div">(
  props: DropdownMenuSubContentProps<T>
) => {
  const others = omit(props as DropdownMenuSubContentProps, "class")
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        class={cn(
          "cn-dropdown-menu-sub-content z-50 max-h-(--kb-popper-available-height) min-w-32 origin-(--kb-menu-content-transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
          props.class
        )}
        {...others}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

type DropdownMenuCheckboxItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const DropdownMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: DropdownMenuCheckboxItemProps<T>
) => {
  const others = omit(props as DropdownMenuCheckboxItemProps, "class", "children")
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      class={cn(
        "cn-dropdown-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      <span
        class="cn-dropdown-menu-item-indicator pointer-events-none"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

type DropdownMenuRadioGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuRadioGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">

const DropdownMenuRadioGroup = <T extends ValidComponent = "div">(
  props: DropdownMenuRadioGroupProps<T>
) => {
  const others = omit(props as DropdownMenuRadioGroupProps, "class")
  return (
    <DropdownMenuPrimitive.RadioGroup
      class={props.class}
      data-slot="dropdown-menu-radio-group"
      {...others}
    />
  )
}

type DropdownMenuRadioItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuRadioItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const DropdownMenuRadioItem = <T extends ValidComponent = "div">(
  props: DropdownMenuRadioItemProps<T>
) => {
  const others = omit(props as DropdownMenuRadioItemProps, "class", "children")
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      class={cn(
        "cn-dropdown-menu-radio-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      <span
        class="cn-dropdown-menu-item-indicator pointer-events-none"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

type DropdownMenuSeparatorProps<T extends ValidComponent = "hr"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps<T>
> &
  Pick<ComponentProps<T>, "class">

const DropdownMenuSeparator = <T extends ValidComponent = "hr">(
  props: DropdownMenuSeparatorProps<T>
) => {
  const others = omit(props as DropdownMenuSeparatorProps, "class")
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      class={cn("cn-dropdown-menu-separator", props.class)}
      {...others}
    />
  )
}

type DropdownMenuShortcutProps = ComponentProps<"span">

const DropdownMenuShortcut = (props: DropdownMenuShortcutProps) => {
  const others = omit(props, "class")
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      class={cn("cn-dropdown-menu-shortcut", props.class)}
      {...others}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
}
