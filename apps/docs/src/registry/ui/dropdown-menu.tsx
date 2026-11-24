import { type ComponentProps } from "@solidjs/web"
import {
  Menu as SdkMenu,
  MenuTrigger as SdkMenuTrigger,
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
type DropdownMenuProps = ComponentProps<typeof SdkMenu>
const DropdownMenu = (props: DropdownMenuProps) => <SdkMenu {...props} />
type DropdownMenuTriggerProps = Omit<
  ComponentProps<typeof SdkMenuTrigger>,
  "class"
> & {
  class?: string
}
const DropdownMenuTrigger = (props: DropdownMenuTriggerProps) => (
  <SdkMenuTrigger {...props} class={props.class} />
)
type DropdownMenuContentProps = Omit<
  ComponentProps<typeof SdkMenuContent>,
  "class"
> & {
  class?: string
}
const DropdownMenuContent = (props: DropdownMenuContentProps) => (
  <>
    <SdkMenuContent
      {...props}
      class={cn(
        "cn-dropdown-menu-content cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
        props.class
      )}
    />
  </>
)
type DropdownMenuGroupProps = Omit<
  ComponentProps<typeof SdkMenuGroup>,
  "class"
> & {
  class?: string
}
const DropdownMenuGroup = (props: DropdownMenuGroupProps) => (
  <SdkMenuGroup {...props} class={props.class} />
)
type DropdownMenuLabelProps = (Omit<
  ComponentProps<typeof SdkMenuGroupLabel>,
  "class"
> & {
  class?: string
}) & {
  inset?: boolean
}
const DropdownMenuLabel = (props: DropdownMenuLabelProps) => {
  const others = omit(props, "class", "inset")
  return (
    <SdkMenuGroupLabel
      data-inset={props.inset}
      class={cn("cn-dropdown-menu-label data-inset:pl-8", props.class)}
      {...others}
    />
  )
}
type DropdownMenuItemProps = (Omit<
  ComponentProps<typeof SdkMenuItem>,
  "class"
> & {
  class?: string
}) & {
  inset?: boolean
  variant?: "default" | "destructive"
}
const DropdownMenuItem = (rawProps: DropdownMenuItemProps) => {
  const local = merge(
    { variant: "default" } as DropdownMenuItemProps,
    rawProps
  ) as DropdownMenuItemProps
  const others = omit(rawProps, "class", "inset", "variant")
  return (
    <SdkMenuItem
      data-inset={local.inset}
      data-variant={local.variant}
      class={cn(
        "cn-dropdown-menu-item group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      {...others}
    />
  )
}
type DropdownMenuSubProps = ComponentProps<typeof SdkMenuSub>
const DropdownMenuSub = (props: DropdownMenuSubProps) => (
  <SdkMenuSub {...props} />
)
type DropdownMenuSubTriggerProps = (Omit<
  ComponentProps<typeof SdkMenuSubTrigger>,
  "class"
> & {
  class?: string
}) & {
  inset?: boolean
}
const DropdownMenuSubTrigger = (props: DropdownMenuSubTriggerProps) => {
  const others = omit(props, "class", "inset", "children")
  return (
    <SdkMenuSubTrigger
      data-inset={props.inset}
      class={cn(
        "cn-dropdown-menu-sub-trigger flex cursor-default items-center outline-hidden select-none data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      {props.children}
      <ChevronRightIcon class="ml-auto" />
    </SdkMenuSubTrigger>
  )
}
type DropdownMenuSubContentProps = Omit<
  ComponentProps<typeof SdkMenuSubContent>,
  "class"
> & {
  class?: string
}
const DropdownMenuSubContent = (props: DropdownMenuSubContentProps) => (
  <>
    <SdkMenuSubContent
      {...props}
      class={cn(
        "cn-dropdown-menu-sub-content cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
        props.class
      )}
    />
  </>
)
type DropdownMenuCheckboxItemProps = Omit<
  Omit<ComponentProps<typeof SdkMenuCheckboxItem>, "value"> & {
    value?: string
  },
  "class"
> & {
  class?: string
}
const DropdownMenuCheckboxItem = (props: DropdownMenuCheckboxItemProps) => {
  const others = omit(props, "class", "children", "value")
  const value = createUniqueId()
  return (
    <SdkMenuCheckboxItem
      value={props.value ?? value}
      class={cn(
        "cn-dropdown-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      <span class="cn-dropdown-menu-item-indicator pointer-events-none">
        <SdkMenuItemIndicator>
          <CheckIcon />
        </SdkMenuItemIndicator>
      </span>
      {props.children}
    </SdkMenuCheckboxItem>
  )
}
type DropdownMenuRadioGroupProps = Omit<
  ComponentProps<typeof SdkMenuRadioGroup>,
  "class"
> & {
  class?: string
}
const DropdownMenuRadioGroup = (props: DropdownMenuRadioGroupProps) => (
  <SdkMenuRadioGroup {...props} class={props.class} />
)
type DropdownMenuRadioItemProps = Omit<
  ComponentProps<typeof SdkMenuRadioItem>,
  "class"
> & {
  class?: string
}
const DropdownMenuRadioItem = (props: DropdownMenuRadioItemProps) => {
  const others = omit(props, "class", "children")
  return (
    <SdkMenuRadioItem
      class={cn(
        "cn-dropdown-menu-radio-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
      {...others}
    >
      <span class="cn-dropdown-menu-item-indicator pointer-events-none">
        <SdkMenuItemIndicator>
          <CheckIcon />
        </SdkMenuItemIndicator>
      </span>
      {props.children}
    </SdkMenuRadioItem>
  )
}
type DropdownMenuSeparatorProps = Omit<
  ComponentProps<typeof SdkMenuSeparator>,
  "class"
> & {
  class?: string
}
const DropdownMenuSeparator = (props: DropdownMenuSeparatorProps) => (
  <SdkMenuSeparator
    {...props}
    class={cn("cn-dropdown-menu-separator", props.class)}
  />
)
type DropdownMenuShortcutProps = ComponentProps<"span">
const DropdownMenuShortcut = (props: DropdownMenuShortcutProps) => (
  <span {...props} class={cn("cn-dropdown-menu-shortcut", props.class)} />
)
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
}
