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
        <Command<CommandOption, CommandGroupOption>
          onInputChange={setQuery}
          placeholder="Type a command or search..."
          options={filteredOptions()}
          optionGroupChildren="items"
          optionValue="value"
          optionTextValue="label"
          optionLabel="label"
          itemComponent={(props) => (
            <CommandItem item={props.item}>{props.item.rawValue.label}</CommandItem>
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
