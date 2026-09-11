import * as ComboboxPrimitive from "@kobalte/core/combobox"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-solid"
import {
  createContext,
  createEffect,
  merge,
  Show,
  omit,
  useContext,
  type ParentProps
} from "solid-js"

import { cn } from "~/lib/utils"
import { InputGroup, InputGroupButton, InputGroupInput } from "~/registry/ui/input-group"

type ComboboxProps<
  Option,
  OptGroup = never,
  T extends ValidComponent = "div"
> = ComboboxPrimitive.ComboboxRootProps<Option, OptGroup, T> & {
  autoHighlight?: boolean | undefined
} & Pick<ComponentProps<T>, "class" | "children">

type ComboboxRootContextValue = {
  autoHighlight: () => boolean
}

const ComboboxRootContext = createContext<ComboboxRootContextValue>()

const Combobox = <Option, OptGroup = never, T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ComboboxProps<Option, OptGroup, T>>
) => {
  const local = merge({ autoHighlight: false }, props) as ComboboxProps<Option, OptGroup, T>
  const others = omit(
    props as ComboboxProps<Option, OptGroup, T>,
    "autoHighlight",
    "class",
    "children"
  )
  return (
    <ComboboxRootContext value={{ autoHighlight: () => local.autoHighlight ?? false }}>
      <ComboboxPrimitive.Root data-slot="combobox" class={local.class} gutter={6} {...others}>
        {local.children}
      </ComboboxPrimitive.Root>
    </ComboboxRootContext>
  )
}

type ComboboxPortalProps = ComboboxPrimitive.ComboboxPortalProps

const ComboboxPortal = (props: ComboboxPortalProps) => {
  return <ComboboxPrimitive.Portal data-slot="combobox-portal" {...props} />
}

