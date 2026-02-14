import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import {
  BarChart,
  type ChartConfig,
  ChartContainer,
  DoughnutChart,
  LineChart
} from "~/registry/ui/chart"

const lineConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--primary))" },
  mobile: { label: "Mobile", color: "hsl(var(--muted-foreground))" }
}

const barConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  expenses: { label: "Expenses", color: "hsl(var(--muted-foreground))" }
}

const doughnutConfig: ChartConfig = {
  chrome: { label: "Chrome", color: "hsl(221 83% 53%)" },
  safari: { label: "Safari", color: "hsl(262 83% 58%)" },
  firefox: { label: "Firefox", color: "hsl(142 71% 45%)" },
  edge: { label: "Edge", color: "hsl(25 95% 53%)" },
  other: { label: "Other", color: "hsl(0 84% 60%)" }
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

export default function ChartDemo() {
  return (
    <div class="grid w-full max-w-4xl gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription>Visitors over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineConfig}>
            <LineChart
              data={{
                labels: months,
                datasets: [
                  {
                    label: "Desktop",
                    data: [186, 305, 237, 173, 209, 214],
                    borderColor: lineConfig.desktop.color,
                    backgroundColor: lineConfig.desktop.color,
                    tension: 0.3,
                    pointRadius: 4
                  },
                  {
                    label: "Mobile",
                    data: [80, 200, 120, 190, 130, 140],
                    borderColor: lineConfig.mobile.color,
                    backgroundColor: lineConfig.mobile.color,
                    tension: 0.3,
                    pointRadius: 4
                  }
                ]
              }}
            />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>Revenue vs Expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barConfig}>
            <BarChart
              data={{
                labels: months,
                datasets: [
                  {
                    label: "Revenue",
                    data: [4500, 3800, 5200, 4100, 4800, 5100],
                    backgroundColor: barConfig.revenue.color,
                    borderRadius: 4
                  },
                  {
                    label: "Expenses",
                    data: [2800, 2600, 3100, 2900, 3200, 2700],
                    backgroundColor: barConfig.expenses.color,
                    borderRadius: 4
                  }
                ]
              }}
            />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card class="md:col-span-2">
        <CardHeader>
          <CardTitle>Doughnut Chart</CardTitle>
          <CardDescription>Browser market share</CardDescription>
        </CardHeader>
        <CardContent class="flex justify-center">
          <ChartContainer class="max-h-[280px] max-w-[280px]" config={doughnutConfig}>
            <DoughnutChart
              data={{
                labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
                datasets: [
                  {
                    data: [63, 19, 8, 5, 5],
                    backgroundColor: [
                      doughnutConfig.chrome.color!,
                      doughnutConfig.safari.color!,
                      doughnutConfig.firefox.color!,
                      doughnutConfig.edge.color!,
                      doughnutConfig.other.color!
                    ],
                    borderWidth: 0
                  }
                ]
              }}
              options={{
                plugins: {
                  legend: {
                    position: "bottom"
                  }
                }
              }}
            />
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
