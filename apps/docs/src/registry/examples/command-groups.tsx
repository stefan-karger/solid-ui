import {
  Calculator,
  Calendar,
  CreditCard,
  FaceSlightlySmilingIcon,
  Settings,
  User,
  type LucideIcon
} from "lucide-solid"
import { For } from "solid-js"
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
  CommandSeparator,
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
    heading: "Suggestions",
    items: [
      { value: "calendar", label: "Calendar", icon: Calendar },
      {
        value: "search-emoji",
        label: "Search Emoji",
        icon: FaceSlightlySmilingIcon
      },
      { value: "calculator", label: "Calculator", icon: Calculator }
    ]
  },
  {
    heading: "Settings",
    items: [
      { value: "profile", label: "Profile", shortcut: "⌘P", icon: User },
      { value: "billing", label: "Billing", shortcut: "⌘B", icon: CreditCard },
      { value: "settings", label: "Settings", shortcut: "⌘S", icon: Settings }
    ]
  }
]

export default function CommandGroups() {
  const [open, setOpen] = createSignal(false)
  const [query, setQuery] = createSignal("")

  const filteredOptions = createMemo(() => {
    const trimmedQuery = query().trim().toLowerCase()

    if (!trimmedQuery) {
      return options
    }

    return options
      .map(({ heading, items }) => ({
        heading,
        items: items.filter((item) => {
          return (
            item.label.toLowerCase().includes(trimmedQuery) ||
            item.value.toLowerCase().includes(trimmedQuery)
          )
        })
      }))
      .filter((group) => group.items.length > 0)
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
        <Command onQueryChange={setQuery}>
          <CommandInput
            placeholder="Type a command or search..."
            aria-label="Type a command or search..."
          />
          <CommandList>
            <For each={filteredOptions()}>
              {(group, groupIndex) => (
                <>
                  {groupIndex() > 0 ? <CommandSeparator /> : null}
                  <CommandGroup>
                    <CommandGroupLabel>{group.heading}</CommandGroupLabel>
                    <For each={group["items"]}>
                      {(option) => (
                        <CommandItem
                          value={option["value"]}
                          label={option["label"]}
                        >
                          <option.icon class="size-4" />
                          <span>{option.label}</span>
                          <Show when={option.shortcut}>
                            {(shortcut) => (
                              <CommandShortcut>{shortcut()}</CommandShortcut>
                            )}
                          </Show>
                        </CommandItem>
                      )}
                    </For>
                  </CommandGroup>
                </>
              )}
            </For>
          </CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </Command>
      </CommandDialog>
    </div>
  )
}
