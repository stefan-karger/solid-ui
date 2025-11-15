import { For, Show } from "solid-js"
import { A } from "@solidjs/router"

import { docsConfig } from "~/config/docs"

export function ComponentsList() {
  const components = docsConfig.sidebarNav.find((category) => category.title === "Components")

  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
      <For each={components?.items}>
        {(item) => (
          <A
            class="inline-flex items-center gap-2 font-medium text-lg underline-offset-4 hover:underline md:text-base"
            href={item.href}
          >
            {item.title}
            <Show when={item.status === "new"}>
              <span class="flex size-2 rounded-full bg-blue-500" title="New" />
            </Show>
          </A>
        )}
      </For>
    </div>
  )
}
