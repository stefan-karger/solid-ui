import { For } from "solid-js"

import { Card, CardAction, CardContent, CardHeader } from "~/registry/ui/card"
import { Skeleton } from "~/registry/ui/skeleton"

const rows = [0, 1, 2, 3]
const miniBars = [40, 60, 80, 50]

export function DividendIncome() {
  return (
    <Card>
      <CardHeader class="gap-2">
        <Skeleton class="h-5 w-48 rounded-md" />
        <Skeleton class="h-4 w-64 rounded-md" />
        <CardAction>
          <Skeleton class="size-8 rounded-md" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-2">
          <For each={rows}>
            {() => (
              <div class="flex items-center gap-3 rounded-xl bg-muted p-3">
                <div class="flex flex-1 flex-col gap-2">
                  <Skeleton class="h-4 w-28 rounded-md bg-muted-foreground/15" />
                  <Skeleton class="h-3 w-20 rounded-md bg-muted-foreground/15" />
                </div>
                <div class="hidden h-8 w-24 items-end gap-1 md:flex">
                  <For each={miniBars}>
                    {(height) => (
                      <Skeleton
                        class="flex-1 rounded-t-sm rounded-b-none bg-muted-foreground/15"
                        style={{ height: `${height}%` }}
                      />
                    )}
                  </For>
                </div>
                <Skeleton class="hidden h-4 w-16 rounded-md bg-muted-foreground/15 md:block" />
              </div>
            )}
          </For>
        </div>
      </CardContent>
    </Card>
  )
}
