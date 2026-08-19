import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-solid";
import { createSignal } from "solid-js";
import { Button } from "~/registry/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/registry/ui/command";

export default function CommandGroups() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" class="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open()} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">
                <Calendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem value="search-emoji">
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem value="calculator">
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem value="profile">
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem value="billing">
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem value="settings">
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
