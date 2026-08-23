/**
 * TODO: update cn-classes for different stylesheet options
 */
import type { Accessor, ComponentProps, JSX, ValidComponent } from "solid-js"
import { createContext, For, mergeProps, Show, splitProps, useContext } from "solid-js"

import * as ComboboxPrimitive from "@kobalte/core/combobox"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { Check, ChevronsUpDown, XIcon } from "lucide-solid"

import { cn } from "~/lib/utils"
import { Badge } from "~/registry/ui/badge"
import { Button } from "~/registry/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"

type ComboboxProps<O, OptGroup = never, T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxRootProps<O, OptGroup, T>
>

type ComboboxRootContextValue = {
  getOptionLabel: (option: unknown) => string
  isDisabled: Accessor<boolean>
  isMultiple: Accessor<boolean>
  isReadOnly: Accessor<boolean>
}

const ComboboxRootContext = createContext<ComboboxRootContextValue>()

const useComboboxRootContext = () => {
  const context = useContext(ComboboxRootContext)

  if (!context) {
    throw new Error("`Combobox` components must be used within `Combobox`")
  }

  return context
}

type ComboboxSelectionContextValue = {
  clear: () => void
  isDisabled: Accessor<boolean>
  remove: (option: unknown) => void
  selectedOptions: Accessor<unknown[]>
}

const ComboboxSelectionContext = createContext<ComboboxSelectionContextValue>()

const useComboboxSelectionContext = () => {
  const context = useContext(ComboboxSelectionContext)

  if (!context) {
    throw new Error("`ComboboxChips` must be used within `ComboboxInput`")
  }

  return context
}

const Combobox = <O, OptGroup = never, T extends ValidComponent = "div">(
  rawProps: ComboboxProps<O, OptGroup, T>
) => {
  const props = mergeProps(
    {
      sameWidth: true,
      gutter: 8,
      placement: "bottom",
      defaultFilter: "contains",
      triggerMode: "input"
    } as const,
    rawProps
  )

  const getOptionLabel = (option: unknown) => {
    const optionLabel = props.optionLabel

    if (optionLabel == null) {
      return String(option)
    }

    if (typeof optionLabel === "function") {
      return String(optionLabel(option as Exclude<O, null>))
    }

    return String((option as Record<PropertyKey, unknown>)[optionLabel])
  }

  const context: ComboboxRootContextValue = {
    getOptionLabel,
    isDisabled: () => props.disabled ?? false,
    isMultiple: () => props.multiple === true,
    isReadOnly: () => props.readOnly ?? false
  }

  return (
    <ComboboxRootContext.Provider value={context}>
      <ComboboxPrimitive.Root<O, OptGroup, T> {...props} />
    </ComboboxRootContext.Provider>
  )
}

type ComboboxControlProps<Option, T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxControlProps<Option, T> & {
    class?: string
  }
>

const ComboboxControl = <Option, T extends ValidComponent = "div">(
  props: ComboboxControlProps<Option, T>
) => {
  const [local, others] = splitProps(props as ComboboxControlProps<Option, T>, ["class"])
  const controlProps = others as PolymorphicProps<
    T,
    ComboboxPrimitive.ComboboxControlProps<Option, T>
  >

  return (
    <ComboboxPrimitive.Control<Option, T>
      {...controlProps}
      class={cn("cn-combobox-control", local.class)}
      data-slot="combobox-control"
    />
  )
}

type ComboboxInputProps<T extends ValidComponent = "input"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxInputProps<T> & {
    class?: string
    showTrigger?: boolean
    showClear?: boolean
    children?: JSX.Element
  }
>

type ComboboxChipProps = {
  class?: string
  option: unknown
}

const ComboboxChip = (props: ComboboxChipProps) => {
  const rootContext = useComboboxRootContext()
  const selectionContext = useComboboxSelectionContext()
  const label = () => rootContext.getOptionLabel(props.option)

  return (
    <Badge
      class={cn("cn-combobox-chip", props.class)}
      data-slot="combobox-chip"
      onPointerDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      <span class="cn-combobox-chip-label">{label()}</span>
      <Button
        aria-label={`Remove ${label()}`}
        class="cn-combobox-chip-remove"
        data-slot="combobox-chip-remove"
        disabled={selectionContext.isDisabled()}
        onClick={() => selectionContext.remove(props.option)}
        size="icon-xs"
        type="button"
        variant="ghost"
      >
        <XIcon class="pointer-events-none size-3" />
      </Button>
    </Badge>
  )
}

