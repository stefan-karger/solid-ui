import type { ComponentProps, JSX } from "solid-js"
import { For, mergeProps, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"

import { cn } from "@/lib/utils"

type Bar<T> = T & {
  value: number
  name: JSX.Element
  icon?: (props: ComponentProps<"svg">) => JSX.Element
  href?: string
  target?: string
}

type SortOrder = "ascending" | "descending" | "none"

type ValueFormatter = (value: number) => string

const defaultValueFormatter: ValueFormatter = (value: number) => value.toString()

type BarListProps<T> = ComponentProps<"div"> & {
  data: Bar<T>[]
  valueFormatter?: ValueFormatter
  sortOrder?: SortOrder
}

const BarList = <T,>(rawProps: BarListProps<T>) => {
  const props = mergeProps(
    {
      valueFormatter: defaultValueFormatter,
      sortOrder: "descending" as SortOrder
    },
    rawProps
  )
  const [local, others] = splitProps(props, ["class", "data", "valueFormatter", "sortOrder"])

  const sortedData = () => {
    if (local.sortOrder === "none") {
      return local.data
    }
    return local.data.sort((a, b) =>
      local.sortOrder === "ascending" ? a.value - b.value : b.value - a.value
    )
  }

  const widths = () => {
    const maxValue = Math.max(...sortedData().map((item) => item.value), 0)
    return sortedData().map((item) =>
      item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2)
    )
  }

  return (
    <div
      class={cn("flex flex-col space-y-1.5", local.class)}
      aria-sort={local.sortOrder}
      {...others}
    >
      <For each={sortedData()}>
        {(bar, idx) => {
          return (
            <div class="row flex w-full justify-between space-x-6">
              <div class="grow">
                <div
                  class={cn("flex h-8 items-center rounded-md bg-secondary px-2")}
                  style={{
                    width: `${widths()[idx()]}%`
                  }}
                >
                  <Show when={bar.icon}>
                    {(icon) => <Dynamic component={icon()} class="mr-2 size-5 flex-none" />}
                  </Show>
                  <Show when={bar.href} fallback={<p>{bar.name}</p>}>
                    {(href) => (
                      <a
                        href={href()}
                        target={bar.target ?? "_blank"}
                        rel="noreferrer"
                        class="hover:underline"
                      >
                        {bar.name}
                      </a>
                    )}
                  </Show>
                </div>
              </div>
              <div class="flex items-center">{local.valueFormatter(bar.value)}</div>
            </div>
          )
        }}
      </For>
    </div>
  )
}

export { BarList }
