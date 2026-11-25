// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { createSignal, For, onCleanup, onSettled, Show } from "solid-js"

import { copyToClipboard } from "~/lib/clipboard"
import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

const menuItems: { icon: string; label: string; service?: string }[] = [
  { icon: "markdown", label: "View as Markdown" },
  {
    icon: "chatgpt",
    label: "Open in ChatGPT",
    service: "https://chatgpt.com/"
  },
  { icon: "claude", label: "Open in Claude", service: "https://claude.ai/new" },
  { icon: "scira", label: "Open in Scira", service: "https://scira.ai/" }
]

function promptUrl(service: string, pageUrl: string) {
  const url = new URL(service)
  url.searchParams.set(
    "q",
    `I’m looking at this Solid UI documentation: ${pageUrl}. Help me understand how to use it. Explain concepts, give examples, or help debug based on this page.`
  )
  return url.href
}

export default function DocsCopyPage(props: {
  markdown: string
  pagePath: string
}) {
  const [origin, setOrigin] = createSignal("")
  const [status, setStatus] = createSignal("")
  let resetTimer: ReturnType<typeof setTimeout> | undefined

  onSettled(() => {
    setOrigin(window.location.origin)
  })
  onCleanup(() => clearTimeout(resetTimer))

  async function copyPage() {
    const copied = await copyToClipboard(props.markdown)
    clearTimeout(resetTimer)
    setStatus(copied ? "Page copied" : "Could not copy page")
    resetTimer = setTimeout(() => setStatus(""), 2000)
  }

  return (
    <>
      <ButtonGroup class="relative rounded-lg bg-secondary">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          class="h-8 shadow-none md:h-7 md:text-[0.8rem]"
          onClick={copyPage}
        >
          <Show
            when={status() === "Page copied"}
            fallback={
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
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            }
          >
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
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </Show>
          Copy Page
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Copy Page options"
            render={(part) => (
              <Button
                {...part}
                variant="secondary"
                size="icon-sm"
                class="size-8 shadow-none md:size-7"
              />
            )}
          >
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-max rounded-lg shadow-none">
            <For each={menuItems}>
              {(item) => (
                <DropdownMenuItem
                  render={(part) => (
                    <a
                      {...part}
                      href={
                        item.service
                          ? promptUrl(
                              item.service,
                              `${origin()}${props.pagePath}`
                            )
                          : `${props.pagePath}.md`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  )}
                >
                  <svg
                    class="size-4 text-muted-foreground"
                    fill="none"
                    aria-hidden="true"
                  >
                    <use href={`/docs-copy-icons.svg#${item.icon}`} />
                  </svg>
                  {item.label}
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
        <span
          aria-hidden="true"
          class="pointer-events-none absolute inset-y-1.5 right-8 w-px bg-foreground/10 md:right-7"
        />
      </ButtonGroup>
      <span class="sr-only" role="status">
        {status()}
      </span>
    </>
  )
}