type ComboboxChipsProps = ComponentProps<"div">

const ComboboxChips = (props: ComboboxChipsProps) => {
  const rootContext = useComboboxRootContext()
  const selectionContext = useComboboxSelectionContext()
  const [local, others] = splitProps(props, ["class"])

  return (
    <Show when={rootContext.isMultiple() && selectionContext.selectedOptions().length > 0}>
      <div
        class={cn("flex min-w-0 max-w-full flex-wrap gap-1 p-1", local.class)}
        data-slot="combobox-chips"
        {...others}
      >
        <For each={selectionContext.selectedOptions()}>
          {(option) => <ComboboxChip option={option} />}
        </For>
      </div>
    </Show>
  )
}

const ComboboxInput = <T extends ValidComponent = "input">(rawProps: ComboboxInputProps<T>) => {
  const rootContext = useComboboxRootContext()
  const props = mergeProps({ showTrigger: true, showClear: false }, rawProps)
  const [local, others] = splitProps(props as ComboboxInputProps<T>, [
    "class",
    "showTrigger",
    "showClear",
    "children",
    "disabled"
  ])

  return (
    <ComboboxPrimitive.Control<unknown, typeof InputGroup>
      as={InputGroup}
      class={cn(
        "cn-combobox-input w-auto",
        rootContext.isMultiple() && "cn-combobox-chips h-auto flex-wrap items-stretch p-0",
        local.class
      )}
      data-slot="combobox-control"
    >
      {(state) => (
        <ComboboxSelectionContext.Provider
          value={{
            ...state,
            isDisabled: () =>
              local.disabled === true || rootContext.isDisabled() || rootContext.isReadOnly()
          }}
        >
          <Show when={state.selectedOptions().length}>
            <ComboboxChips />
          </Show>
          <div
            class="cn-combobox-input-row flex min-w-32 flex-1 items-center"
            data-slot="combobox-input-row"
          >
            {local.children}
            <ComboboxPrimitive.Input<typeof InputGroupInput>
              as={InputGroupInput}
              class="h-[calc((var(--spacing)*9)-2px)] w-auto min-w-0 flex-1 py-1.5 ring-inset"
              data-slot="combobox-input"
              disabled={local.disabled}
              {...others}
            />
            <InputGroupAddon align="inline-end" class="max-h-[34px] shrink-0">
              <Show when={local.showTrigger}>
                <ComboboxPrimitive.Trigger
                  as={InputGroupButton}
                  class="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
                  data-slot="combobox-trigger"
                  disabled={local.disabled}
                  size="icon-xs"
                  variant="ghost"
                >
                  <ComboboxPrimitive.Icon
                    as={ChevronsUpDown}
                    class="cn-combobox-trigger-icon pointer-events-none"
                  />
                </ComboboxPrimitive.Trigger>
              </Show>
              <Show when={local.showClear && state.selectedOptions().length > 0}>
                <InputGroupButton
                  class="cn-combobox-clear"
                  data-slot="combobox-clear"
                  disabled={
                    local.disabled === true || rootContext.isDisabled() || rootContext.isReadOnly()
                  }
                  onClick={() => state.clear()}
                  size="icon-xs"
                  variant="ghost"
                >
                  <XIcon class="cn-combobox-clear-icon pointer-events-none" />
                </InputGroupButton>
              </Show>
            </InputGroupAddon>
          </div>
        </ComboboxSelectionContext.Provider>
      )}
    </ComboboxPrimitive.Control>
  )
}

type ComboboxTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    size?: "sm" | "default"
  }

