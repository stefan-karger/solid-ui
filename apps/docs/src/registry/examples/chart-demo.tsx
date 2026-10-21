import { createSignal, For } from "solid-js"

import { Bar, BarChart, CartesianGrid, XAxis } from "solid-recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "~/registry/ui/chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 }
]

const chartConfig = {
  views: { label: "Page Views" },
  desktop: { label: "Desktop", color: "var(--chart-2)" },
  mobile: { label: "Mobile", color: "var(--chart-1)" }
} satisfies ChartConfig

type SeriesKey = "desktop" | "mobile"

const totals = {
  desktop: chartData.reduce((sum, item) => sum + item.desktop, 0),
  mobile: chartData.reduce((sum, item) => sum + item.mobile, 0)
}

export default function ChartDemo() {
  const [activeChart, setActiveChart] = createSignal<SeriesKey>("desktop")

  return (
    <Card class="w-full py-0 pb-4">
      <CardHeader class="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div class="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors for the last month</CardDescription>
        </div>
        <div class="flex">
          <For each={["desktop", "mobile"] as const}>
            {(chart) => (
              <button
                aria-pressed={activeChart() === chart}
                class="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                data-active={String(activeChart() === chart)}
                onClick={() => setActiveChart(chart)}
                type="button"
              >
                <span class="text-muted-foreground text-xs">{chartConfig[chart].label}</span>
                <span class="font-bold text-lg leading-none sm:text-3xl">
                  {totals[chart].toLocaleString()}
                </span>
              </button>
            )}
          </For>
        </div>
      </CardHeader>
      <CardContent class="px-2 sm:p-6">
        <ChartContainer class="aspect-auto h-[250px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(String(value)).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                })
              }
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={(props) => (
                <ChartTooltipContent
                  {...props}
                  class="w-[150px]"
                  labelFormatter={(value) =>
                    new Date(String(value)).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  }
                  nameKey="views"
                />
              )}
            />
            <Bar dataKey={activeChart()} fill={`var(--color-${activeChart()})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