const comboboxControlVariants = cva("w-full", {
  variants: {
    variant: {
      default: null,
      chips: "cn-combobox-chips"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

type ComboboxControlProps<Option, T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxControlProps<Option, T>
> &
  VariantProps<typeof comboboxControlVariants> &
  Pick<ComponentProps<T>, "class">

const ComboboxControl = <Option, T extends ValidComponent = "div">(
  props: ComboboxControlProps<Option, T>
) => {
  const others = omit(props as ComboboxControlProps<Option>, "class", "variant")
  return (
    <ComboboxPrimitive.Control
      {...(props.variant === "chips" ? {} : { as: InputGroup })}
      data-slot={props.variant === "chips" ? "combobox-control" : undefined}
      data-variant={props.variant}
      class={cn(
        props.variant === "chips" ? comboboxControlVariants({ variant: "chips" }) : undefined,
        props.class
      )}
      {...others}
    />
  )
}

type ComboboxInputProps<T extends ValidComponent = "input"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxInputProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ComboboxInput = <T extends ValidComponent = "input">(props: ComboboxInputProps<T>) => {
  const others = omit(props as ComboboxInputProps, "class")
  return <ComboboxPrimitive.Input as={InputGroupInput} class={props.class} {...others} />
}

type ComboboxChipInputProps<T extends ValidComponent = "input"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxInputProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ComboboxChipInput = <T extends ValidComponent = "input">(
  props: ComboboxChipInputProps<T>
) => {
  const others = omit(props as ComboboxChipInputProps, "class")
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      class={cn(
        "cn-combobox-chip-input min-w-16 flex-1 border-0 bg-transparent p-0 shadow-none ring-0 outline-none focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        props.class
      )}
      {...others}
    />
  )
}

type ComboboxTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const ComboboxTrigger = <T extends ValidComponent = "button">(props: ComboboxTriggerProps<T>) => {
  const others = omit(props as ComboboxTriggerProps, "class", "children")
  return (
    <ComboboxPrimitive.Trigger
      as={InputGroupButton}
      size="icon-xs"
      variant="ghost"
      data-slot="combobox-trigger"
      class={cn("cn-combobox-trigger", props.class)}
      {...others}
    >
      {props.children ?? <ChevronDownIcon class="cn-combobox-trigger-icon" />}
    </ComboboxPrimitive.Trigger>
  )
}

type ComboboxClearProps = Omit<ComponentProps<typeof InputGroupButton>, "onClick" | "onMouseDown">

const ComboboxClear = (props: ComboboxClearProps) => {
  const context = ComboboxPrimitive.useComboboxContext()
  const others = omit(props, "class", "children")
  return (
    <Show when={context.selectedOptions().length > 0}>
      <InputGroupButton
        data-slot="combobox-clear"
        type="button"
        variant="ghost"
        size="icon-xs"
        class={cn("cn-combobox-clear", props.class)}
        onClick={(event) => {
          if (!event.defaultPrevented) {
            context.listState().selectionManager().clearSelection()
          }
        }}
        onMouseDown={(event) => {
          if (!event.defaultPrevented) {
            event.preventDefault()
          }
        }}
        {...others}
      >
        {props.children ?? <XIcon class="cn-combobox-clear-icon size-3" />}
      </InputGroupButton>
    </Show>
  )
}

type ComboboxContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ComboboxContent = <T extends ValidComponent = "div">(props: ComboboxContentProps<T>) => {
  const others = omit(props as ComboboxContentProps, "class")
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Content
        data-slot="combobox-content"
        class={cn(
          "group/combobox-content cn-combobox-content z-50 max-h-(--kb-popper-available-height) overflow-y-auto outline-none",
          props.class
        )}
        {...others}
      />
    </ComboboxPrimitive.Portal>
  )
}

type ComboboxListProps<
  Option,
  OptGroup = never,
  T extends ValidComponent = "ul"
> = PolymorphicProps<T, ComboboxPrimitive.ComboboxListboxProps<Option, OptGroup, T>> &
  Pick<ComponentProps<T>, "class"> & {
    autoHighlight?: boolean | undefined
  }

const ComboboxAutoHighlightController = (
  props: ParentProps<{
    autoHighlight: boolean
  }>
) => {
  const context = ComboboxPrimitive.useComboboxContext()
  createEffect(
    () => {
      const autoHighlight = props.autoHighlight
      const isOpen = context.isOpen()
      if (!autoHighlight || !isOpen) {
        return
      }
      const keyboardDelegate = context.keyboardDelegate()
      if (keyboardDelegate.getFirstKey == null) return
      const firstKey = keyboardDelegate.getFirstKey()
      const listState = context.listState()
      const selectionManager = listState.selectionManager()
      const focusedKey = selectionManager.focusedKey()
      const collection = listState.collection()

      return {
        collectionHasFocusedKey: focusedKey != null && collection.getItem(focusedKey) != null,
        firstKey,
        focusedKey,
        selectionManager
      }
    },
    (state) => {
      if (state == null) return
      const { collectionHasFocusedKey, firstKey, focusedKey, selectionManager } = state
      if (firstKey == null) {
        if (focusedKey != null) {
          selectionManager.setFocusedKey(undefined)
        }
        return
      }
      if (!collectionHasFocusedKey) {
        selectionManager.setFocusedKey(firstKey)
      }
    }
  )
  return <>{props.children}</>
}

const ComboboxList = <Option, OptGroup = never, T extends ValidComponent = "ul">(
  props: ComboboxListProps<Option, OptGroup, T>
) => {
  const rootContext = useContext(ComboboxRootContext)
  const others = omit(props as ComboboxListProps<Option>, "autoHighlight", "class")
  const autoHighlight = () => props.autoHighlight ?? rootContext?.autoHighlight() ?? false
  return (
    <ComboboxAutoHighlightController autoHighlight={autoHighlight()}>
      <ComboboxPrimitive.Listbox
        data-slot="combobox-list"
        class={cn("cn-combobox-list", props.class)}
        {...others}
      />
    </ComboboxAutoHighlightController>
  )
}

type ComboboxEmptyProps = ComponentProps<"div">

const ComboboxEmpty = (props: ComboboxEmptyProps) => {
  const others = omit(props, "class")
  return <div data-slot="combobox-empty" class={cn("cn-combobox-empty", props.class)} {...others} />
}

type ComboboxSectionProps<T extends ValidComponent = "li"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxSectionProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ComboboxSection = <T extends ValidComponent = "li">(props: ComboboxSectionProps<T>) => {
  const others = omit(props as ComboboxSectionProps, "class")
  return <ComboboxPrimitive.Section data-slot="combobox-section" class={props.class} {...others} />
}

type ComboboxSectionLabelProps = ComponentProps<"div">

const ComboboxSectionLabel = (props: ComboboxSectionLabelProps) => {
  const others = omit(props, "class")
  return <div data-slot="combobox-label" class={cn("cn-combobox-label", props.class)} {...others} />
}

type ComboboxItemProps<T extends ValidComponent = "li"> = PolymorphicProps<
  T,
  ComboboxPrimitive.ComboboxItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    variant?: "default" | "destructive"
  }

const ComboboxItem = <T extends ValidComponent = "li">(rawProps: ComboboxItemProps<T>) => {
  const local = merge({ variant: "default" } as ComboboxItemProps<T>, rawProps) as ComboboxItemProps
  const others = omit(rawProps as ComboboxItemProps, "class", "children", "variant")
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      data-variant={local.variant}
      class={cn(
        "cn-combobox-item group/combobox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        local.class
      )}
      {...others}
    >
      {local.children}
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        class="cn-combobox-item-indicator"
      >
        <CheckIcon />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

type ComboboxItemTextProps = ComponentProps<"span">

const ComboboxItemText = (props: ComboboxItemTextProps) => {
  const others = omit(props, "class")
  return (
    <span
      data-slot="combobox-item-text"
      class={cn("cn-combobox-item-text", props.class)}
      {...others}
    />
  )
}

type ComboboxSeparatorProps = ComponentProps<"hr">

const ComboboxSeparator = (props: ComboboxSeparatorProps) => {
  const others = omit(props, "class")
  return (
    <hr
      data-slot="combobox-separator"
      class={cn("cn-combobox-separator", props.class)}
      {...others}
    />
  )
}

type ComboboxChipProps = ComponentProps<"span">

const ComboboxChip = (props: ComboboxChipProps) => {
  const others = omit(props, "class")
  return <span data-slot="combobox-chip" class={cn("cn-combobox-chip", props.class)} {...others} />
}

type ComboboxChipRemoveProps = ComponentProps<"button">

const ComboboxChipRemove = (props: ComboboxChipRemoveProps) => {
  const others = omit(props, "class", "children", "type")
  return (
    <button
      type={props.type ?? "button"}
      data-slot="combobox-chip-remove"
      class={cn(
        "cn-combobox-chip-remove inline-flex size-4 items-center justify-center rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-ring",
        props.class
      )}
      {...others}
    >
      {props.children ?? <XIcon class="size-3" />}
    </button>
  )
}

const ComboboxHiddenSelect = ComboboxPrimitive.HiddenSelect

const ComboboxLabel = ComboboxPrimitive.Label

const ComboboxDescription = ComboboxPrimitive.Description

const ComboboxErrorMessage = ComboboxPrimitive.ErrorMessage

export {
  Combobox,
  ComboboxPortal,
  ComboboxControl,
  ComboboxInput,
  ComboboxChipInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxContent,
  ComboboxList,
  ComboboxEmpty,
  ComboboxSection,
  ComboboxSectionLabel,
  ComboboxItem,
  ComboboxItemText,
  ComboboxSeparator,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxHiddenSelect,
  ComboboxLabel,
  ComboboxDescription,
  ComboboxErrorMessage
}
