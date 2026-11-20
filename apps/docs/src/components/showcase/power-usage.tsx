import { For } from "solid-js"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import { Separator } from "~/registry/ui/separator"

const chartData = [
  { hour: "6a", usage: 1.2 },
  { hour: "8a", usage: 2.8 },
  { hour: "10a", usage: 3.1 },
  { hour: "12p", usage: 2.4 },
  { hour: "2p", usage: 3.4 },
  { hour: "4p", usage: 2.9 },
  { hour: "6p", usage: 3.8 },
  { hour: "8p", usage: 3.2 }
]

export function PowerUsage() {
  const maxUsage = Math.max(...chartData.map((item) => item.usage))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Power Usage</CardTitle>
        <CardDescription>Whole Home</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div
          class="flex h-[140px] w-full items-end gap-2"
          role="img"
          aria-label="Power usage by hour"
        >
          <For each={chartData}>
            {(item) => (
              <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
                <div
                  class="min-h-2 rounded-t bg-primary"
                  style={{ height: `${(item.usage / maxUsage) * 100}%` }}
                />
                <span class="text-center text-xs text-muted-foreground">{item.hour}</span>
              </div>
            )}
          </For>
        </div>
        <Separator />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-0.5">
            <span class="text-sm text-muted-foreground">Currently Using</span>
            <span class="text-lg font-semibold tabular-nums">3.4 kW</span>
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="text-sm text-muted-foreground">Solar Gen</span>
            <span class="text-lg font-semibold tabular-nums">+1.2 kW</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
