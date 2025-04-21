import { useLocation } from "@solidjs/router";
import { For, Match, Switch } from "solid-js";

import { docsConfig } from "~/config/docs";
import { cn } from "~/lib/utils";
import { Badge } from "~/registry/ui/badge";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-border/40 border-r md:sticky md:block dark:border-border">
      <div class="relative h-full overflow-y-auto py-6 pr-6">
        <For each={docsConfig.sidebarNav}>
          {(category) => (
            <div class="pb-4">
              <h4 class="mb-1 rounded-md px-2 py-1 font-semibold text-sm">
                {category.title}
              </h4>
              <div class="grid grid-flow-row auto-rows-max text-sm">
                <For each={category.items}>
                  {(link) => (
                    <a
                      class={cn(
                        "group flex w-full items-center rounded-md border border-transparent px-2 py-1 no-underline hover:underline",
                        link.href === location.pathname
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                      href={link.href}
                    >
                      <span>{link.title}</span>
                      <Switch>
                        <Match when={link.status === "new"}>
                          <Badge class="ml-2" variant="success">
                            new
                          </Badge>
                        </Match>
                        <Match when={link.status === "updated"}>
                          <Badge class="ml-2" variant="secondary">
                            updated
                          </Badge>
                        </Match>
                      </Switch>
                    </a>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </aside>
  );
}
