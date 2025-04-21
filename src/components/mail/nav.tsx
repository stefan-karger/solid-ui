import type { Component } from "solid-js";
import { For, Show } from "solid-js";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/registry/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: Component;
    variant: "default" | "ghost";
  }[];
}

export function Nav(props: NavProps) {
  return (
    <div
      class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      data-collapsed={props.isCollapsed}
    >
      <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <For each={props.links}>
          {(item) => {
            const Icon = item.icon;
            return (
              <Show
                fallback={
                  <a
                    class={cn(
                      buttonVariants({
                        class: "text-sm",
                        size: "sm",
                        variant: item.variant,
                      }),
                      item.variant === "default" &&
                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      "justify-start",
                    )}
                    // biome-ignore lint/a11y/useValidAnchor: <this is valid as W3C recommends>
                    href="#"
                  >
                    <div class="mr-2">
                      <Icon />
                    </div>
                    {item.title}
                    {item.label && (
                      <span
                        class={cn(
                          "ml-auto",
                          item.variant === "default" &&
                            "text-background dark:text-white",
                        )}
                      >
                        {item.label}
                      </span>
                    )}
                  </a>
                }
                when={props.isCollapsed}
              >
                <Tooltip closeDelay={0} openDelay={0} placement="right">
                  <TooltipTrigger
                    as="a"
                    class={cn(
                      buttonVariants({ size: "icon", variant: item.variant }),
                      "size-9",
                      item.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    )}
                    href="#"
                  >
                    <Icon />
                    <span class="sr-only">{item.title}</span>
                  </TooltipTrigger>
                  <TooltipContent class="flex items-center gap-4">
                    {item.title}
                    <Show when={item.label}>
                      <span class="ml-auto text-muted-foreground">
                        {item.label}
                      </span>
                    </Show>
                  </TooltipContent>
                </Tooltip>
              </Show>
            );
          }}
        </For>
      </nav>
    </div>
  );
}
