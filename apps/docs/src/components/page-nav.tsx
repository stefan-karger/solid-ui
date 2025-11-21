import type { ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

export function PageNav(props: ComponentProps<"div">) {
  return (
    <div class={cn("container-wrapper scroll-mt-24", props.class)} {...props}>
      <div class="container flex items-center justify-between gap-4 py-4">{props.children}</div>
    </div>
  )
}
