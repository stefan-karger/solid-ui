import type { Component, ComponentProps, ParentProps, VoidProps } from "solid-js"
import { splitProps } from "solid-js"

import type { DialogRootProps } from "@kobalte/core/dialog"
import * as CommandPrimitive from "cmdk-solid"

import { cn } from "~/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "~/registry/new-york-v4/ui/dialog"

const Command: Component<ParentProps<CommandPrimitive.CommandRootProps>> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.CommandRoot
      class={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        local.class
      )}
      data-slot="command"
      {...others}
    />
  )
}

type CommandDialogProps = ParentProps<DialogRootProps> & {
  title?: string
  description?: string
  showCloseButton?: boolean
  class?: string
}

const CommandDialog: Component<CommandDialogProps> = (props) => {
  const [local, others] = splitProps(props, [
    "children",
    "title",
    "description",
    "showCloseButton",
    "class"
  ])

  return (
    <Dialog {...others}>
      <DialogHeader>
        <DialogTitle>{local.title}</DialogTitle>
        <DialogDescription>{local.description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        class={cn("overflow-hidden p-0", local.class)}
        showCloseButton={local.showCloseButton}
      >
        <Command class="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {local.children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput: Component<VoidProps<CommandPrimitive.CommandInputProps>> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class="flex items-center border-b px-3"
      cmdk-input-wrapper=""
      data-slot="command-input-wrapper"
    >
      <svg
        class="mr-2 size-4 shrink-0 opacity-50"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      <CommandPrimitive.CommandInput
        class={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          local.class
        )}
        data-slot="command-input"
        {...others}
      />
    </div>
  )
}

const CommandList: Component<ParentProps<CommandPrimitive.CommandListProps>> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.CommandList
      class={cn("max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", local.class)}
      data-slot="command-list"
      {...others}
    />
  )
}

const CommandEmpty: Component<ParentProps<CommandPrimitive.CommandEmptyProps>> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.CommandEmpty
      class={cn("py-6 text-center text-sm", local.class)}
      data-slot="command-empty"
      {...others}
    />
  )
}

const CommandGroup: Component<ParentProps<CommandPrimitive.CommandGroupProps>> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.CommandGroup
      class={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
        local.class
      )}
      data-slot="command-group"
      {...others}
    />
  )
}

const CommandSeparator: Component<VoidProps<CommandPrimitive.CommandSeparatorProps>> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.CommandSeparator
      class={cn("-mx-1 h-px bg-border", local.class)}
      data-slot="command-separator"
      {...others}
    />
  )
}

const CommandItem: Component<ParentProps<CommandPrimitive.CommandItemProps>> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.CommandItem
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      cmdk-item=""
      data-slot="command-item"
      {...others}
    />
  )
}

const CommandShortcut: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <span
      class={cn("ml-auto text-muted-foreground text-xs tracking-widest", local.class)}
      data-slot="command-shortcut"
      {...others}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
}
