import { createSignal, Show } from "solid-js"
import { A } from "@solidjs/router"

import { Index } from "@/__registry__"
import { Button } from "@/registry/ui/button"
import { Resizable, ResizableHandle, ResizablePanel } from "@/registry/ui/resizable"
import { Separator } from "@/registry/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

import { IconDesktop, IconFullscreen, IconMobile, IconTablet } from "./icons"

export function BlockDisplay(props: { name: string }) {
  const [sizes, setSizes] = createSignal<number[]>([1, 0])

  return (
    <Show when={Index[props.name]}>
      {(item) => (
        <div id={item().name} class="relative grid w-full scroll-m-20 gap-4">
          <div class="flex h-7 w-full items-center justify-between">
            <Button
              as={A}
              href={`#${item().name}`}
              variant="link"
              class="whitespace-normal px-1 md:px-2"
            >
              {item().description}
            </Button>
            <div class="flex items-center gap-2 md:pr-[14px]">
              <div class="hidden h-7 items-center gap-1 rounded-md border p-[2px] shadow-none lg:flex">
                <ToggleGroup
                  defaultValue="100"
                  onChange={(value) => {
                    const size = parseInt(value ?? "") / 100
                    setSizes([size, 1 - size])
                  }}
                >
                  <ToggleGroupItem value="100" class="size-[22px] rounded-sm p-0" title="Desktop">
                    <IconDesktop class="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="60" class="size-[22px] rounded-sm p-0" title="Tablet">
                    <IconTablet class="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="30" class="size-[22px] rounded-sm p-0" title="Mobile">
                    <IconMobile class="size-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <Separator orientation="vertical" class="h-4" />
                <Button
                  as={A}
                  variant="ghost"
                  href={`/blocks/${item().name}`}
                  target="_blank"
                  class="size-[22px] rounded-sm p-0"
                >
                  <span class="sr-only">Open in New Tab</span>
                  <IconFullscreen class="size-3.5" />
                </Button>
              </div>
              <Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
              <Button
                as={A}
                aria-label="View block source code"
                href={`https://github.com/stefan-karger/solid-ui/tree/main/apps/docs/src/registry/block/${item().name}`}
                target="_blank"
                class="h-7 px-0 text-xs"
                variant="link"
              >
                View source
              </Button>
            </div>
          </div>
          <Resizable sizes={sizes()} onSizesChange={setSizes}>
            <ResizablePanel
              initialSize={1}
              minSize={0.3}
              class="relative aspect-[4/2.5] overflow-hidden rounded-xl border bg-background md:aspect-auto"
            >
              <iframe
                src={`/blocks/${item().name}`}
                class="relative z-20 hidden h-[800px] w-full bg-background md:block"
              />
            </ResizablePanel>
            <ResizableHandle class="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-x-px after:-translate-y-1/2 after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
            <ResizablePanel initialSize={0} class="overflow-hidden" />
          </Resizable>
        </div>
      )}
    </Show>
  )
}