const ComboboxTrigger = <T extends ValidComponent = "button">(
  rawProps: ComboboxTriggerProps<T>
) => {
  const props = mergeProps({ size: "default" } as const, rawProps)
  const [local, others] = splitProps(props as ComboboxTriggerProps, ["class", "children", "size"])

  return (
    <ComboboxPrimitive.Control>
      <ComboboxPrimitive.Trigger
        class={cn(
          "cn-combobox-trigger cn-select-trigger flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=combobox-value]:line-clamp-1 *:data-[slot=combobox-value]:flex *:data-[slot=combobox-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
          local.class
        )}
        data-size={local.size}
        data-slot="combobox-trigger"
        {...others}
      >
        {local.children}
        <ComboboxPrimitive.Icon
          as={ChevronsUpDown}
          class="cn-combobox-trigger-icon pointer-events-none"
        />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.Control>
  )
}

type ComboboxContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ComboboxContent = <T extends ValidComponent = "div">(props: ComboboxContentProps<T>) => {
  const [local, others] = splitProps(props as ComboboxContentProps, ["class"])
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Content
        class={cn(
          "cn-combobox-content cn-menu-target relative isolate z-50 max-h-(--kb-popper-available-height) min-w-32 origin-(--kb-combobox-content-transform-origin) overflow-y-auto overflow-x-hidden",
          local.class
        )}
        data-slot="combobox-content"
        {...others}
      >
        <ComboboxPrimitive.Listbox class="cn-combobox-listbox m-0 max-h-60 p-1" />
      </ComboboxPrimitive.Content>
    </ComboboxPrimitive.Portal>
  )
}

type ComboboxSectionProps<T extends ValidComponent = "li"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxSectionProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ComboboxSection = <T extends ValidComponent = "li">(props: ComboboxSectionProps<T>) => {
  const [local, others] = splitProps(props as ComboboxSectionProps, ["class"])
  return (
    <ComboboxPrimitive.Section
      class={cn("cn-combobox-section", local.class)}
      data-slot="combobox-section"
      {...others}
    />
  )
}

type ComboboxSectionLabelProps = ComponentProps<"span"> & {
  class?: string
}

const ComboboxSectionLabel = (props: ComboboxSectionLabelProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn("cn-combobox-section-label cn-select-label", local.class)}
      data-slot="combobox-section-label"
      {...others}
    />
  )
}

type ComboboxItemProps<T extends ValidComponent = "li"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxItemProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    children?: JSX.Element
  }

const ComboboxItem = <T extends ValidComponent = "li">(props: ComboboxItemProps<T>) => {
  const [local, others] = splitProps(props as ComboboxItemProps, ["class", "children"])
  return (
    <ComboboxPrimitive.Item
      class={cn(
        "cn-combobox-item cn-select-item relative flex w-full cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="combobox-item"
      {...others}
    >
      <ComboboxPrimitive.ItemLabel class="cn-combobox-item-label cn-select-item-text shrink-0 whitespace-nowrap">
        {local.children}
      </ComboboxPrimitive.ItemLabel>
      <ComboboxPrimitive.ItemIndicator
        as="span"
        class="cn-combobox-item-indicator cn-select-item-indicator"
      >
        <Check class="cn-combobox-item-indicator-icon cn-select-item-indicator-icon pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

type ComboboxEmptyProps = ComponentProps<"div"> & {
  class?: string
}

const ComboboxEmpty = (props: ComboboxEmptyProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-combobox-empty py-6 text-center text-sm", local.class)}
      data-slot="combobox-empty"
      {...others}
    />
  )
}

type ComboboxSeparatorProps<T extends ValidComponent = "hr"> = ComponentProps<T> & {
  class?: string
}

const ComboboxSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, ComboboxSeparatorProps<T>>
) => {
  const [local, others] = splitProps(props as ComboboxSeparatorProps, ["class"])
  return (
    <hr
      class={cn("cn-combobox-separator cn-select-separator pointer-events-none", local.class)}
      data-slot="combobox-separator"
      {...others}
    />
  )
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxSection,
  ComboboxSectionLabel,
  ComboboxSeparator,
  ComboboxTrigger,
  useComboboxRootContext,
  useComboboxSelectionContext
}
