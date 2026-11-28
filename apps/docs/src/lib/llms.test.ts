import { describe, expect, it } from "vitest"

import { formatLlmsFull, formatLlmsIndex, type LlmsPage } from "~/lib/llms"

const page = (id: string, title: string): LlmsPage => ({
  id,
  data: { title, description: `About ${title}.` }
})

// Collection order, which the files must not depend on.
const pages = [
  page("components/tabs.mdx", "Tabs"),
  page("ai-elements/chat.mdx", "Chat"),
  page("cli.mdx", "CLI"),
  page("components/button.mdx", "Button"),
  page("ai-elements.mdx", "AI Elements"),
  page("installation/vite.mdx", "Vite"),
  page("components/index.mdx", "Components"),
  page("index.mdx", "Introduction"),
  page("installation.mdx", "Installation")
]
const site = "https://www.solid-ui.com"

describe("llms.txt", () => {
  it("links every page's Markdown in docs navigation order", () => {
    const index = formatLlmsIndex(pages, site)
    expect(index.startsWith("# Solid UI\n\n> About Introduction.\n\n")).toBe(
      true
    )
    expect(index).toContain(
      "(https://www.solid-ui.com/llms-full.txt) has every page in one file."
    )
    expect(index.slice(index.indexOf("## "))).toBe(`## Docs

- [Introduction](https://www.solid-ui.com/docs.md): About Introduction.
- [Installation](https://www.solid-ui.com/docs/installation.md): About Installation.
- [CLI](https://www.solid-ui.com/docs/cli.md): About CLI.
- [Components](https://www.solid-ui.com/docs/components.md): About Components.
- [AI Elements](https://www.solid-ui.com/docs/ai-elements.md): About AI Elements.

## Installation

- [Vite](https://www.solid-ui.com/docs/installation/vite.md): About Vite.

## Components

- [Button](https://www.solid-ui.com/docs/components/button.md): About Button.
- [Tabs](https://www.solid-ui.com/docs/components/tabs.md): About Tabs.

## AI Elements

- [Chat](https://www.solid-ui.com/docs/ai-elements/chat.md): About Chat.
`)
  })

  it("collects every page body in the same order", () => {
    const full = formatLlmsFull(
      pages.map((entry) => ({
        page: entry,
        body: `\nBody of ${entry.data.title}.\n`
      })),
      site
    )
    const titles = Array.from(full.matchAll(/^# (.+)$/gm), ([, title]) => title)
    expect(titles).toEqual([
      "Solid UI: full documentation",
      "Introduction",
      "Installation",
      "CLI",
      "Components",
      "AI Elements",
      "Vite",
      "Button",
      "Tabs",
      "Chat"
    ])
    expect(full).toContain(`# Button

Source: https://www.solid-ui.com/docs/components/button.md

> About Button.

Body of Button.

# Tabs`)
  })
})
