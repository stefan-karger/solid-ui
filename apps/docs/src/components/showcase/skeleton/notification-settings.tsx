import { For } from "solid-js"

import { Card, CardContent, CardFooter, CardHeader } from "~/registry/ui/card"
import { Skeleton } from "~/registry/ui/skeleton"

const rows = [0, 1, 2, 3]

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader class="gap-2">
        <Skeleton class="h-5 w-32 rounded-md" />
        <Skeleton class="h-4 w-64 rounded-md" />
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <For each={rows}>
          {() => (
            <div class="flex items-start gap-3">
              <Skeleton class="size-4 rounded-sm" />
              <div class="flex flex-1 flex-col gap-2">
                <Skeleton class="h-4 w-40 rounded-md" />
                <Skeleton class="h-3 w-56 rounded-md" />
              </div>
            </div>
          )}
        </For>
      </CardContent>
      <CardFooter>
        <Skeleton class="h-9 w-full rounded-lg" />
      </CardFooter>
    </Card>
  )
}
