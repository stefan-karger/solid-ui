import type { Component, ComponentProps, JSX } from "solid-js";
import {
  createContext,
  createMemo,
  createUniqueId,
  For,
  mergeProps,
  Show,
  splitProps,
  useContext,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  type DefaultLegendContentProps,
  Legend,
  type LegendPayload,
  ResponsiveContainer,
  type ResponsiveContainerProps,
  Tooltip,
  type TooltipContentProps,
  type TooltipPayloadEntry,
} from "solid-recharts";
import { cn } from "~/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = Record<
  string,
  {
    label?: JSX.Element;
    icon?: Component;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextValue>();

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

export type ChartContainerProps = Omit<ComponentProps<"div">, "children"> & {
  config: ChartConfig;
  children: ResponsiveContainerProps["children"];
  initialDimension?: ResponsiveContainerProps["initialDimension"];
};

function ChartContainer(props: ChartContainerProps) {
  const uniqueId = createUniqueId();
  const [local, others] = splitProps(props, [
    "id",
    "class",
    "children",
    "config",
    "initialDimension",
  ]);
  const chartId = () => `chart-${local.id ?? uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider
      value={{
        get config() {
          return local.config;
        },
      }}
    >
      <div
        data-slot="chart"
        data-chart={chartId()}
        class={cn(
          "cn-chart flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          local.class,
        )}
        {...others}
      >
        <ChartStyle id={chartId()} config={local.config} />
        {/* A fixed default initial size leaves unclaimed chart nodes during SSR hydration. */}
        <ResponsiveContainer initialDimension={local.initialDimension}>
          {local.children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

type ChartStyleProps = {
  id: string;
  config: ChartConfig;
};

function ChartStyle(props: ChartStyleProps) {
  const css = createMemo(() => {
    const colorConfig = Object.entries(props.config).filter(
      ([, itemConfig]) => itemConfig.theme ?? itemConfig.color,
    );

    if (!colorConfig.length) {
      return "";
    }

    return Object.entries(THEMES)
      .map(
        ([theme, prefix]) => `
${prefix} [data-chart=${props.id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`,
      )
      .join("\n");
  });

  return (
    <Show when={css()}>
      <style>{css()}</style>
    </Show>
  );
}

// Use function-form custom content so Solid Recharts can inject the active payload props.
const ChartTooltip = Tooltip;

export type ChartTooltipContentProps = Partial<TooltipContentProps> &
  Omit<ComponentProps<"div">, keyof TooltipContentProps> & {
    color?: string;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  };

function ChartTooltipContent(props: ChartTooltipContentProps) {
  const chart = useChart();
  const mergedProps = mergeProps(
    {
      indicator: "dot" as const,
      hideLabel: false,
      hideIndicator: false,
    },
    props,
  );
  const payload = createMemo(() => mergedProps.payload ?? []);
  const visiblePayload = createMemo(() =>
    payload().filter((item) => item.type !== "none"),
  );
  const nestLabel = () =>
    payload().length === 1 && mergedProps.indicator !== "dot";

  const labelValue = () => {
    const [item] = payload();
    const key = String(
      mergedProps.labelKey ?? item?.dataKey ?? item?.name ?? "value",
    );
    const itemConfig = getPayloadConfigFromPayload(chart.config, item, key);

    return !mergedProps.labelKey && typeof mergedProps.label === "string"
      ? (chart.config[mergedProps.label]?.label ?? mergedProps.label)
      : itemConfig?.label;
  };

  const TooltipLabel = () => (
    <Show when={!mergedProps.hideLabel && payload().length > 0}>
      <Show
        when={mergedProps.labelFormatter}
        fallback={
          <Show when={labelValue()}>
            <div class={cn("font-medium", mergedProps.labelClass)}>
              {labelValue()}
            </div>
          </Show>
        }
      >
        {(labelFormatter) => (
          <div class={cn("font-medium", mergedProps.labelClass)}>
            {labelFormatter()(labelValue(), payload())}
          </div>
        )}
      </Show>
    </Show>
  );

  const TooltipRow = (rowProps: {
    item: TooltipPayloadEntry;
    index: number;
  }) => {
    const itemConfig = () => {
      const key = String(
        mergedProps.nameKey ??
          rowProps.item.name ??
          rowProps.item.dataKey ??
          "value",
      );
      return getPayloadConfigFromPayload(chart.config, rowProps.item, key);
    };
    const indicatorColor = () => {
      const dataPoint = rowProps.item.payload;
      const fill =
        isRecord(dataPoint) && typeof dataPoint.fill === "string"
          ? dataPoint.fill
          : undefined;

      return mergedProps.color ?? fill ?? rowProps.item.color;
    };

    return (
      <div
        class={cn(
          "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
          mergedProps.indicator === "dot" && "items-center",
        )}
      >
        <Show
          when={
            mergedProps.formatter &&
            rowProps.item.value !== undefined &&
            rowProps.item.name
              ? mergedProps.formatter
              : undefined
          }
          fallback={
            <>
              <Show
                when={itemConfig()?.icon}
                fallback={
                  <Show when={!mergedProps.hideIndicator}>
                    <div
                      class={cn(
                        "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                        mergedProps.indicator === "dot" && "h-2.5 w-2.5",
                        mergedProps.indicator === "line" && "w-1",
                        mergedProps.indicator === "dashed" &&
                          "w-0 border-[1.5px] border-dashed bg-transparent",
                        nestLabel() &&
                          mergedProps.indicator === "dashed" &&
                          "my-0.5",
                      )}
                      style={{
                        "--color-bg": indicatorColor(),
                        "--color-border": indicatorColor(),
                      }}
                    />
                  </Show>
                }
              >
                {(icon) => <Dynamic component={icon()} />}
              </Show>
              <div
                class={cn(
                  "flex flex-1 justify-between leading-none",
                  nestLabel() ? "items-end" : "items-center",
                )}
              >
                <div class="grid gap-1.5">
                  <Show when={nestLabel()}>
                    <TooltipLabel />
                  </Show>
                  <span class="text-muted-foreground">
                    {itemConfig()?.label ?? rowProps.item.name}
                  </span>
                </div>
                <Show when={rowProps.item.value != null}>
                  <span class="font-mono font-medium text-foreground tabular-nums">
                    {typeof rowProps.item.value === "number"
                      ? rowProps.item.value.toLocaleString()
                      : String(rowProps.item.value)}
                  </span>
                </Show>
              </div>
            </>
          }
        >
          {(formatter) => (
            <>
              {formatter()(
                rowProps.item.value,
                rowProps.item.name,
                rowProps.item,
                rowProps.index,
                // Solid Recharts exposes the complete tooltip payload as the fifth argument.
                payload(),
              )}
            </>
          )}
        </Show>
      </div>
    );
  };

  return (
    <Show when={mergedProps.active && payload().length > 0}>
      <div
        class={cn(
          "cn-chart-tooltip grid min-w-32 items-start",
          mergedProps.class,
        )}
        style={mergedProps.style}
      >
        <Show when={!nestLabel()}>
          <TooltipLabel />
        </Show>
        <div class="grid gap-1.5">
          <For each={visiblePayload()}>
            {(item, index) => <TooltipRow item={item} index={index()} />}
          </For>
        </div>
      </div>
    </Show>
  );
}

// Legend custom content follows the same function-form contract as tooltip content.
const ChartLegend = Legend;

export type ChartLegendContentProps = DefaultLegendContentProps &
  Omit<ComponentProps<"div">, keyof DefaultLegendContentProps> & {
    hideIcon?: boolean;
    nameKey?: string;
    payload?: ReadonlyArray<LegendPayload>;
    verticalAlign?: "top" | "middle" | "bottom";
  };

function ChartLegendContent(props: ChartLegendContentProps) {
  const chart = useChart();
  const visiblePayload = createMemo(() =>
    (props.payload ?? []).filter((item) => item.type !== "none"),
  );

  const LegendItem = (itemProps: { item: LegendPayload }) => {
    const itemConfig = () => {
      const key = String(props.nameKey ?? itemProps.item.dataKey ?? "value");
      return getPayloadConfigFromPayload(chart.config, itemProps.item, key);
    };

    return (
      <div class="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground">
        <Show
          when={props.hideIcon ? undefined : itemConfig()?.icon}
          fallback={
            <div
              class="h-2 w-2 shrink-0 rounded-[2px]"
              style={{ "background-color": itemProps.item.color }}
            />
          }
        >
          {(icon) => <Dynamic component={icon()} />}
        </Show>
        {itemConfig()?.label}
      </div>
    );
  };

  return (
    <Show when={visiblePayload().length > 0}>
      <div
        class={cn(
          "flex items-center justify-center gap-4",
          props.verticalAlign === "top" ? "pb-3" : "pt-3",
          props.class,
        )}
        style={props.style}
      >
        <For each={visiblePayload()}>
          {(item) => <LegendItem item={item} />}
        </For>
      </div>
    </Show>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (!isRecord(payload)) {
    return undefined;
  }

  const nestedPayload = isRecord(payload.payload) ? payload.payload : undefined;
  let configLabelKey = key;

  if (typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (typeof nestedPayload?.[key] === "string") {
    configLabelKey = nestedPayload[key];
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
};
