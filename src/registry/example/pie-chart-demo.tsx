import { Card, CardContent, CardHeader, CardTitle } from "~/registry/ui/card";
import { PieChart } from "~/registry/ui/charts";

export default function PieChartDemo() {
  const chartData = {
    datasets: [
      {
        data: [9800, 4567, 3908, 2400, 1908, 1398],
      },
    ],
    labels: [
      "New York",
      "London",
      "Hong Kong",
      "San Francisco",
      "Singapore",
      "Zurich",
    ],
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent class="size-[200px]">
        <PieChart data={chartData} />
      </CardContent>
    </Card>
  );
}
