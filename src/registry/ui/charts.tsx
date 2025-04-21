import type { Ref } from "@solid-primitives/refs";
import { mergeRefs } from "@solid-primitives/refs";
import type {
  ChartComponent,
  ChartData,
  ChartItem,
  ChartOptions,
  Plugin as ChartPlugin,
  ChartType,
  ChartTypeRegistry,
  TooltipModel,
} from "chart.js";
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Colors,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Tooltip,
} from "chart.js";
import type { Component } from "solid-js";
import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  onMount,
} from "solid-js";
import { unwrap } from "solid-js/store";

type TypedChartProps = {
  data: ChartData;
  options?: ChartOptions;
  plugins?: ChartPlugin[];
  ref?: Ref<HTMLCanvasElement | null>;
  width?: number | undefined;
  height?: number | undefined;
};

type ChartProps = TypedChartProps & {
  type: ChartType;
};

type ChartContext = {
  chart: Chart;
  tooltip: TooltipModel<keyof ChartTypeRegistry>;
};

const BaseChart: Component<ChartProps> = (rawProps) => {
  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement | null>();
  const [chart, setChart] = createSignal<Chart>();

  const props = mergeProps(
    {
      height: 512,
      options: { responsive: true } as ChartOptions,
      plugins: [] as ChartPlugin[],
      width: 512,
    },
    rawProps,
  );

  const init = () => {
    const ctx = canvasRef()?.getContext("2d") as ChartItem;
    const config = unwrap(props);
    const chart = new Chart(ctx, {
      data: config.data,
      options: config.options,
      plugins: config.plugins,
      type: config.type,
    });
    setChart(chart);
  };

  onMount(() => init());

  createEffect(
    on(
      () => props.data,
      () => {
        chart()!.data = props.data;
        chart()!.update();
      },
      { defer: true },
    ),
  );

  createEffect(
    on(
      () => props.options,
      () => {
        chart()!.options = props.options;
        chart()!.update();
      },
      { defer: true },
    ),
  );

  createEffect(
    on(
      [() => props.width, () => props.height],
      () => {
        chart()!.resize(props.width, props.height);
      },
      { defer: true },
    ),
  );

  createEffect(
    on(
      () => props.type,
      () => {
        const dimensions = [chart()!.width, chart()!.height];
        chart()!.destroy();
        init();
        chart()!.resize(...dimensions);
      },
      { defer: true },
    ),
  );

  onCleanup(() => {
    chart()?.destroy();
    mergeRefs(props.ref, null);
  });

  Chart.register(Colors, Filler, Legend, Tooltip);
  return (
    <canvas
      height={props.height}
      ref={mergeRefs(props.ref, (el) => setCanvasRef(el))}
      width={props.width}
    />
  );
};

function showTooltip(context: ChartContext) {
  let el = document.getElementById("chartjs-tooltip");
  if (!el) {
    el = document.createElement("div");
    el.id = "chartjs-tooltip";
    document.body.appendChild(el);
  }

  const model = context.tooltip;
  if (model.opacity === 0 || !model.body) {
    el.style.opacity = "0";
    return;
  }

  el.className = `p-2 bg-card text-card-foreground rounded-lg border shadow-sm text-sm ${
    model.yAlign ?? `no-transform`
  }`;

  let content = "";

  model.title.forEach((title) => {
    content += `<h3 class="font-semibold leading-none tracking-tight">${title}</h3>`;
  });

  content += `<div class="mt-1 text-muted-foreground">`;
  const body = model.body.flatMap((body) => body.lines);
  body.forEach((line, i) => {
    const colors = model.labelColors[i];
    content += `
        <div class="flex items-center">
          <span class="inline-block h-2 w-2 mr-1 rounded-full border" style="background: ${colors.backgroundColor}; border-color: ${colors.borderColor}"></span>
          ${line}
        </div>`;
  });
  content += `</div>`;

  el.innerHTML = content;

  const pos = context.chart.canvas.getBoundingClientRect();
  el.style.opacity = "1";
  el.style.position = "absolute";
  el.style.left = `${pos.left + window.scrollX + model.caretX}px`;
  el.style.top = `${pos.top + window.scrollY + model.caretY}px`;
  el.style.pointerEvents = "none";
}

function createTypedChart(
  type: ChartType,
  components: ChartComponent[],
): Component<TypedChartProps> {
  const chartsWithScales: ChartType[] = ["bar", "line", "scatter"];
  const chartsWithLegends: ChartType[] = ["bar", "line"];

  const options: ChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: chartsWithLegends.includes(type)
        ? {
            align: "end",
            display: true,
            labels: {
              boxHeight: 6,
              boxWidth: 6,
              color: "hsl(240, 3.8%, 46.1%)",
              font: { size: 14 },
              usePointStyle: true,
            },
          }
        : { display: false },
      tooltip: {
        enabled: false,
        external: (context) => showTooltip(context),
      },
    },
    responsive: true,
    scales: chartsWithScales.includes(type)
      ? {
          x: {
            border: { display: false },
            grid: { display: false },
          },
          y: {
            border: {
              dash: [3],
              dashOffset: 3,
              display: false,
            },
            grid: {
              color: "hsla(240, 3.8%, 46.1%, 0.4)",
            },
          },
        }
      : {},
  };

  Chart.register(...components);
  return (props) => <BaseChart options={options} type={type} {...props} />;
}

const BarChart = /* #__PURE__ */ createTypedChart("bar", [
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
]);
const BubbleChart = /* #__PURE__ */ createTypedChart("bubble", [
  BubbleController,
  PointElement,
  LinearScale,
]);
const DonutChart = /* #__PURE__ */ createTypedChart("doughnut", [
  DoughnutController,
  ArcElement,
]);
const LineChart = /* #__PURE__ */ createTypedChart("line", [
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
]);
const PieChart = /* #__PURE__ */ createTypedChart("pie", [
  PieController,
  ArcElement,
]);
const PolarAreaChart = /* #__PURE__ */ createTypedChart("polarArea", [
  PolarAreaController,
  ArcElement,
  RadialLinearScale,
]);
const RadarChart = /* #__PURE__ */ createTypedChart("radar", [
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
]);
const ScatterChart = /* #__PURE__ */ createTypedChart("scatter", [
  ScatterController,
  PointElement,
  LinearScale,
]);

export {
  BaseChart as Chart,
  BarChart,
  BubbleChart,
  DonutChart,
  LineChart,
  PieChart,
  PolarAreaChart,
  RadarChart,
  ScatterChart,
};
