import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "~/lib/utils";

export function MainNav(props: ComponentProps<"nav">) {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <nav
      class={cn("flex items-center space-x-4 lg:space-x-6", props.class)}
      {...rest}
    >
      <a
        class="font-medium text-sm transition-colors hover:text-primary"
        href="/examples/dashboard"
      >
        Overview
      </a>
      <a
        class="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
        href="/examples/dashboard"
      >
        Customers
      </a>
      <a
        class="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
        href="/examples/dashboard"
      >
        Products
      </a>
      <a
        class="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
        href="/examples/dashboard"
      >
        Settings
      </a>
    </nav>
  );
}
