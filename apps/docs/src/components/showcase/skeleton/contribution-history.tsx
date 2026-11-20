import { For } from "solid-js"

import { Card, CardContent, CardFooter, CardHeader } from "~/registry/ui/card"
import { Skeleton } from "~/registry/ui/skeleton"

const bars = [60, 80, 65, 95, 50, 100]

export function ContributionHistory() {
  return (
    <Card>
      <CardHeader class="gap-2">
        <Skeleton class="h-5 w-44 rounded-md" />
        <Skeleton class="h-4 w-52 rounded-md" />
      </CardHeader>
      <CardContent>
        <div class="flex h-[200px] w-full items-end gap-3">
          <For each={bars}>
            {(height) => (
              <div class="flex h-full flex-1 flex-col justify-end gap-2">
                <Skeleton
                  class="w-full rounded-t-md rounded-b-none"
                  style={{ height: `${height}%` }}
                />
                <Skeleton class="mx-auto h-3 w-6 rounded-md" />
              </div>
            )}
          </For>
        </div>
      </CardContent>
      <CardContent>
        <div class="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
          <div class="flex flex-col gap-2 rounded-xl bg-muted p-4">
            <Skeleton class="h-3 w-20 rounded-md bg-muted-foreground/15" />
            <Skeleton class="h-5 w-28 rounded-md bg-muted-foreground/15" />
            <Skeleton class="h-3 w-24 rounded-md bg-muted-foreground/15" />
          </div>
          <div class="hidden flex-col gap-2 rounded-xl bg-muted p-4 xl:flex">
            <Skeleton class="h-3 w-24 rounded-md bg-muted-foreground/15" />
            <Skeleton class="h-5 w-32 rounded-md bg-muted-foreground/15" />
            <Skeleton class="h-3 w-28 rounded-md bg-muted-foreground/15" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton class="h-9 w-full rounded-lg" />
      </CardFooter>
    </Card>
  )
}
