import { Card, CardContent, CardHeader, CardTitle } from "@/registry/ui/card"
import { BarChart } from "@/registry/ui/charts"

export default function BarChartDemo() {
  const chartData = {
    labels: ["Amphibians", "Birds", "Crustaceans", "Ferns", "Arachnids", "Corals", "Algae"],
    datasets: [
      {
        label: "Number of threatened species",
        data: [2488, 1445, 734, 281, 251, 232, 98]
      }
    ]
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent class="h-64 w-[500px] max-w-full">
        <BarChart data={chartData} />
      </CardContent>
    </Card>
  )
}
