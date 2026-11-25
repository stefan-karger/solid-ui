// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
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

export default function DocsSearch(props: {
  navigation: DocsNavigationGroup[]
}) {
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
        <span class="hidden min-w-0 truncate xl:inline">
          Search documentation...
        </span>
      </DialogTrigger>
      <DialogContent
        initialFocus="[data-slot=command-input]"
        showCloseButton={false}
        class="top-[15svh] flex w-[calc(100%-2rem)] max-w-lg translate-y-0 flex-col gap-0 overflow-hidden rounded-xl border-none bg-clip-padding p-0 shadow-2xl ring-4 ring-border/80 dark:ring-border"
      >
        <DialogHeader class="sr-only">
          <DialogTitle>Search documentation</DialogTitle>
          <DialogDescription>
            Find a section or component by name.
          </DialogDescription>
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
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M12 5v16" />
                            <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                            <path d="m3.3 7 8.7 5 8.7-5" />
                            <path d="M12 22V12" />
                          </svg>
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-3"
              aria-hidden="true"
            >
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
              <path d="m9 10-5 5 5 5" />
            </svg>
            <span class="sr-only">Enter</span>
          </Kbd>
          <span>Go to Page</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
