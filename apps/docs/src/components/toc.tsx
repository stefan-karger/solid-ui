import { For, type Component } from "solid-js"

import { useLocation } from "@solidjs/router"

import { cn } from "~/lib/utils"

type TOC = {
  depth: number
  text: string
  slug: string
}

export const TableOfContents: Component<{ toc: TOC[] | undefined }> = (props) => {
  const location = useLocation()

  return (
    <aside class="space-y-2">
      <p class="font-medium">On This Page</p>
      <ul class="m-0 list-none">
        <For each={props.toc}>
          {(heading) => (
            <li class={cn("mt-0 pt-2", heading.depth === 3 && "pl-4")}>
              <a
                class="inline-block text-muted-foreground no-underline transition-colors hover:text-foreground"
                href={`${location.pathname}#${heading.slug}`}
              >
                {heading.text}
              </a>
            </li>
          )}
        </For>
      </ul>
    </aside>
  )
}
