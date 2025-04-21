import { Card, CardContent, CardHeader, CardTitle } from "~/registry/ui/card";
import { LineChart } from "~/registry/ui/charts";

export default function AreaChartDemo() {
  const chartData = {
    datasets: [
      {
        data: [
          2890, 2756, 3322, 3470, 3475, 3129, 3490, 2903, 2643, 2837, 2954,
          3239,
        ],
        fill: true,
        label: "SemiAnalysis",
      },
      {
        data: [
          2338, 2103, 2194, 2108, 1812, 1726, 1982, 2012, 2342, 2473, 3848,
          3736,
        ],
        fill: true,
        label: "The Pragmatic Engineer",
      },
    ],
    labels: [
      "Jan 22",
      "Feb 22",
      "Mar 22",
      "Apr 22",
      "May 22",
      "Jun 22",
      "Jul 22",
      "Aug 22",
      "Sep 22",
      "Oct 22",
      "Nov 22",
      "Dec 22",
    ],
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter revenue over time (USD)</CardTitle>
      </CardHeader>
      <CardContent class="h-64 w-[500px] max-w-full">
        <LineChart data={chartData} />
      </CardContent>
    </Card>
  );
}
