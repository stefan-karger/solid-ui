/**
 * TODO: update cn-classes for different stylesheet options
 */
import type { ComponentProps, JSX, ValidComponent } from "solid-js"
import { For, mergeProps, Show, splitProps } from "solid-js"

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
> &
  Pick<ComponentProps<T>, "class" | "children">

const Combobox = <O, OptGroup = never, T extends ValidComponent = "div">(
  props: ComboboxProps<O, OptGroup, T>
) => {
  const mergedProps = mergeProps(
    {
      sameWidth: true,
      gutter: 8,
      placement: "bottom",
      defaultFilter: "contains",
      triggerMode: "input"
    } as ComboboxProps<O>,
    props
  )
  return <ComboboxPrimitive.Root {...mergedProps} />
}

type ComboboxControlProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxControlProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const ComboboxControl = <T extends ValidComponent = "div">(props: ComboboxControlProps<T>) => {
  const [local, others] = splitProps(props as ComboboxControlProps, ["class"])
  return (
    <ComboboxPrimitive.Control
      class={cn("cn-combobox-control", local.class)}
      data-slot="combobox-control"
      {...others}
    />
  )
}

type ComboboxInputProps<
  O extends string | {},
  T extends ValidComponent = "input"
> = PolymorphicProps<T, ComboboxPrimitive.ComboboxInputProps<T>> &
  Pick<ComponentProps<"input">, "class" | "placeholder" | "disabled" | "id" | "name"> & {
    showTrigger?: boolean
    showClear?: boolean
    children?: JSX.Element
    multiple?: boolean
    showRemove?: boolean
    getChipLabel?: (value: O) => string
  }

const ComboboxInput = <O, T extends ValidComponent = "input">(
  rawProps: ComboboxInputProps<O, T>
) => {
  const props = mergeProps(
    {
      showTrigger: true,
      showClear: true,
      multiple: false,
      showRemove: true
    } as const,
    rawProps
  )
  const [local, others] = splitProps(props as ComboboxInputProps<O, T>, [
    "class",
    "showTrigger",
    "showClear",
    "children",
    "disabled",
    "multiple",
    "showRemove",
    "getChipLabel"
  ])
  const getChipLabel = (v: O) => {
    if (rawProps.getChipLabel) return rawProps.getChipLabel(v)
    return String(v)
  }

  return (
    <ComboboxPrimitive.Control<O, typeof InputGroup>
      as={InputGroup}
      class={cn(
        "cn-combobox-input grid h-auto min-h-9 w-auto grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-0",
        local.class
      )}
      data-slot="combobox-control"
    >
      {(state) => (
        <>
          {local.children}
          <Show when={local.multiple && state.selectedOptions().length > 0}>
            <div
              class={cn(
                "col-span-2 flex flex-wrap gap-0.5 rounded-b-none border-b px-1 py-1",
                local.class
              )}
            >
              <For each={state.selectedOptions()}>
                {(option) => (
                  <Badge
                    class={cn("cn-combobox-chip cursor-pointer", local.showRemove && "pr-0")}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <span class="cn-combobox-chip-label">{getChipLabel(option)}</span>
                    <Show when={local.showRemove}>
                      <Button
                        class="cn-combobox-chip-remove"
                        onClick={() => state.remove(option)}
                        size="icon-xs"
                        variant="ghost"
                      >
                        <XIcon class="size-3" />
                      </Button>
                    </Show>
                  </Badge>
                )}
              </For>
            </div>
          </Show>
          <ComboboxPrimitive.Input<typeof InputGroupInput>
            as={InputGroupInput}
            class="min-w-0 data-[invalid=true]:text-destructive"
            data-slot="combobox-input"
            disabled={local.disabled}
            {...others}
          />
          <InputGroupAddon align="inline-end" class="whitespace-nowrap">
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
                disabled={local.disabled}
                onClick={() => state.clear()}
                size="icon-xs"
                variant="ghost"
              >
                <XIcon class="cn-combobox-clear-icon pointer-events-none" />
              </InputGroupButton>
            </Show>
          </InputGroupAddon>
        </>
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
<<<<<<< HEAD
  const props = mergeProps({ size: "default" }, rawProps)
=======
  const props = mergeProps({ size: "default" } as const, rawProps)
>>>>>>> feature/combobox
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
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxSection,
  ComboboxSectionLabel,
  ComboboxSeparator,
  ComboboxTrigger
}
