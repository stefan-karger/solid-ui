import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as SelectPrimitive from "@kobalte/core/select"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { CheckIcon, ChevronDownIcon } from "lucide-solid"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type SelectProps<O, OptGroup = never, T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectRootProps<O, OptGroup, T>
> &
  Pick<ComponentProps<T>, "class">

const Select = <O, OptGroup = never, T extends ValidComponent = "div">(
  props: SelectProps<O, OptGroup, T>
) => {
  const local = merge(
    {
      sameWidth: true,
      gutter: 4,
      placement: "bottom"
    } as const,
    props
  ) as SelectProps<O, OptGroup, T>
  const others = omit(
    props as SelectProps<O, OptGroup, T>,
    "class",
    "gutter",
    "placement",
    "sameWidth"
  )
  return (
    <SelectPrimitive.Root
      data-slot="select"
      class={local.class}
      gutter={local.gutter ?? 4}
      placement={local.placement ?? "bottom"}
      sameWidth={local.sameWidth ?? true}
      {...others}
    />
  )
}

type SelectGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectSectionProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SelectGroup = <T extends ValidComponent = "div">(props: SelectGroupProps<T>) => {
  const others = omit(props as SelectGroupProps, "class")
  return (
    <SelectPrimitive.Section
      data-slot="select-group"
      class={cn("cn-select-group", props.class)}
      {...others}
    />
  )
}

type SelectValueProps<Option, T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectValueProps<Option, T>
> &
  Pick<ComponentProps<T>, "class">

const SelectValue = <Option, T extends ValidComponent = "span">(
  props: SelectValueProps<Option, T>
) => {
  const others = omit(props as SelectValueProps<Option>, "class")
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      class={cn("cn-select-value", props.class)}
      {...others}
    />
  )
}

type SelectTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    size?: "sm" | "default"
  }

const SelectTrigger = <T extends ValidComponent = "button">(rawProps: SelectTriggerProps<T>) => {
  const local = merge({ size: "default" as const }, rawProps) as SelectTriggerProps
  const others = omit(rawProps as SelectTriggerProps, "class", "children", "size")
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={local.size}
      class={cn(
        "cn-select-trigger flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      {...others}
    >
      {local.children}
      <SelectPrimitive.Icon data-slot="select-trigger-icon">
        <ChevronDownIcon class="cn-select-trigger-icon" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

type SelectContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SelectContent = <T extends ValidComponent = "div">(props: SelectContentProps<T>) => {
  let contentRef: HTMLDivElement | undefined
  const others = omit(props as SelectContentProps, "class", "ref")
  const setContentRef = (element: HTMLDivElement) => {
    contentRef = element
    const forwardedRef = props.ref as ((element: HTMLDivElement) => void) | undefined
    if (typeof forwardedRef === "function") {
      forwardedRef(element)
    }
  }
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        ref={setContentRef}
        class={cn(
          "cn-select-content relative z-50 max-h-(--kb-popper-available-height) min-w-32 origin-(--kb-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          props.class
        )}
        {...others}
      >
        <SelectPrimitive.Listbox class="m-0 p-1 outline-none" scrollRef={() => contentRef} />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

type SelectLabelProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectLabelProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SelectLabel = <T extends ValidComponent = "span">(props: SelectLabelProps<T>) => {
  const others = omit(props as SelectLabelProps, "class")
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      class={cn("cn-select-label", props.class)}
      {...others}
    />
  )
}

type SelectItemProps<T extends ValidComponent = "li"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    variant?: "default" | "destructive"
  }

const SelectItem = <T extends ValidComponent = "li">(rawProps: SelectItemProps<T>) => {
  const local = merge({ variant: "default" as const }, rawProps) as SelectItemProps
  const others = omit(rawProps as SelectItemProps, "class", "children", "variant")
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-variant={local.variant}
      class={cn(
        "cn-select-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        local.class
      )}
      {...others}
    >
      <SelectPrimitive.ItemIndicator
        as="span"
        data-slot="select-item-indicator"
        class="cn-select-item-indicator"
      >
        <CheckIcon class="cn-select-item-indicator-icon pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemLabel as="span" data-slot="select-item-text" class="cn-select-item-text">
        {local.children}
      </SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  )
}

type SelectSeparatorProps = ComponentProps<"hr">

const SelectSeparator = (props: SelectSeparatorProps) => {
  const others = omit(props, "class")
  return (
    <hr
      data-slot="select-separator"
      class={cn("cn-select-separator pointer-events-none", props.class)}
      {...others}
    />
  )
}

const SelectHiddenSelect = SelectPrimitive.HiddenSelect

const SelectDescription = SelectPrimitive.Description

const SelectErrorMessage = SelectPrimitive.ErrorMessage

export {
  Select,
  SelectContent,
  SelectDescription,
  SelectErrorMessage,
  SelectGroup,
  SelectHiddenSelect,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
