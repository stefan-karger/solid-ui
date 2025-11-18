import { type ComponentProps, For, splitProps } from "solid-js"
import { A } from "@solidjs/router"

import { docsConfig } from "~/config/docs"
import { cn } from "~/lib/utils"
import { Button } from "~/registry/v1/ui/button"

export function MainNav(props: ComponentProps<"nav">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <nav class={cn("items-center", local.class)} {...others}>
      <For each={docsConfig.mainNav}>
        {(item) => (
          <Button as={A} href={item.href} size="sm" variant="ghost">
            {item.title}
          </Button>
        )}
      </For>
    </nav>
  )
}
