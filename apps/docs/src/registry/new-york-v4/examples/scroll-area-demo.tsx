import { For } from "solid-js"

import { ScrollArea } from "~/registry/new-york-v4/ui/scroll-area"
import { Separator } from "~/registry/new-york-v4/ui/separator"

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

export default function ScrollAreaDemo() {
  return (
    <ScrollArea class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 font-medium text-sm leading-none">Tags</h4>
        <For each={tags}>
          {(tag) => (
            <>
              <div class="text-sm">{tag}</div>
              <Separator class="my-2" />
            </>
          )}
        </For>
      </div>
    </ScrollArea>
  )
}
