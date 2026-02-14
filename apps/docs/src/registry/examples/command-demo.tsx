import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-solid"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "~/registry/ui/command"

export default function CommandDemo() {
  return (
    <Command class="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem keywords={["date", "schedule"]} value="calendar">
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem keywords={["emoji", "emoticon"]} value="search-emoji">
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem keywords={["math", "calc"]} value="calculator">
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem keywords={["account", "user"]} value="profile">
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem keywords={["payment", "subscription"]} value="billing">
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem keywords={["preferences", "config"]} value="settings">
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
