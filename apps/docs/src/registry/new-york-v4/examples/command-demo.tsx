import {
  IconCalculator,
  IconCalendar,
  IconCreditCard,
  IconSettings,
  IconSmile,
  IconUser
} from "~/components/icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "~/registry/new-york-v4/ui/command"

export default function CommandDemo() {
  return (
    <Command class="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <IconCalendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <IconSmile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <IconCalculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <IconUser />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconCreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
