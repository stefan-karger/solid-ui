import { For } from "solid-js"

import { Card, CardContent, CardFooter, CardHeader } from "~/registry/ui/card"
import { Skeleton } from "~/registry/ui/skeleton"

const rows = [0, 1]

export function SavingsTargets() {
  return (
    <Card>
      <CardHeader class="gap-2">
        <Skeleton class="h-5 w-36 rounded-md" />
        <div class="flex flex-col gap-1.5">
          <Skeleton class="h-4 w-full max-w-64 rounded-md" />
          <Skeleton class="h-4 w-48 rounded-md" />
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-3">
          <For each={rows}>
            {() => (
              <div class="flex flex-col gap-3 rounded-xl bg-muted p-4">
                <Skeleton class="h-3 w-24 rounded-md bg-muted-foreground/15" />
                <Skeleton class="h-8 w-36 rounded-md bg-muted-foreground/15" />
                <Skeleton class="h-2 w-full rounded-full bg-muted-foreground/15" />
                <div class="flex items-center justify-between">
                  <Skeleton class="h-3 w-24 rounded-md bg-muted-foreground/15" />
                  <Skeleton class="h-3 w-20 rounded-md bg-muted-foreground/15" />
                </div>
              </div>
            )}
          </For>
        </div>
      </CardContent>
      <CardFooter class="justify-center">
        <Skeleton class="h-3 w-56 rounded-md" />
      </CardFooter>
    </Card>
  )
}
