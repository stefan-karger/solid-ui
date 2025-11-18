import { createMemo, type ParentProps, Show } from "solid-js"
import { A, useLocation } from "@solidjs/router"

import { useFrontmatter } from "@kobalte/solidbase/client"

import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from "~/components/icons"
import { MainNavigation } from "~/components/main-navigation"
import { TableOfContents } from "~/components/table-of-contents"
import { getPrevAndNext } from "~/config/docs"
import { Badge } from "~/registry/v1/ui/badge"
import { Button } from "~/registry/v1/ui/button"
import { SidebarProvider } from "~/registry/v1/ui/sidebar"
import type { MyFrontmatter } from "~/types"

export function DocsLayout(props: ParentProps) {
  const frontmatter = useFrontmatter<MyFrontmatter>()

  const location = useLocation()
  const pagination = createMemo(() => getPrevAndNext(location.pathname))

  return (
    <div class="container-wrapper flex flex-1 flex-col px-2">
      <SidebarProvider class="3xl:fixed:container min-h-min flex-1 items-start 3xl:fixed:px-3 px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
        <MainNavigation />
        <div class="size-full">
          <div class="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full" data-slot="docs">
            <div class="flex min-w-0 flex-1 flex-col">
              <div class="h-(--top-spacing) shrink-0" />
              <article class="mx-auto flex w-full min-w-0 max-w-2xl flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
                <div class="flex flex-col gap-2">
                  <div class="flex flex-col gap-2">
                    <div class="flex items-start justify-between">
                      <h1 class="scroll-m-20 font-semibold text-4xl tracking-tight sm:text-3xl xl:text-4xl">
                        {frontmatter()?.title}
                      </h1>
                      <div class="docs-nav fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-border/50 border-t bg-background/80 px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                        <Show when={pagination()?.prev}>
                          {(prev) => (
                            <Button
                              as={A}
                              class="extend-touch-target size-8 shadow-none md:size-7"
                              href={prev().href}
                              size="icon"
                              title={prev().title}
                              variant="secondary"
                            >
                              <IconArrowLeft />
                            </Button>
                          )}
                        </Show>
                        <Show when={pagination()?.next}>
                          {(next) => (
                            <Button
                              as={A}
                              class="extend-touch-target size-8 shadow-none md:size-7"
                              href={next().href}
                              size="icon"
                              title={next().title}
                              variant="secondary"
                            >
                              <IconArrowRight />
                            </Button>
                          )}
                        </Show>
                      </div>
                    </div>
                    <p class="text-balance text-[1.05rem] text-muted-foreground sm:text-base">
                      {frontmatter()?.description}
                    </p>
                  </div>
                  <Show when={frontmatter()?.links}>
                    {(links) => (
                      <div class="flex items-center gap-2 pt-4">
                        <Show when={links().doc}>
                          {(doc) => (
                            <Badge
                              as="a"
                              class="rounded-full"
                              href={doc()}
                              rel="noreferrer"
                              target="_blank"
                              variant="secondary"
                            >
                              Docs <IconArrowUpRight />
                            </Badge>
                          )}
                        </Show>
                        <Show when={links().api}>
                          {(api) => (
                            <Badge
                              as="a"
                              class="rounded-full"
                              href={api()}
                              rel="noreferrer"
                              target="_blank"
                              variant="secondary"
                            >
                              API Reference <IconArrowUpRight />
                            </Badge>
                          )}
                        </Show>
                      </div>
                    )}
                  </Show>
                </div>
                <div>{props.children}</div>
                <div class="mx-auto hidden h-16 w-full max-w-2xl items-center justify-between gap-2 px-4 sm:flex md:px-0">
                  <Show when={pagination()?.prev}>
                    {(prev) => (
                      <Button
                        as={A}
                        class="extend-touch-target shadow-none"
                        href={prev().href}
                        title={prev().title}
                        variant="secondary"
                      >
                        <IconArrowLeft />
                        {prev().title}
                      </Button>
                    )}
                  </Show>
                  <Show when={pagination()?.next}>
                    {(next) => (
                      <Button
                        as={A}
                        class="extend-touch-target shadow-none"
                        href={next().href}
                        title={next().title}
                        variant="secondary"
                      >
                        {next().title}
                        <IconArrowRight />
                      </Button>
                    )}
                  </Show>
                </div>
              </article>
            </div>
            <div class="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
              <div class="h-(--top-spacing) shrink-0" />
              <TableOfContents />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
