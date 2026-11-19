import { For } from "solid-js"
import { createMemo, createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList
} from "~/registry/ui/command"

type CommandOption = {
  value: string
  label: string
}

type CommandGroupOption = {
  heading: string
  items: CommandOption[]
}

const options: CommandGroupOption[] = [
  {
    heading: "Suggestions",
    items: [
      { value: "calendar", label: "Calendar" },
      { value: "search-emoji", label: "Search Emoji" },
      { value: "calculator", label: "Calculator" }
    ]
  }
]

export default function CommandBasic() {
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
        <Command onQueryChange={setQuery}>
          <CommandInput
            placeholder="Type a command or search..."
            aria-label="Type a command or search..."
          />
          <CommandList>
            <For each={filteredOptions()}>
              {(group) => (
                <CommandGroup>
                  <CommandGroupLabel>{group.heading}</CommandGroupLabel>
                  <For each={group["items"]}>
                    {(option) => (
                      <CommandItem value={option["value"]} label={option["label"]}>
                        {option.label}
                      </CommandItem>
                    )}
                  </For>
                </CommandGroup>
              )}
            </For>
          </CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </Command>
      </CommandDialog>
    </div>
  )
}
