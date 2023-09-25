import type { Component, ComponentProps } from "solid-js"
import { mergeProps, onMount, createEffect, on, onCleanup, splitProps } from "solid-js"

import type {
  ChartComponent,
  ChartData,
  ChartItem,
  ChartType,
  ChartTypeRegistry,
  TooltipModel
} from "chart.js"
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
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Tooltip
} from "chart.js"

import { cn } from "~/lib/utils"

export interface TypedChartProps extends ComponentProps<"div"> {
  data: ChartData
  showLegend?: boolean
}

export interface ChartProps extends TypedChartProps {
  type: ChartType
}

const registerMap: { [key in ChartType]: ChartComponent[] } = {
  bar: [BarController, BarElement, CategoryScale, LinearScale],
  bubble: [BubbleController, PointElement, LinearScale],
  doughnut: [DoughnutController, ArcElement],
  line: [LineController, LineElement, PointElement, CategoryScale, LinearScale],
  pie: [PieController, ArcElement],
  polarArea: [PolarAreaController, ArcElement, RadialLinearScale],
  radar: [RadarController, LineElement, PointElement, RadialLinearScale],
  scatter: [ScatterController, PointElement, LinearScale]
}

function showTooltip(context: { chart: Chart; tooltip: TooltipModel<keyof ChartTypeRegistry> }) {
  let el = document.getElementById("chartjs-tooltip")
  if (!el) {
    el = document.createElement("div")
    el.id = "chartjs-tooltip"
    document.body.appendChild(el)
  }

  const model = context.tooltip
  if (model.opacity === 0 || !model.body) {
    el.style.opacity = "0"
    return
  }

  el.className = `p-2 bg-card text-card-foreground rounded-lg border shadow-sm text-sm ${
    model.yAlign ?? `no-transform`
  }`

  let content = ""

  model.title.forEach((title) => {
    content += `<h3 class="font-semibold leading-none tracking-tight">${title}</h3>`
  })

  content += `<div class="mt-1 text-muted-foreground">`
  const body = model.body.flatMap((body) => body.lines)
  body.forEach((line, i) => {
    const colors = model.labelColors[i]
    content += `
        <div class="flex items-center">
          <span class="inline-block h-2 w-2 mr-1 rounded-full border" style="background: ${colors.backgroundColor}; border-color: ${colors.borderColor}"></span>
          ${line}
        </div>`
  })
  content += `</div>`

  el.innerHTML = content

  const pos = context.chart.canvas.getBoundingClientRect()
  el.style.opacity = "1"
  el.style.position = "absolute"
  el.style.left = `${pos.left + window.scrollX + model.caretX}px`
  el.style.top = `${pos.top + window.scrollY + model.caretY}px`
  el.style.pointerEvents = "none"
}

const BaseChart: Component<ChartProps> = (rawProps) => {
  Chart.register(Colors, Filler, Legend, Tooltip, ...registerMap[rawProps.type])

  const props = mergeProps({ showLegend: true }, rawProps)
  const [, rest] = splitProps(props, ["class", "type", "data", "showLegend"])

  let ref: HTMLCanvasElement
  let chart: Chart

  const init = () => {
    const ctx = ref!.getContext("2d") as ChartItem
    chart = new Chart(ctx, {
      type: props.type,
      data: props.data,
      options: {
        responsive: true,
        plugins: {
          legend: !props.showLegend
            ? { display: false }
            : {
                display: true,
                align: "end",
                labels: {
                  usePointStyle: true,
                  boxWidth: 6,
                  boxHeight: 6,
                  color: "hsl(240, 3.8%, 46.1%)",
                  font: { size: 14 }
                }
              },
          tooltip: {
            enabled: false,
            external: (context) => showTooltip(context)
          }
        }
      }
    })
  }

  onMount(() => init())

  createEffect(
    on(
      () => props.data,
      () => {
        chart.data = props.data
        chart.update()
      },
      { defer: true }
    )
  )

  onCleanup(() => chart?.destroy())

  return (
    <div class={cn("max-w-full", props.class)} {...rest}>
      <canvas ref={ref!} />
    </div>
  )
}

function createTypedChart(type: ChartType): Component<TypedChartProps> {
  return (props) => <BaseChart type={type} {...props} />
}

const BarChart = createTypedChart("bar")
const BubbleChart = createTypedChart("bubble")
const DonutChart = createTypedChart("doughnut")
const LineChart = createTypedChart("line")
const PieChart = createTypedChart("pie")
const PolarAreaChart = createTypedChart("polarArea")
const RadarChart = createTypedChart("radar")
const ScatterChart = createTypedChart("scatter")

export {
  BaseChart as Chart,
  BarChart,
  BubbleChart,
  DonutChart,
  LineChart,
  PieChart,
  PolarAreaChart,
  RadarChart,
  ScatterChart
}