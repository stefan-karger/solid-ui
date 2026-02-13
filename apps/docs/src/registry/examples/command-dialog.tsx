import { createSignal } from "solid-js"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User
} from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "~/registry/ui/command"

export default function CommandDialogDemo() {
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <p class="text-muted-foreground text-sm">
        Press{" "}
        <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span class="text-xs">⌘</span>K
        </kbd>
      </p>
      <Button onClick={() => setOpen(true)} variant="outline">
        Open Command Menu
      </Button>

      <CommandDialog open={open()} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              value="calendar"
              keywords={["date", "schedule"]}
              onSelect={() => {
                console.log("Calendar selected")
                setOpen(false)
              }}
            >
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem
              value="search-emoji"
              keywords={["emoji", "emoticon"]}
              onSelect={() => {
                console.log("Search Emoji selected")
                setOpen(false)
              }}
            >
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem
              value="calculator"
              keywords={["math", "calc"]}
              onSelect={() => {
                console.log("Calculator selected")
                setOpen(false)
              }}
            >
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              value="profile"
              keywords={["account", "user"]}
              onSelect={() => {
                console.log("Profile selected")
                setOpen(false)
              }}
            >
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="billing"
              keywords={["payment", "subscription"]}
              onSelect={() => {
                console.log("Billing selected")
                setOpen(false)
              }}
            >
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="settings"
              keywords={["preferences", "config"]}
              onSelect={() => {
                console.log("Settings selected")
                setOpen(false)
              }}
            >
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
