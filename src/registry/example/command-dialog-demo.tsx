import { createEffect, createSignal, onCleanup } from "solid-js";

import {
  IconCalendar,
  IconMail,
  IconRocket,
  IconSettings,
  IconSmile,
  IconUser,
} from "~/components/icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/registry/ui/command";

export default function CommandDialogDemo() {
  const [open, setOpen] = createSignal(false);

  createEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    onCleanup(() => document.removeEventListener("keydown", down));
  });

  return (
    <>
      <p class="text-muted-foreground text-sm">
        Press{" "}
        <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100">
          <span class="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog onOpenChange={setOpen} open={open()}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <IconCalendar class="mr-2 size-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <IconSmile class="mr-2 size-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <IconRocket class="mr-2 size-4" />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <IconUser class="mr-2 size-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconMail class="mr-2 size-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconSettings class="mr-2 size-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
