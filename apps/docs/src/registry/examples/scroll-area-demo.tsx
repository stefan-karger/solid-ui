import { For } from "solid-js"

import { ScrollArea, ScrollBar } from "~/registry/ui/scroll-area"
import { Separator } from "~/registry/ui/separator"

const tags = [
  "Authentication",
  "Authorization",
  "Billing",
  "Database",
  "Deployment",
  "Email",
  "Hosting",
  "Monitoring",
  "Notifications",
  "Payment",
  "Security",
  "Storage",
  "Testing",
  "Webhooks"
]

export default function ScrollAreaDemo() {
  return (
    <ScrollArea class="h-72 w-48 rounded-lg border">
      <div class="p-4">
        <h4 class="mb-4 font-medium text-sm leading-none">Tags</h4>
        <For each={tags}>
          {(tag, index) => (
            <>
              <div class="text-sm">{tag}</div>
              {index() < tags.length - 1 && <Separator class="my-2" />}
            </>
          )}
        </For>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  )
}
