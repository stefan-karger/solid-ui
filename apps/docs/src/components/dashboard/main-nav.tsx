import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export function MainNav(props: ComponentProps<"nav">) {
  const [, rest] = splitProps(props, ["class"])
  return (
    <nav class={cn("flex items-center space-x-4 lg:space-x-6", props.class)} {...rest}>
      <a
        href="/examples/dashboard"
        class="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </a>
      <a
        href="/examples/dashboard"
        class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </a>
      <a
        href="/examples/dashboard"
        class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </a>
      <a
        href="/examples/dashboard"
        class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </a>
    </nav>
  )
}
