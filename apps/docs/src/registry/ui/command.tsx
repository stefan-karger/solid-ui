import type { Component, ComponentProps, JSX, ParentComponent } from "solid-js"
import {
  createContext,
  createSignal,
  createUniqueId,
  mergeProps,
  Show,
  splitProps,
  useContext
} from "solid-js"

import { Search } from "lucide-solid"

import { cn } from "~/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "~/registry/ui/dialog"

type CommandContextValue = {
  search: () => string
  setSearch: (value: string) => void
  filter: (value: string, search: string) => number
}

const CommandContext = createContext<CommandContextValue>()

const useCommand = () => {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error("useCommand must be used within a Command component")
  }
  return context
}

function defaultFilter(value: string, search: string): number {
  const normalizedValue = value.toLowerCase().trim()
  const normalizedSearch = search.toLowerCase().trim()
  if (normalizedSearch.length === 0) return 1
  if (normalizedValue.includes(normalizedSearch)) return 1
  return 0
}

type CommandProps = ComponentProps<"div"> & {
  filter?: (value: string, search: string) => number
}

const Command: Component<CommandProps> = (rawProps) => {
  const props = mergeProps({ filter: defaultFilter }, rawProps)
  const [local, others] = splitProps(props, ["class", "filter"])
  const [search, setSearch] = createSignal("")

  const contextValue: CommandContextValue = {
    search,
    setSearch,
    filter: local.filter
  }

  return (
    <CommandContext.Provider value={contextValue}>
      <div
        class={cn(
          "cn-command flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
          local.class
        )}
        cmdk-root=""
        data-slot="command"
        role="application"
        {...others}
      />
    </CommandContext.Provider>
  )
}

type CommandDialogProps = ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  class?: string
  showCloseButton?: boolean
  children?: JSX.Element
}

const CommandDialog: ParentComponent<CommandDialogProps> = (rawProps) => {
  const props = mergeProps(
    {
      title: "Command Palette",
      description: "Search for a command to run...",
      showCloseButton: true
    },
    rawProps
  )
  const [local, others] = splitProps(props, [
    "title",
    "description",
    "class",
    "showCloseButton",
    "children"
  ])

  return (
    <Dialog {...others}>
      <DialogHeader class="sr-only">
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

type CommandInputProps = ComponentProps<"input">

const CommandInput: Component<CommandInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "value", "onInput"])
  const command = useCommand()
  const id = createUniqueId()

  const handleInput = (
    e: InputEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement }
  ) => {
    command.setSearch(e.currentTarget.value)
    if (typeof local.onInput === "function") {
      local.onInput(e)
    }
  }

  return (
    <div
      class="flex h-9 items-center gap-2 border-b px-3"
      cmdk-input-wrapper=""
      data-slot="command-input-wrapper"
    >
      <Search class="size-4 shrink-0 opacity-50" />
      <input
        class={cn(
          "cn-command-input flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          local.class
        )}
        cmdk-input=""
        data-slot="command-input"
        id={id}
        onInput={handleInput}
        type="text"
        value={local.value ?? command.search()}
        {...others}
      />
    </div>
  )
}

type CommandListProps = ComponentProps<"div">

const CommandList: ParentComponent<CommandListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-command-list max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
        local.class
      )}
      cmdk-list=""
      data-slot="command-list"
      role="listbox"
      {...others}
    />
  )
}

type CommandEmptyProps = ComponentProps<"div">

const CommandEmpty: ParentComponent<CommandEmptyProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  const command = useCommand()

  // Show empty state only when search is active but no results
  const shouldShow = () => command.search().length > 0

  return (
    <Show when={shouldShow()}>
      <div
        class={cn("cn-command-empty py-6 text-center text-sm", local.class)}
        cmdk-empty=""
        data-slot="command-empty"
        role="presentation"
        {...others}
      />
    </Show>
  )
}

type CommandGroupProps = ComponentProps<"div"> & {
  heading?: JSX.Element
}

const CommandGroup: ParentComponent<CommandGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "heading", "children"])
  const [hasVisibleItems] = createSignal(true)

  // In a real implementation, we would track which items are visible
  // For now, we'll keep it simple and always show the group
  const shouldShow = () => hasVisibleItems()

  return (
    <Show when={shouldShow()}>
      <div
        class={cn("cn-command-group overflow-hidden p-1", local.class)}
        cmdk-group=""
        data-slot="command-group"
        role="group"
        {...others}
      >
        <Show when={local.heading}>
          <div
            class="px-2 py-1.5 font-medium text-muted-foreground text-xs"
            cmdk-group-heading=""
            role="presentation"
          >
            {local.heading}
          </div>
        </Show>
        {local.children}
      </div>
    </Show>
  )
}

type CommandSeparatorProps = ComponentProps<"div">

const CommandSeparator: Component<CommandSeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-command-separator -mx-1 h-px bg-border", local.class)}
      cmdk-separator=""
      data-slot="command-separator"
      role="separator"
      {...others}
    />
  )
}

type CommandItemProps = ComponentProps<"div"> & {
  value?: string
  keywords?: string[]
  onSelect?: (value: string) => void
  disabled?: boolean
}

const CommandItem: ParentComponent<CommandItemProps> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "value",
    "keywords",
    "onSelect",
    "disabled",
    "children"
  ])
  const command = useCommand()
  const [selected] = createSignal(false)

  // Compute search score
  const score = () => {
    const searchValue = command.search()
    if (!local.value) return 1

    // Check main value
    let mainScore = command.filter(local.value, searchValue)

    // Check keywords
    if (local.keywords && mainScore === 0) {
      for (const keyword of local.keywords) {
        const keywordScore = command.filter(keyword, searchValue)
        if (keywordScore > 0) {
          mainScore = keywordScore
          break
        }
      }
    }

    return mainScore
  }

  const isVisible = () => score() > 0
  const isDisabled = () => local.disabled ?? false

  const handleClick = () => {
    if (isDisabled()) return
    local.onSelect?.(local.value ?? "")
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isDisabled()) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      local.onSelect?.(local.value ?? "")
    }
  }

  return (
    <Show when={isVisible()}>
      <div
        class={cn(
          "cn-command-item relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
          local.class
        )}
        cmdk-item=""
        data-disabled={isDisabled()}
        data-selected={selected()}
        data-slot="command-item"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="option"
        tabIndex={isDisabled() ? undefined : 0}
        {...others}
      >
        {local.children}
      </div>
    </Show>
  )
}

type CommandShortcutProps = ComponentProps<"span">

const CommandShortcut: ParentComponent<CommandShortcutProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn(
        "cn-command-shortcut ml-auto text-muted-foreground text-xs tracking-widest",
        local.class
      )}
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
