import { createEffect, createSignal, For, onCleanup } from "solid-js"
import { useNavigate } from "@solidjs/router"

import { docsConfig } from "@/config/docs"
import { Button } from "@/registry/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/registry/ui/command"

import { IconCommand, IconFile } from "./icons"

export default function SearchBar() {
  const [open, setOpen] = createSignal(false)

  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    onCleanup(() => document.removeEventListener("keydown", handleKeyDown))
  })

  const navigate = useNavigate()
  const redirect = (url: string) => {
    setOpen(false)
    navigate(url)
  }

  return (
    <>
      <Button
        id="search-trigger"
        variant="outline"
        class="relative flex h-8 w-full justify-between bg-muted/50 pr-1 text-muted-foreground md:w-44 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span class="hidden lg:inline-flex">Search documentation...</span>
        <span class="inline-flex lg:hidden">Search...</span>
        <kbd class="pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium">
          <IconCommand stroke-width={1} />
          <span>K</span>
        </kbd>
      </Button>
      <CommandDialog open={open()} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            <For each={docsConfig.mainNav.filter((item) => !item.external)}>
              {(item) => (
                <CommandItem onSelect={() => redirect(item.href)}>
                  <IconFile class="mr-2" />
                  {item.title}
                </CommandItem>
              )}
            </For>
          </CommandGroup>
          <For each={docsConfig.sidebarNav}>
            {(category) => (
              <CommandGroup heading={category.title}>
                <For each={category.items}>
                  {(item) => (
                    <CommandItem onSelect={() => redirect(item.href)}>
                      <IconFile class="mr-2" />
                      {item.title}
                    </CommandItem>
                  )}
                </For>
              </CommandGroup>
            )}
          </For>
        </CommandList>
      </CommandDialog>
    </>
  )
}
