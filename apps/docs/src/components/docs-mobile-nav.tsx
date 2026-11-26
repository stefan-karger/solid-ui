import { createSignal, For } from "solid-js"

import type { DocsNavigationGroup } from "~/lib/docs"
import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger
} from "~/registry/ui/popover"

const mainLinks = [
  { title: "Home", href: "/" },
  { title: "Docs", href: "/docs/installation" },
  { title: "Components", href: "/docs/components" },
  { title: "Create", href: "/create" }
]

export default function DocsMobileNav(props: {
  navigation: DocsNavigationGroup[]
  currentPath: string
}) {
  const [open, setOpen] = createSignal(false)
  const groups = () => [
    { title: "Menu", links: mainLinks },
    ...props.navigation.map((group) => ({
      title: group.title,
      links: group.links.filter((link) => link.href !== "/docs/components")
    }))
  ]

  return (
    <Popover open={open()} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="Toggle menu"
        render={(part) => (
          <Button
            {...part}
            variant="ghost"
            class="extend-touch-target h-8 shrink-0 gap-2.5 px-0! hover:bg-transparent lg:hidden"
          />
        )}
      >
        <span class="relative size-4 shrink-0" aria-hidden="true">
          <span
            class={cn(
              "absolute left-0 h-0.5 w-4 bg-foreground transition-all duration-100 motion-reduce:transition-none",
              open() ? "top-[0.4rem] -rotate-45" : "top-1"
            )}
          />
          <span
            class={cn(
              "absolute left-0 h-0.5 w-4 bg-foreground transition-all duration-100 motion-reduce:transition-none",
              open() ? "top-[0.4rem] rotate-45" : "top-2.5"
            )}
          />
        </span>
        <span class="text-lg leading-none font-medium">Menu</span>
      </PopoverTrigger>
      <PopoverContent
        anchor="[data-docs-header]"
        side="bottom"
        sideOffset={0}
        align="start"
        collisionPadding={0}
        class="max-h-(--available-height) w-dvw max-w-none overflow-y-auto overscroll-contain rounded-none border-0 bg-background p-0 ring-0 lg:hidden"
      >
        <PopoverTitle class="sr-only">Site navigation</PopoverTitle>
        <nav
          aria-label="Mobile documentation"
          class="grid gap-8 px-6 py-6 sm:px-8"
        >
          <For each={groups()}>
            {(group) => (
              <div class="grid gap-2">
                <p class="mb-1 text-sm font-medium text-muted-foreground">
                  {group.title}
                </p>
                <For each={group.links}>
                  {(link) => (
                    <a
                      href={link.href}
                      aria-current={
                        props.currentPath === link.href ? "page" : undefined
                      }
                      class="w-fit rounded-sm text-xl leading-snug font-medium tracking-tight hover:text-primary aria-[current=page]:text-primary sm:text-2xl"
                      onClick={() => setOpen(false)}
                    >
                      {link.title}
                    </a>
                  )}
                </For>
              </div>
            )}
          </For>
        </nav>
      </PopoverContent>
    </Popover>
  )
}
