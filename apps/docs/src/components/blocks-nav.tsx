import { For } from "solid-js"
import { A, useLocation } from "@solidjs/router"

import { registryCategories } from "~/lib/categories"
import { ScrollArea, ScrollBar } from "~/registry/v1/ui/scroll-area"

export function BlocksNav() {
  const location = useLocation()

  return (
    <div class="relative overflow-hidden">
      <ScrollArea class="max-w-none">
        <div class="flex items-center">
          <BlocksNavLink
            category={{ name: "Featured", slug: "", hidden: false }}
            isActive={location.pathname === "/blocks"}
          />
          <For each={registryCategories}>
            {(category) => (
              <BlocksNavLink
                category={category}
                isActive={location.pathname === `/blocks/${category.slug}`}
              />
            )}
          </For>
        </div>
        <ScrollBar class="invisible" orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

function BlocksNavLink(props: {
  category: (typeof registryCategories)[number]
  isActive: boolean
}) {
  if (props.category.hidden) {
    return null
  }

  return (
    <A
      class="flex h-7 items-center justify-center px-4 text-center font-medium text-base text-muted-foreground transition-colors hover:text-primary data-[active=true]:text-primary"
      data-active={props.isActive}
      href={`/blocks/${props.category.slug}`}
    >
      {props.category.name}
    </A>
  )
}
