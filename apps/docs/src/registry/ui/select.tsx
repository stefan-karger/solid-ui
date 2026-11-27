import type { ComponentProps, JSX } from "@solidjs/web"
import {
  Select as SdkSelect,
  SelectTrigger as SdkSelectTrigger,
  SelectValue as SdkSelectValue,
  SelectContent as SdkSelectContent,
  SelectList as SdkSelectList,
  SelectGroup as SdkSelectGroup,
  SelectGroupLabel as SdkSelectGroupLabel,
  SelectItem as SdkSelectItem,
  SelectItemText as SdkSelectItemText,
  SelectItemIndicator as SdkSelectItemIndicator,
  SelectSeparator as SdkSelectSeparator
} from "@ui-sdk/solid/select"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
const Select = SdkSelect
const SelectGroup = (
  props: Omit<ComponentProps<typeof SdkSelectGroup>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => <SdkSelectGroup {...props} class={cn("cn-select-group", props.class)} />
const SelectLabel = (
  props: Omit<
    ComponentProps<typeof SdkSelectGroupLabel>,
    "class" | "children"
  > & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkSelectGroupLabel {...props} class={cn("cn-select-label", props.class)} />
)
const SelectValue = (
  props: Omit<ComponentProps<typeof SdkSelectValue>, "class"> & {
    class?: string
  }
) => <SdkSelectValue {...props} class={cn("cn-select-value", props.class)} />
type SelectTriggerProps = Omit<
  ComponentProps<typeof SdkSelectTrigger>,
  "class"
> & {
  class?: string
  size?: "sm" | "default"
}
const SelectTrigger = (props: SelectTriggerProps) => {
  const rest = omit(props, "class", "size", "children")
  return (
    <SdkSelectTrigger
      {...rest}
      data-size={props.size ?? "default"}
      class={cn(
        "cn-select-trigger flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
    >
      {props.children}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        class="cn-select-trigger-icon pointer-events-none"
      />
    </SdkSelectTrigger>
  )
}
const SelectContent = (
  props: Omit<ComponentProps<typeof SdkSelectContent>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => {
  const rest = omit(props, "class", "children")
  return (
    <SdkSelectContent
      sideOffset={4}
      align="center"
      {...rest}
      class={cn(
        "cn-select-content cn-menu-target cn-menu-translucent relative z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto",
        props.class
      )}
    >
      <SdkSelectList class="cn-select-list">{props.children}</SdkSelectList>
    </SdkSelectContent>
  )
}
const SelectItem = (
  props: Omit<ComponentProps<typeof SdkSelectItem>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => {
  const rest = omit(props, "class", "children")
  return (
    <SdkSelectItem
      {...rest}
      class={cn(
        "cn-select-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
    >
      <SdkSelectItemText class="cn-select-item-text shrink-0 whitespace-nowrap">
        {props.children}
      </SdkSelectItemText>
      <SdkSelectItemIndicator class="cn-select-item-indicator">
        <IconPlaceholder
          lucide="CheckIcon"
          class="cn-select-item-indicator-icon pointer-events-none"
        />
      </SdkSelectItemIndicator>
    </SdkSelectItem>
  )
}
const SelectSeparator = (
  props: Omit<
    ComponentProps<typeof SdkSelectSeparator>,
    "class" | "children"
  > & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkSelectSeparator
    {...props}
    class={cn("cn-select-separator pointer-events-none", props.class)}
  />
)
export {
  Select,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator
}
