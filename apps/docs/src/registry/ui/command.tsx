import { useComboboxContext } from "@kobalte/core/combobox"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as CommandPrimitive from "@kobalte/core/search"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { CheckIcon, SearchIcon } from "lucide-solid"
import { createEffect, merge, Show, omit } from "solid-js"

import { cn } from "~/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "~/registry/ui/dialog"
import { InputGroup, InputGroupAddon } from "~/registry/ui/input-group"

type CommandProps<Option, OptGroup = never, T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CommandPrimitive.SearchRootProps<Option, OptGroup, T>
> &
  Pick<ComponentProps<T>, "class">

const Command = <Option, OptGroup = never, T extends ValidComponent = "div">(
  props: CommandProps<Option, OptGroup, T>
) => {
  const others = omit(props as CommandProps<Option>, "class", "open")
  return (
    <CommandPrimitive.Root
      data-slot="command"
      class={cn("cn-command flex size-full flex-col overflow-hidden", props.class)}
      open={props.open ?? true}
      {...others}
    />
  )
}

type CommandDialogProps = Omit<ComponentProps<typeof Dialog>, "children"> &
  Pick<ComponentProps<"div">, "class" | "children"> & {
    title?: string
    description?: string
    showCloseButton?: boolean
  }

const CommandDialog = (props: CommandDialogProps) => {
  const local = merge(
    {
      title: "Command Palette",
      description: "Search for a command to run...",
      showCloseButton: false
    },
    props
  ) as CommandDialogProps
  const others = omit(
    props as CommandDialogProps,
    "title",
    "description",
    "showCloseButton",
    "children",
    "class"
  )
  return (
    <Dialog {...others}>
      <DialogHeader class="sr-only">
        <DialogTitle>{local.title}</DialogTitle>
        <DialogDescription>{local.description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        class={cn("cn-command-dialog top-1/3 translate-y-0 overflow-hidden p-0", local.class)}
        showCloseButton={local.showCloseButton ?? false}
      >
        {local.children}
      </DialogContent>
    </Dialog>
  )
}

type CommandInputProps = CommandPrimitive.SearchInputProps & {
  class?: string | undefined
}

const CommandInput = (props: CommandInputProps) => {
  const others = omit(props, "class")
  return (
    <CommandPrimitive.Control data-slot="command-input-wrapper" class="cn-command-input-wrapper">
      <InputGroup class="cn-command-input-group">
        <CommandPrimitive.Input
          data-slot="command-input"
          class={cn(
            "cn-command-input outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            props.class
          )}
          {...others}
        />
        <InputGroupAddon>
          <SearchIcon class="cn-command-input-icon" />
        </InputGroupAddon>
      </InputGroup>
    </CommandPrimitive.Control>
  )
}

const CommandContent = CommandPrimitive.Content

type CommandListProps<Option, OptGroup = never, T extends ValidComponent = "ul"> = PolymorphicProps<
  T,
  CommandPrimitive.SearchListboxProps<Option, OptGroup, T>
> &
  Pick<ComponentProps<T>, "class"> & {
    autoHighlightFirst?: boolean | undefined
  }

const CommandList = <Option, OptGroup = never, T extends ValidComponent = "ul">(
  props: CommandListProps<Option, OptGroup, T>
) => {
  const local = merge({ autoHighlightFirst: true }, props) as CommandListProps<Option>
  const others = omit(props as CommandListProps<Option>, "class", "autoHighlightFirst")
  const context = useComboboxContext()
  createEffect(
    () => [local.autoHighlightFirst, context.isOpen()] as const,
    ([autoHighlightFirst, isOpen]) => {
      if (!autoHighlightFirst || !isOpen) {
        return
      }
      const keyboardDelegate = context.keyboardDelegate()
      if (keyboardDelegate.getFirstKey == null) return
      const firstKey = keyboardDelegate.getFirstKey()
      const listState = context.listState()
      const selectionManager = listState.selectionManager()
      const focusedKey = selectionManager.focusedKey()
      if (firstKey == null) {
        if (focusedKey != null) {
          selectionManager.setFocusedKey(undefined)
        }
        return
      }
      const collection = listState.collection()
      if (focusedKey == null || !collection.getItem(focusedKey)) {
        selectionManager.setFocusedKey(firstKey)
      }
    }
  )
  return (
    <CommandPrimitive.Listbox
      data-slot="command-list"
      class={cn("cn-command-list overflow-x-hidden overflow-y-auto", local.class)}
      {...others}
    />
  )
}

type CommandEmptyProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CommandPrimitive.SearchNoResultProps<T>
> &
  Pick<ComponentProps<T>, "class">

const CommandEmpty = <T extends ValidComponent = "div">(props: CommandEmptyProps<T>) => {
  const others = omit(props as CommandEmptyProps, "class")
  return (
    <CommandPrimitive.NoResult
      data-slot="command-empty"
      class={cn("cn-command-empty", props.class)}
      {...others}
    />
  )
}

type CommandGroupProps<T extends ValidComponent = "li"> = PolymorphicProps<
  T,
  CommandPrimitive.SearchSectionProps<T>
> &
  Pick<ComponentProps<T>, "class">

const CommandGroup = <T extends ValidComponent = "li">(props: CommandGroupProps<T>) => {
  const others = omit(props as CommandGroupProps, "class")
  return (
    <CommandPrimitive.Section
      data-slot="command-group"
      class={cn("cn-command-group", props.class)}
      {...others}
    />
  )
}

type CommandItemProps<T extends ValidComponent = "li"> = PolymorphicProps<
  T,
  CommandPrimitive.SearchItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    showIndicator?: boolean
  }

const CommandItem = <T extends ValidComponent = "li">(props: CommandItemProps<T>) => {
  const local = merge({ showIndicator: true }, props) as CommandItemProps
  const others = omit(props as CommandItemProps, "class", "children", "showIndicator")
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      class={cn(
        "cn-command-item group/command-item data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      {...others}
    >
      {local.children}
      <Show when={local.showIndicator}>
        <CheckIcon class="cn-command-item-indicator ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-selected/command-item:opacity-100" />
      </Show>
    </CommandPrimitive.Item>
  )
}

type CommandShortcutProps = ComponentProps<"span">

const CommandShortcut = (props: CommandShortcutProps) => {
  const others = omit(props, "class")
  return (
    <span data-slot="command-shortcut" class={cn("cn-command-shortcut", props.class)} {...others} />
  )
}

type CommandSeparatorProps = ComponentProps<"div">

const CommandSeparator = (props: CommandSeparatorProps) => {
  const others = omit(props, "class")
  return (
    <div
      data-slot="command-separator"
      role="separator"
      class={cn("cn-command-separator", props.class)}
      {...others}
    />
  )
}

const CommandItemLabel = CommandPrimitive.ItemLabel

const CommandItemDescription = CommandPrimitive.ItemDescription

const CommandGroupLabel = (props: ComponentProps<"div">) => {
  const others = omit(props, "class")
  return (
    <div
      data-slot="command-group-label"
      class={cn("cn-command-group-label", props.class)}
      {...others}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandContent,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandItemLabel,
  CommandItemDescription,
  CommandGroupLabel
}
