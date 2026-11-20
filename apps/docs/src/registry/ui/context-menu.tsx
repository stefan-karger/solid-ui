import { type ComponentProps } from "@solidjs/web"
import {
  Menu as SdkMenu,
  MenuContextTrigger as SdkMenuContextTrigger,
  MenuContent as SdkMenuContent,
  MenuGroup as SdkMenuGroup,
  MenuGroupLabel as SdkMenuGroupLabel,
  MenuItem as SdkMenuItem,
  MenuSub as SdkMenuSub,
  MenuSubTrigger as SdkMenuSubTrigger,
  MenuSubContent as SdkMenuSubContent,
  MenuCheckboxItem as SdkMenuCheckboxItem,
  MenuItemIndicator as SdkMenuItemIndicator,
  MenuRadioGroup as SdkMenuRadioGroup,
  MenuRadioItem as SdkMenuRadioItem,
  MenuSeparator as SdkMenuSeparator
} from "@ui-sdk/solid/menu"
import { CheckIcon, ChevronRightIcon } from "lucide-solid"
import { createUniqueId, merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
type ContextMenuProps = ComponentProps<typeof SdkMenu>
const ContextMenu = (props: ContextMenuProps) => <SdkMenu {...props} />
type ContextMenuTriggerProps = Omit<
  ComponentProps<typeof SdkMenuContextTrigger>,
  "class"
> & {
  class?: string
}
const ContextMenuTrigger = (props: ContextMenuTriggerProps) => (
  <SdkMenuContextTrigger
    {...props}
    class={cn("cn-context-menu-trigger select-none", props.class)}
  />
)
type ContextMenuContentProps = Omit<
  ComponentProps<typeof SdkMenuContent>,
  "class"
> & {
  class?: string
}
const ContextMenuContent = (props: ContextMenuContentProps) => (
  <>
    <SdkMenuContent
      {...props}
      class={cn(
        "cn-context-menu-content z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none",
        props.class
      )}
    />
  </>
)
type ContextMenuGroupProps = Omit<
  ComponentProps<typeof SdkMenuGroup>,
  "class"
> & {
  class?: string
}
const ContextMenuGroup = (props: ContextMenuGroupProps) => (
  <SdkMenuGroup {...props} class={props.class} />
)
type ContextMenuLabelProps = (Omit<
  ComponentProps<typeof SdkMenuGroupLabel>,
  "class"
> & {
  class?: string
}) & {
  inset?: boolean
}
const ContextMenuLabel = (props: ContextMenuLabelProps) => {
  const others = omit(props, "class", "inset")
  return (
    <SdkMenuGroupLabel
      class={cn("cn-context-menu-label data-inset:pl-8", props.class)}
      data-inset={props.inset}
      {...others}
    />
  )
}
type ContextMenuItemProps = (Omit<
  ComponentProps<typeof SdkMenuItem>,
  "class"
> & {
  class?: string
}) & {
  inset?: boolean
  variant?: "default" | "destructive"
}
const ContextMenuItem = (rawProps: ContextMenuItemProps) => {
  const local = merge(
    { variant: "default" } as ContextMenuItemProps,
    rawProps
  ) as ContextMenuItemProps
  const others = omit(rawProps, "class", "inset", "variant")
  return (
    <SdkMenuItem
      class={cn(
        "group/context-menu-item cn-context-menu-item relative flex cursor-default items-center outline-hidden select-none data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-inset={local.inset}
      data-variant={local.variant}
      {...others}
    />
  )
}
type ContextMenuSubProps = ComponentProps<typeof SdkMenuSub>
const ContextMenuSub = (props: ContextMenuSubProps) => <SdkMenuSub {...props} />
type ContextMenuSubTriggerProps = (Omit<
  ComponentProps<typeof SdkMenuSubTrigger>,
  "class"
> & {
  class?: string
}) & {
  inset?: boolean
}
const ContextMenuSubTrigger = (props: ContextMenuSubTriggerProps) => {
  const others = omit(props, "class", "children", "inset")
  return (
    <SdkMenuSubTrigger
      class={cn(
        "cn-context-menu-sub-trigger flex cursor-default items-center outline-hidden select-none data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      data-inset={props.inset}
      {...others}
    >
      {props.children}
      <ChevronRightIcon class="ml-auto" />
    </SdkMenuSubTrigger>
  )
}
type ContextMenuSubContentProps = Omit<
  ComponentProps<typeof SdkMenuSubContent>,
  "class"
> & {
  class?: string
}
const ContextMenuSubContent = (props: ContextMenuSubContentProps) => (
  <>
    <SdkMenuSubContent
      {...props}
      class={cn(
        "cn-context-menu-content cn-context-menu-sub-content cn-context-menu-subcontent z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none",
        props.class
      )}
    />
  </>
)
type ContextMenuCheckboxItemProps = Omit<
  Omit<ComponentProps<typeof SdkMenuCheckboxItem>, "value"> & {
    value?: string
  },
  "class"
> & {
  class?: string
}
const ContextMenuCheckboxItem = (props: ContextMenuCheckboxItemProps) => {
  const others = omit(props, "class", "children", "value")
  const value = createUniqueId()
  return (
    <SdkMenuCheckboxItem
      value={props.value ?? value}
      class={cn(
        "cn-context-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      <span class="cn-context-menu-item-indicator pointer-events-none">
        <SdkMenuItemIndicator>
          <CheckIcon />
        </SdkMenuItemIndicator>
      </span>
      {props.children}
    </SdkMenuCheckboxItem>
  )
}
type ContextMenuRadioGroupProps = Omit<
  ComponentProps<typeof SdkMenuRadioGroup>,
  "class"
> & {
  class?: string
}
const ContextMenuRadioGroup = (props: ContextMenuRadioGroupProps) => (
  <SdkMenuRadioGroup {...props} class={props.class} />
)
type ContextMenuRadioItemProps = Omit<
  ComponentProps<typeof SdkMenuRadioItem>,
  "class"
> & {
  class?: string
}
const ContextMenuRadioItem = (props: ContextMenuRadioItemProps) => {
  const others = omit(props, "class", "children")
  return (
    <SdkMenuRadioItem
      class={cn(
        "cn-context-menu-radio-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      <span class="cn-context-menu-item-indicator pointer-events-none">
        <SdkMenuItemIndicator>
          <CheckIcon />
        </SdkMenuItemIndicator>
      </span>
      {props.children}
    </SdkMenuRadioItem>
  )
}
type ContextMenuSeparatorProps = Omit<
  ComponentProps<typeof SdkMenuSeparator>,
  "class"
> & {
  class?: string
}
const ContextMenuSeparator = (props: ContextMenuSeparatorProps) => (
  <SdkMenuSeparator
    {...props}
    class={cn("cn-context-menu-separator", props.class)}
  />
)
type ContextMenuShortcutProps = ComponentProps<"span">
const ContextMenuShortcut = (props: ContextMenuShortcutProps) => (
  <span {...props} class={cn("cn-context-menu-shortcut", props.class)} />
)
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
}
