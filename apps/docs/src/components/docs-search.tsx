import { BookOpenIcon, BoxIcon, CornerDownLeftIcon } from "lucide-solid"
import { For } from "solid-js"

import type { DocsNavigationGroup } from "~/lib/docs"
import { Button } from "~/registry/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList
} from "~/registry/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import { Kbd } from "~/registry/ui/kbd"

export default function DocsSearch(props: { navigation: DocsNavigationGroup[] }) {
  return (
    <Dialog>
      <DialogTrigger
        aria-label="Search documentation"
        shortcut="mod+k"
        render={(part) => (
          <Button
            {...part}
            variant="outline"
            class="extend-touch-target relative h-8 min-w-0 shrink justify-start rounded-lg border-none bg-muted px-1 text-xs text-foreground shadow-none transition-colors hover:bg-muted/50 min-[360px]:px-1.5 min-[360px]:text-sm sm:px-3 md:w-48 md:shrink-0 lg:w-40 xl:w-64 dark:bg-card"
          />
        )}
      >
        <span class="min-w-0 truncate xl:hidden">Search...</span>
        <span class="hidden min-w-0 truncate xl:inline">Search documentation...</span>
      </DialogTrigger>
      <DialogContent
        initialFocus="[data-slot=command-input]"
        showCloseButton={false}
        class="top-[15svh] flex w-[calc(100%-2rem)] max-w-lg translate-y-0 flex-col gap-0 overflow-hidden rounded-xl border-none bg-clip-padding p-0 shadow-2xl ring-4 ring-border/80 dark:ring-border"
      >
        <DialogHeader class="sr-only">
          <DialogTitle>Search documentation</DialogTitle>
          <DialogDescription>Find a section or component by name.</DialogDescription>
        </DialogHeader>
        <Command
          filter="contains"
          onAction={(href) => window.location.assign(href)}
          class="h-auto min-h-0 rounded-none bg-transparent p-2 pb-0 **:data-[ui=command-input-wrapper]:p-0"
        >
          <CommandInput
            aria-label="Find a section or component"
            placeholder="Search documentation…"
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList class="mt-1 max-h-[min(20rem,52svh)] overscroll-contain">
            <For each={props.navigation}>
              {(group) => (
                <CommandGroup>
                  <CommandGroupLabel>{group.title}</CommandGroupLabel>
                  <For each={group.links}>
                    {(link) => (
                      <CommandItem value={link.href} label={link.title}>
                        {group.title === "Sections" ? (
                          <BookOpenIcon aria-hidden="true" />
                        ) : (
                          <BoxIcon aria-hidden="true" />
                        )}
                        <span>{link.title}</span>
                      </CommandItem>
                    )}
                  </For>
                </CommandGroup>
              )}
            </For>
          </CommandList>
        </Command>
        <div
          data-slot="dialog-footer"
          class="flex h-10 shrink-0 items-center gap-2 border-t border-border bg-muted/70 px-4 text-xs font-medium text-muted-foreground"
        >
          <Kbd class="size-5 min-w-5 rounded-sm border border-border bg-background p-0">
            <CornerDownLeftIcon class="size-3" aria-hidden="true" />
            <span class="sr-only">Enter</span>
          </Kbd>
          <span>Go to Page</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
