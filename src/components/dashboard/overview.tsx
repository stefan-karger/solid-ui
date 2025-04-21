import { BarChart } from "~/registry/ui/charts";

export function Overview() {
  const chartData = {
    datasets: [
      {
        data: [
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
          Math.floor(Math.random() * 5000) + 1000,
        ],
        label: "Sales",
      },
    ],
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  return (
    <div class="h-[350px] w-full">
      <BarChart data={chartData} />
    </div>
  );
}
