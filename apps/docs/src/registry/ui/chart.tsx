import type { Component, ComponentProps, JSX } from "solid-js"
import {
  createContext,
  createEffect,
  mergeProps,
  onCleanup,
  splitProps,
  useContext
} from "solid-js"

import type { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js"
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartJSTooltip,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  RadarController,
  RadialLinearScale,
  ScatterController
} from "chart.js"

import { cn } from "~/lib/utils"

ChartJS.register(
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  RadarController,
  RadialLinearScale,
  ScatterController,
  ChartJSTooltip
)

// ---------------------------------------------------------------------------
// Chart config types
// ---------------------------------------------------------------------------

export type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
    icon?: Component
  }
>

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type ChartContextValue = {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextValue>({ config: {} })

function useChart() {
  return useContext(ChartContext)
}

// ---------------------------------------------------------------------------
// CSS variables helper
// ---------------------------------------------------------------------------

function chartConfigToCssVars(config: ChartConfig): Record<string, string> {
  const vars: Record<string, string> = {}
  let index = 0
  for (const [, value] of Object.entries(config)) {
    if (value.color) {
      vars[`--chart-${index + 1}`] = value.color
    }
    index++
  }
  return vars
}

// ---------------------------------------------------------------------------
// ChartContainer
// ---------------------------------------------------------------------------

type ChartContainerProps = ComponentProps<"div"> & {
  config: ChartConfig
  children: JSX.Element
}

const ChartContainer: Component<ChartContainerProps> = (rawProps) => {
  const [local, others] = splitProps(rawProps, ["class", "children", "config", "style"])

  const cssVars = () => chartConfigToCssVars(local.config)

  return (
    <ChartContext.Provider value={{ config: local.config }}>
      <div
        class={cn(
          "flex aspect-video justify-center text-xs [&_canvas]:max-h-[inherit] [&_canvas]:max-w-full",
          local.class
        )}
        data-slot="chart"
        style={{
          ...(typeof local.style === "object" ? local.style : {}),
          ...cssVars()
        }}
        {...others}
      >
        {local.children}
      </div>
    </ChartContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Core Chart component
// ---------------------------------------------------------------------------

type ChartProps<T extends ChartType = ChartType> = ComponentProps<"canvas"> & {
  type: T
  data: ChartData<T>
  options?: ChartOptions<T>
}

function Chart<T extends ChartType = ChartType>(rawProps: ChartProps<T>) {
  const props = mergeProps({ options: {} as ChartOptions<T> }, rawProps)
  const [local, others] = splitProps(props, ["type", "data", "options", "class"])

  let canvasRef!: HTMLCanvasElement
  let chartInstance: ChartJS | undefined

  const resolvedOptions = (): ChartOptions<T> => {
    const base: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom" as const,
          labels: {
            usePointStyle: true,
            padding: 16
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: "hsl(var(--popover))",
          titleColor: "hsl(var(--popover-foreground))",
          bodyColor: "hsl(var(--popover-foreground))",
          borderColor: "hsl(var(--border))",
          borderWidth: 1,
          cornerRadius: 6,
          padding: 8,
          boxPadding: 4
        }
      }
    }

    return mergeChartOptions(base, local.options ?? {}) as ChartOptions<T>
  }

  createEffect(() => {
    const type = local.type
    const data = local.data
    const options = resolvedOptions()

    if (chartInstance) {
      chartInstance.data = data as ChartData
      chartInstance.options = options as ChartOptions
      chartInstance.update()
    } else if (canvasRef) {
      chartInstance = new ChartJS(canvasRef, {
        type,
        data: data as ChartData,
        options: options as ChartOptions
      } as ChartConfiguration)
    }
  })

  onCleanup(() => {
    chartInstance?.destroy()
    chartInstance = undefined
  })

  return (
    <canvas
      class={cn(local.class)}
      data-slot="chart-canvas"
      ref={canvasRef!}
      role="img"
      {...others}
    />
  )
}

// ---------------------------------------------------------------------------
// Convenience chart components
// ---------------------------------------------------------------------------

type TypedChartProps<T extends ChartType> = Omit<ChartProps<T>, "type">

const LineChart: Component<TypedChartProps<"line">> = (props) => {
  return <Chart type="line" {...props} />
}

const BarChart: Component<TypedChartProps<"bar">> = (props) => {
  return <Chart type="bar" {...props} />
}

const PieChart: Component<TypedChartProps<"pie">> = (props) => {
  return <Chart type="pie" {...props} />
}

const DoughnutChart: Component<TypedChartProps<"doughnut">> = (props) => {
  return <Chart type="doughnut" {...props} />
}

const RadarChart: Component<TypedChartProps<"radar">> = (props) => {
  return <Chart type="radar" {...props} />
}

const ScatterChart: Component<TypedChartProps<"scatter">> = (props) => {
  return <Chart type="scatter" {...props} />
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mergeChartOptions(
  base: Record<string, any>,
  override: Record<string, any>
): Record<string, any> {
  const result = { ...base }
  for (const key of Object.keys(override)) {
    if (
      override[key] &&
      typeof override[key] === "object" &&
      !Array.isArray(override[key]) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      result[key] = mergeChartOptions(base[key], override[key])
    } else {
      result[key] = override[key]
    }
  }
  return result
}

export {
  Chart,
  ChartContainer,
  LineChart,
  BarChart,
  PieChart,
  DoughnutChart,
  RadarChart,
  ScatterChart,
  useChart,
  type ChartProps
}
