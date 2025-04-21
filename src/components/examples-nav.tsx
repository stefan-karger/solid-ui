import { useLocation } from "@solidjs/router";
import type { ComponentProps } from "solid-js";
import { For, Show, splitProps } from "solid-js";

import { cn } from "~/lib/utils";

import { IconArrowRight } from "./icons";

const examples = [
  {
    code: "https://github.com/stefan-karger/solid-ui/tree/main/apps/docs/src/components/mail",
    href: "/examples/mail",
    name: "Mail",
  },
  {
    code: "https://github.com/stefan-karger/solid-ui/tree/main/apps/docs/src/components/dashboard",
    href: "/examples/dashboard",
    name: "Dashboard",
  },
  {
    code: "https://github.com/stefan-karger/solid-ui/tree/main/apps/docs/src/components/cards",
    href: "/examples/cards",
    name: "Cards",
  },
  {
    code: "https://github.com/stefan-karger/solid-ui/tree/main/apps/docs/src/routes/(app)/examples/tasks",
    href: "/examples/tasks",
    name: "Tasks",
  },
  {
    code: "https://github.com/stefan-karger/solid-ui/tree/main/apps/docs/src/components/authentication",
    href: "/examples/authentication",
    name: "Authentication",
  },
];

export function ExamplesNav(props: ComponentProps<"div">) {
  const [, rest] = splitProps(props, ["class"]);
  const location = useLocation();
  const pathname = () =>
    location.pathname === "/" ? "/examples/mail" : location.pathname;
  const example = () =>
    examples.find((example) => pathname().startsWith(example.href));

  return (
    <div class="relative">
      <div class={cn("mb-4 flex items-center", props.class)} {...rest}>
        <For each={examples}>
          {(example, idx) => (
            <a
              class={cn(
                "flex h-7 items-center justify-center rounded-md px-4 text-center text-sm transition-colors hover:text-primary",
                location.pathname?.startsWith(example.href) ||
                  (location.pathname === "/" && idx() === 0)
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground",
              )}
              href={example.href}
            >
              {example.name}
            </a>
          )}
        </For>
      </div>
      <Show when={example()}>
        {(example) => (
          <a
            class="absolute top-0 right-0 hidden items-center rounded-[0.5rem] font-medium text-sm md:flex"
            href={example().code}
            rel="noreferrer nofollow"
            target="_blank"
          >
            View code
            <IconArrowRight class="ml-1 size-4" />
          </a>
        )}
      </Show>
    </div>
  );
}
