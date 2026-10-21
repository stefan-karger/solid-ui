import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "~/registry/ui/command"

export default function CommandBasic() {
  const [open, setOpen] = createSignal(false)

  return (
    <div class="flex flex-col gap-4">
      <Button class="w-fit" onClick={() => setOpen(true)} variant="outline">
        Open Menu
      </Button>
      <CommandDialog onOpenChange={setOpen} open={open()}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="search-emoji">Search Emoji</CommandItem>
              <CommandItem value="calculator">Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
