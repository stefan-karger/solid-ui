import type { Component, JSX, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import * as ComboboxPrimitive from "@kobalte/core/combobox"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { Check, ChevronDown } from "lucide-solid"

import { cn } from "~/lib/utils"

const Combobox = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ComboboxPrimitive.ComboboxRootProps<any, T>>
) => {
  // @ts-expect-error - Complex generic type compatibility issue with Kobalte primitives
  return <ComboboxPrimitive.Root data-slot="combobox" {...props} />
}

type ComboboxInputProps<T extends ValidComponent = "input"> =
  ComboboxPrimitive.ComboboxInputProps<T> & {
    class?: string | undefined
  }

const ComboboxInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, ComboboxInputProps<T>>
) => {
  const [local, others] = splitProps(props as ComboboxInputProps, ["class"])
  return (
    <ComboboxPrimitive.Input
      class={cn(
        "cn-combobox-input flex h-9 w-full rounded-md border border-input bg-transparent py-2 pr-8 pl-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        local.class
      )}
      data-slot="combobox-input"
      {...others}
    />
  )
}

type ComboboxTriggerProps<T extends ValidComponent = "button"> =
  ComboboxPrimitive.ComboboxTriggerProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const ComboboxTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ComboboxTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as ComboboxTriggerProps, ["class", "children"])
  return (
    <ComboboxPrimitive.Trigger
      class={cn(
        "cn-combobox-trigger absolute inset-y-0 right-0 flex items-center pr-2",
        local.class
      )}
      data-slot="combobox-trigger"
      {...others}
    >
      <ComboboxPrimitive.Icon class="size-4 opacity-50">
        <ChevronDown />
      </ComboboxPrimitive.Icon>
    </ComboboxPrimitive.Trigger>
  )
}

type ComboboxContentProps<T extends ValidComponent = "div"> =
  ComboboxPrimitive.ComboboxContentProps<T> & {
    class?: string | undefined
  }

const ComboboxContent = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, ComboboxContentProps<T>>
) => {
  const props = mergeProps({ gutter: 8, sameWidth: true }, rawProps)
  const [local, others] = splitProps(props as ComboboxContentProps, ["class"])

  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Content
        class={cn(
          "cn-combobox-content data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 relative z-50 min-w-[8rem] origin-(--kb-combobox-content-transform-origin) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[closed]:animate-out data-[expanded]:animate-in",
          local.class
        )}
        data-slot="combobox-content"
        {...others}
      >
        <ComboboxPrimitive.Listbox class="max-h-96 overflow-y-auto p-1" />
      </ComboboxPrimitive.Content>
    </ComboboxPrimitive.Portal>
  )
}

type ComboboxItemProps<T extends ValidComponent = "li"> = ComboboxPrimitive.ComboboxItemProps<T> & {
  class?: string | undefined
  children?: JSX.Element
}

const ComboboxItem = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, ComboboxItemProps<T>>
) => {
  const [local, others] = splitProps(props as ComboboxItemProps, ["class", "children"])
  return (
    <ComboboxPrimitive.Item
      class={cn(
        "cn-combobox-item relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="combobox-item"
      {...others}
    >
      <ComboboxPrimitive.ItemIndicator class="absolute right-2 flex size-4 items-center justify-center">
        <Check class="size-4" />
      </ComboboxPrimitive.ItemIndicator>
      <ComboboxPrimitive.ItemLabel>{local.children}</ComboboxPrimitive.ItemLabel>
    </ComboboxPrimitive.Item>
  )
}

type ComboboxControlProps<T extends ValidComponent = "div"> =
  ComboboxPrimitive.ComboboxControlProps<T> & {
    class?: string | undefined
  }

const ComboboxControl = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ComboboxControlProps<T>>
) => {
  const [local, others] = splitProps(props as ComboboxControlProps, ["class"])
  // @ts-expect-error - Complex generic type compatibility issue with Kobalte primitives
  return (
    <ComboboxPrimitive.Control
      class={cn("relative", local.class)}
      data-slot="combobox-control"
      {...others}
    />
  )
}

type ComboboxLabelProps<T extends ValidComponent = "label"> =
  ComboboxPrimitive.ComboboxLabelProps<T> & {
    class?: string | undefined
  }

const ComboboxLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, ComboboxLabelProps<T>>
) => {
  const [local, others] = splitProps(props as ComboboxLabelProps, ["class"])
  return (
    <ComboboxPrimitive.Label
      class={cn(
        "cn-combobox-label px-2 py-1.5 font-medium text-muted-foreground text-xs",
        local.class
      )}
      data-slot="combobox-label"
      {...others}
    />
  )
}

const ComboboxDescription: Component<ComboboxPrimitive.ComboboxDescriptionProps> = (props) => {
  return <ComboboxPrimitive.Description data-slot="combobox-description" {...props} />
}

const ComboboxErrorMessage: Component<ComboboxPrimitive.ComboboxErrorMessageProps> = (props) => {
  return <ComboboxPrimitive.ErrorMessage data-slot="combobox-error-message" {...props} />
}

const ComboboxItemDescription: Component<ComboboxPrimitive.ComboboxItemDescriptionProps> = (
  props
) => {
  return <ComboboxPrimitive.ItemDescription data-slot="combobox-item-description" {...props} />
}

export {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxControl,
  ComboboxLabel,
  ComboboxDescription,
  ComboboxErrorMessage,
  ComboboxItemDescription
}
