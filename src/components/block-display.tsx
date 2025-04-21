import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

import { Index } from "~/__registry__";
import { Button } from "~/registry/ui/button";
import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "~/registry/ui/resizable";
import { Separator } from "~/registry/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group";

import { IconDesktop, IconFullscreen, IconMobile, IconTablet } from "./icons";

export function BlockDisplay(props: { name: string }) {
  const [sizes, setSizes] = createSignal<number[]>([1, 0]);

  return (
    <Show when={Index[props.name]}>
      {(item) => (
        <div class="relative grid w-full scroll-m-20 gap-4" id={item().name}>
          <div class="flex h-7 w-full items-center justify-between">
            <Button
              as={A}
              class="whitespace-normal px-1 md:px-2"
              href={`#${item().name}`}
              variant="link"
            >
              {item().description}
            </Button>
            <div class="flex items-center gap-2 md:pr-[14px]">
              <div class="hidden h-7 items-center gap-1 rounded-md border p-[2px] shadow-none lg:flex">
                <ToggleGroup
                  defaultValue="100"
                  onChange={(value) => {
                    const size = parseInt(value ?? "") / 100;
                    setSizes([size, 1 - size]);
                  }}
                >
                  <ToggleGroupItem
                    class="size-[22px] rounded-sm p-0"
                    title="Desktop"
                    value="100"
                  >
                    <IconDesktop class="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    class="size-[22px] rounded-sm p-0"
                    title="Tablet"
                    value="60"
                  >
                    <IconTablet class="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    class="size-[22px] rounded-sm p-0"
                    title="Mobile"
                    value="30"
                  >
                    <IconMobile class="size-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <Separator class="h-4" orientation="vertical" />
                <Button
                  as={A}
                  class="size-[22px] rounded-sm p-0"
                  href={`/blocks/${item().name}`}
                  target="_blank"
                  variant="ghost"
                >
                  <span class="sr-only">Open in New Tab</span>
                  <IconFullscreen class="size-3.5" />
                </Button>
              </div>
              <Separator
                class="mx-2 hidden h-4 md:flex"
                orientation="vertical"
              />
              <Button
                aria-label="View block source code"
                as={A}
                class="h-7 px-0 text-xs"
                href={`https://github.com/stefan-karger/solid-ui/tree/main/apps/docs/src/registry/block/${item().name}`}
                target="_blank"
                variant="link"
              >
                View source
              </Button>
            </div>
          </div>
          <Resizable onSizesChange={setSizes} sizes={sizes()}>
            <ResizablePanel
              class="relative aspect-[4/2.5] overflow-hidden rounded-xl border bg-background md:aspect-auto"
              initialSize={1}
              minSize={0.3}
            >
              <iframe
                class="relative z-20 hidden h-[800px] w-full bg-background md:block"
                src={`/blocks/${item().name}`}
                title={`${item().name} block`}
              />
            </ResizablePanel>
            <ResizableHandle class="after:-translate-x-px after:-translate-y-1/2 relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
            <ResizablePanel class="overflow-hidden" initialSize={0} />
          </Resizable>
        </div>
      )}
    </Show>
  );
}
