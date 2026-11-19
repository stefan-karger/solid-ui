import { MenuIcon } from "lucide-solid"
import { createSignal, For } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/registry/ui/sheet"

type Link = { title: string; href: string }
export default function DocsMobileNav(props: { links: Link[]; currentPath: string }) {
  const [open, setOpen] = createSignal(false)
  return (
    <Sheet open={open()} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation"
        class="lg:hidden"
        render={(partProps) => <Button {...partProps} variant="ghost" size="icon-sm" />}
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" class="w-72 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Documentation</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile documentation" class="grid gap-0.5 px-4 pb-6">
          <For each={props.links}>
            {(link) => (
              <a
                href={link.href}
                aria-current={props.currentPath === link.href ? "page" : undefined}
                class="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.title}
              </a>
            )}
          </For>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
