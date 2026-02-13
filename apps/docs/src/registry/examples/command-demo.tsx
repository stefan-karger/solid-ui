import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User
} from "lucide-solid"

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
          <CommandItem value="calendar" keywords={["date", "schedule"]}>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem value="search-emoji" keywords={["emoji", "emoticon"]}>
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem value="calculator" keywords={["math", "calc"]}>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile" keywords={["account", "user"]}>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem value="billing" keywords={["payment", "subscription"]}>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem value="settings" keywords={["preferences", "config"]}>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
