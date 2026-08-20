import { Bar, BarChart, CartesianGrid, XAxis } from "solid-recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "~/registry/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
]

const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" }
} satisfies ChartConfig

export default function ChartExampleTooltip() {
  return (
    <ChartContainer class="min-h-[200px] w-full" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickFormatter={(value) => String(value).slice(0, 3)}
          tickLine={false}
          tickMargin={10}
        />
        <ChartTooltip content={(props) => <ChartTooltipContent {...props} />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
