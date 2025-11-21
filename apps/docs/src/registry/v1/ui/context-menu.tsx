import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as ContextMenuPrimitive from "@kobalte/core/context-menu"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

const ContextMenu: Component<ContextMenuPrimitive.ContextMenuRootProps> = (props) => {
  return <ContextMenuPrimitive.Root data-slot="context-menu" gutter={4} {...props} />
}

const ContextMenuTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuPrimitive.ContextMenuTriggerProps<T>>
) => <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />

const ContextMenuGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuPrimitive.ContextMenuGroupProps<T>>
) => <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />

const ContextMenuPortal: Component<ContextMenuPrimitive.ContextMenuPortalProps> = (props) => (
  <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
)

const ContextMenuSub: Component<ContextMenuPrimitive.ContextMenuSubProps> = (props) => (
  <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
)

const ContextMenuRadioGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuPrimitive.ContextMenuRadioGroupProps<T>>
) => <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />

type ContextMenuSubTriggerProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuSubTriggerProps<T> & {
    class?: string | undefined
    inset?: boolean
    children?: JSX.Element
  }

const ContextMenuSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuSubTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as ContextMenuSubTriggerProps, [
    "class",
    "children",
    "inset"
  ])
  return (
    <ContextMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground has-data-[expanded]:bg-accent has-data-[expanded]:text-accent-foreground data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-inset={local.inset}
      data-slot="context-menu-sub-trigger"
      {...others}
    >
      {local.children}
      <svg
        class="ml-auto size-4"
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
    </ContextMenuPrimitive.SubTrigger>
  )
}

type ContextMenuSubContentProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuSubContentProps<T> & {
    class?: string | undefined
  }

const ContextMenuSubContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuSubContentProps<T>>
) => {
  const [local, others] = splitProps(props as ContextMenuSubContentProps, ["class"])
  return (
    <ContextMenuPrimitive.SubContent
      class={cn(
        "data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 z-50 max-h-(--kb-popper-content-available-height) min-w-[8rem] origin-(--kb-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in",
        local.class
      )}
      data-slot="context-menu-sub-content"
      {...others}
    />
  )
}

type ContextMenuContentProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuContentProps<T> & {
    class?: string | undefined
  }

const ContextMenuContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuContentProps<T>>
) => {
  const [local, others] = splitProps(props as ContextMenuContentProps, ["class"])
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        class={cn(
          "data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 z-50 max-h-(--kb-popper-content-available-height) min-w-[8rem] origin-(--kb-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in",
          local.class
        )}
        data-slot="context-menu-content"
        {...others}
      />
    </ContextMenuPrimitive.Portal>
  )
}

type ContextMenuItemProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuItemProps<T> & {
    class?: string | undefined
    inset?: boolean
    variant?: "default" | "destructive"
  }

const ContextMenuItem = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, ContextMenuItemProps<T>>
) => {
  const props = mergeProps({ variant: "default" }, rawProps)

  const [local, others] = splitProps(props as ContextMenuItemProps, ["class", "variant", "inset"])
  return (
    <ContextMenuPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      data-inset={local.inset}
      data-slot="context-menu-item"
      data-variant={local.variant}
      {...others}
    />
  )
}

type ContextMenuCheckboxItemProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuCheckboxItemProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const ContextMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuCheckboxItemProps<T>>
) => {
  const [local, others] = splitProps(props as ContextMenuCheckboxItemProps, ["class", "children"])
  return (
    <ContextMenuPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="context-menu-checkbox-item"
      {...others}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
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
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

type ContextMenuRadioItemProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuRadioItemProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const ContextMenuRadioItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuRadioItemProps<T>>
) => {
  const [local, others] = splitProps(props as ContextMenuRadioItemProps, ["class", "children"])
  return (
    <ContextMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="context-menu-radio-item"
      {...others}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
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
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.RadioItem>
  )
}

type ContextMenuItemLabelProps<T extends ValidComponent = "span"> =
  ContextMenuPrimitive.ContextMenuItemLabelProps<T> & {
    class?: string | undefined
  }

const ContextMenuItemLabel = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ContextMenuItemLabelProps<T>>
) => {
  const [local, others] = splitProps(props as ContextMenuItemLabelProps, ["class"])
  return (
    <ContextMenuPrimitive.ItemLabel
      class={cn("px-2 py-1.5 font-medium text-foreground text-sm data-[inset]:pl-8", local.class)}
      data-slot="context-menu-item-label"
      {...others}
    />
  )
}

type ContextMenuGroupLabelProps<T extends ValidComponent = "span"> =
  ContextMenuPrimitive.ContextMenuGroupLabelProps<T> & {
    class?: string | undefined
    inset?: boolean
  }

const ContextMenuGroupLabel = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ContextMenuGroupLabelProps<T>>
) => {
  const [local, others] = splitProps(props as ContextMenuGroupLabelProps, ["class", "inset"])
  return (
    <ContextMenuPrimitive.GroupLabel
      class={cn("px-2 py-1.5 font-medium text-foreground text-sm data-[inset]:pl-8", local.class)}
      data-inset={local.inset}
      data-slot="context-menu-group-label"
      {...others}
    />
  )
}

type ContextMenuSeparatorProps<T extends ValidComponent = "hr"> =
  ContextMenuPrimitive.ContextMenuSeparatorProps<T> & {
    class?: string | undefined
  }

const ContextMenuSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, ContextMenuSeparatorProps<T>>
) => {
  const [local, others] = splitProps(props as ContextMenuSeparatorProps, ["class"])
  return (
    <ContextMenuPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-border", local.class)}
      data-slot="context-menu-separator"
      {...others}
    />
  )
}

const ContextMenuShortcut: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn("ml-auto text-muted-foreground text-xs tracking-widest", local.class)}
      data-slot="context-menu-shortcut"
      {...others}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuItemLabel,
  ContextMenuGroupLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup
}
