import { Dynamic } from "@solidjs/web"
import { CreditCard, Settings, User, type LucideIcon } from "lucide-solid"
import { createMemo, createSignal, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from "~/registry/ui/command"

type CommandOption = {
  value: string
  label: string
  shortcut?: string
  icon: LucideIcon
}

type CommandGroupOption = {
  heading: string
  items: CommandOption[]
}

const options: CommandGroupOption[] = [
  {
    heading: "Settings",
    items: [
      { value: "profile", label: "Profile", shortcut: "⌘P", icon: User },
      { value: "billing", label: "Billing", shortcut: "⌘B", icon: CreditCard },
      { value: "settings", label: "Settings", shortcut: "⌘S", icon: Settings }
    ]
  }
]

export default function CommandShortcuts() {
  const [open, setOpen] = createSignal(false)
  const [query, setQuery] = createSignal("")

  const filteredOptions = createMemo(() => {
    const trimmedQuery = query().trim().toLowerCase()

    if (!trimmedQuery) {
      return options
    }

    const filteredItems = options[0]!.items.filter((item) => {
      return (
        item.label.toLowerCase().includes(trimmedQuery) ||
        item.value.toLowerCase().includes(trimmedQuery)
      )
    })

    return [{ ...options[0]!, items: filteredItems }]
  })

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      setQuery("")
    }
  }

  return (
    <div class="flex flex-col gap-4">
      <Button class="w-fit" onClick={() => setOpen(true)} variant="outline">
        Open Menu
      </Button>
      <CommandDialog onOpenChange={handleOpenChange} open={open()}>
        <Command<CommandOption, CommandGroupOption>
          onInputChange={setQuery}
          placeholder="Type a command or search..."
          options={filteredOptions()}
          optionGroupChildren="items"
          optionValue="value"
          optionTextValue="label"
          optionLabel="label"
          itemComponent={(props) => (
            <CommandItem item={props.item}>
              <Dynamic class="size-4" component={props.item.rawValue.icon} />
              <span>{props.item.rawValue.label}</span>
              <Show when={props.item.rawValue.shortcut}>
                {(shortcut) => <CommandShortcut>{shortcut()}</CommandShortcut>}
              </Show>
            </CommandItem>
          )}
          sectionComponent={(props) => (
            <CommandGroup>
              <CommandGroupLabel>{props.section.rawValue.heading}</CommandGroupLabel>
            </CommandGroup>
          )}
        >
          <CommandInput />
          <CommandList />
          <CommandEmpty>No results found.</CommandEmpty>
        </Command>
      </CommandDialog>
    </div>
  )
}
