import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { Check, ChevronRight } from "lucide-solid"

import { cn } from "~/lib/utils"

const Picker: Component<DropdownMenuPrimitive.DropdownMenuRootProps> = (props) => {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" gutter={4} {...props} />
}

const PickerPortal: Component<DropdownMenuPrimitive.DropdownMenuPortalProps> = (props) => {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

type PickerTriggerProps<T extends ValidComponent = "button"> =
  DropdownMenuPrimitive.DropdownMenuTriggerProps<T> & { class?: string }

const PickerTrigger = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, PickerTriggerProps>
) => {
  const [local, others] = splitProps(rawProps as PickerTriggerProps, ["class"])
  return (
    <DropdownMenuPrimitive.Trigger
      class={cn(
        "relative w-[160px] shrink-0 touch-manipulation select-none rounded-xl border border-foreground/10 bg-muted/50 p-2 text-left hover:bg-muted disabled:opacity-50 data-[expanded]:bg-muted md:w-full md:rounded-lg md:border-transparent md:bg-transparent",
        local.class
      )}
      data-slot="dropdown-menu-trigger"
      {...others}
    />
  )
}

type PickerContentProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuContentProps<T> & {
    class?: string | undefined
  }

const PickerContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PickerContentProps<T>>
) => {
  const [local, others] = splitProps(props as PickerContentProps, ["class"])
  return (
    <PickerPortal>
      <DropdownMenuPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 cn-menu-target no-scrollbar z-50 max-h-(--kb-popper-content-available-height) w-[calc(var(--kb-popper-content-available-width)-(--spacing(3.5)))] min-w-32 origin-(--kb-popper-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-xl border-0 bg-popover p-1 text-popover-foreground shadow-md outline-none ring-1 ring-foreground/10 duration-100 data-[closed]:animate-out data-[expanded]:animate-in data-[closed]:overflow-hidden md:w-52",
          local.class
        )}
        data-slot="dropdown-menu-content"
        {...others}
      />
    </PickerPortal>
  )
}

const PickerGroup: Component<DropdownMenuPrimitive.DropdownMenuGroupProps> = (props) => {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

type PickerLabelProps<T extends ValidComponent = "span"> =
  DropdownMenuPrimitive.DropdownMenuGroupLabelProps<T> & {
    class?: string | undefined
    inset?: boolean
  }

const PickerLabel = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, PickerLabelProps<T>>
) => {
  const [local, others] = splitProps(props as PickerLabelProps, ["class", "inset"])
  return (
    <DropdownMenuPrimitive.GroupLabel
      class={cn(
        "px-2 py-1.5 font-medium text-muted-foreground text-xs data-[inset]:pl-8",
        local.class
      )}
      data-inset={local.inset}
      data-slot="dropdown-menu-label"
      {...others}
    />
  )
}

type PickerItemProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuItemProps<T> & {
    class?: string | undefined
    inset?: boolean
    variant?: "default" | "destructive"
  }

const PickerItem = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, PickerItemProps<T>>
) => {
  const props = mergeProps({ variant: "default" }, rawProps)
  const [local, others] = splitProps(props as PickerItemProps, ["class", "inset", "variant"])
  return (
    <DropdownMenuPrimitive.Item
      class={cn(
        "group/dropdown-menu-item relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 pointer-coarse:py-2.5 py-1.5 pointer-coarse:pl-3 pointer-coarse:text-base text-sm outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive",
        local.class
      )}
      data-inset={local.inset}
      data-slot="dropdown-menu-item"
      data-variant={local.variant}
      {...others}
    />
  )
}

const PickerSub: Component<DropdownMenuPrimitive.DropdownMenuSubProps> = (props) => {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

type PickerSubTriggerProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps<T> & {
    class?: string | undefined
    inset?: boolean
    children?: JSX.Element
  }

const PickerSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PickerSubTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as PickerSubTriggerProps, ["class", "inset", "children"])
  return (
    <DropdownMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-[expanded]:bg-accent data-inset:pl-8 data-[expanded]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-inset={local.inset}
      data-slot="dropdown-menu-sub-trigger"
      {...others}
    >
      {local.children}
      <ChevronRight class="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

type PickerSubContentProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuSubContentProps<T> & {
    class?: string | undefined
  }

const PickerSubContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PickerSubContentProps<T>>
) => {
  const [local, others] = splitProps(props as PickerSubContentProps, ["class"])
  return (
    <DropdownMenuPrimitive.SubContent
      class={cn(
        "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-auto min-w-24 rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[closed]:animate-out data-[expanded]:animate-in",
        local.class
      )}
      data-slot="dropdown-menu-sub-content"
      {...others}
    />
  )
}

type PickerRadioGroupProps<
  T extends ValidComponent = "div",
  TValue = string
> = DropdownMenuPrimitive.DropdownMenuRadioGroupProps<T, TValue>

const PickerRadioGroup = <T extends ValidComponent = "div", TValue = string>(
  props: PolymorphicProps<T, PickerRadioGroupProps<T, TValue>>
) => {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

type PickerRadioItemProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuRadioItemProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const PickerRadioItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PickerRadioItemProps<T>>
) => {
  const [local, others] = splitProps(props as PickerRadioItemProps, ["class", "children"])
  return (
    <DropdownMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 pointer-coarse:gap-3 rounded-lg pointer-coarse:py-2.5 py-1.5 pr-8 pl-2 pointer-coarse:pl-3 pointer-coarse:text-base text-sm outline-hidden focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="dropdown-menu-radio-item"
      {...others}
    >
      <span
        class="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <Check class="pointer-coarse:size-5 size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

type PickerSeparatorProps<T extends ValidComponent = "hr"> =
  DropdownMenuPrimitive.DropdownMenuSeparatorProps<T> & {
    class?: string | undefined
  }

const PickerSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, PickerSeparatorProps<T>>
) => {
  const [local, others] = splitProps(props as PickerSeparatorProps, ["class"])
  return (
    <DropdownMenuPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-border", local.class)}
      data-slot="dropdown-menu-separator"
      {...others}
    />
  )
}

const PickerShortcut: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest group-focus/dropdown-menu-item:text-accent-foreground",
        local.class
      )}
      data-slot="dropdown-menu-shortcut"
      {...others}
    />
  )
}

export {
  Picker,
  PickerContent,
  PickerGroup,
  PickerItem,
  PickerLabel,
  PickerPortal,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerShortcut,
  PickerSub,
  PickerSubContent,
  PickerSubTrigger,
  PickerTrigger
}
