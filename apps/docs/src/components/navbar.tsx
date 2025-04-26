import { A, useLocation } from "@solidjs/router"

import { IconBrandGithub, IconLogo } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import SearchBar from "@/components/search-bar"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/ui/button"

export default function Navbar() {
  const location = useLocation()
  const pathname = () => location.pathname

  return (
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div class="flex h-14 items-center px-4">
        <MobileNav />

        <div class="mr-4 hidden md:flex">
          <A href="/" class="mr-6 flex items-center space-x-2">
            <IconLogo class="size-6" />
            <span class="hidden font-bold sm:inline-block">SolidUI</span>
          </A>
          <nav class="flex items-center gap-4 text-sm lg:gap-6">
            <A
              href="/docs/introduction"
              class={cn(
                "transition-colors hover:text-foreground/80",
                pathname().startsWith("/docs") && !pathname().startsWith("/docs/components")
                  ? "text-foreground"
                  : "text-foreground/80"
              )}
            >
              Docs
            </A>
            <A
              href="/docs/components/accordion"
              class={cn(
                "transition-colors hover:text-foreground/80",
                pathname().startsWith("/docs/components") ? "text-foreground" : "text-foreground/80"
              )}
            >
              Components
            </A>
            <A
              href="/blocks"
              class={cn(
                "transition-colors hover:text-foreground/80",
                pathname().startsWith("/blocks") ? "text-foreground" : "text-foreground/80"
              )}
            >
              Blocks
            </A>
            <A
              href="/examples/cards"
              class={cn(
                "transition-colors hover:text-foreground/80",
                pathname().startsWith("/examples") ? "text-foreground" : "text-foreground/80"
              )}
            >
              Examples
            </A>
          </nav>
        </div>
        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div class="w-full flex-1 md:w-auto md:flex-none">
            <SearchBar />
          </div>
          <div class="flex items-center">
            <A href="https://github.com/stefan-karger/solid-ui" target="_blank" rel="noreferrer">
              <div
                class={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost"
                  }),
                  "w-9 px-0"
                )}
              >
                <IconBrandGithub class="size-5" />
                <span class="sr-only">GitHub</span>
              </div>
            </A>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
