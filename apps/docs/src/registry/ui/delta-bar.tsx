import { type ComponentProps } from "@solidjs/web"
import { merge, omit, Show } from "solid-js"

import { cn } from "~/lib/utils"

type DeltaBarProps = ComponentProps<"div"> & {
  value: number
  isIncreasePositive?: boolean
}

const DeltaBar = (rawProps: DeltaBarProps) => {
  const local = merge({ isIncreasePositive: true }, rawProps)
  const others = omit(rawProps, "class", "isIncreasePositive", "value")
  const value = () => Math.max(-100, Math.min(100, local.value))
  const width = () => `${Math.abs(value())}%`
  const tone = () => {
    if (value() === 0) return undefined
    return (value() > 0 && local.isIncreasePositive) ||
      (value() < 0 && !local.isIncreasePositive)
      ? "positive"
      : "negative"
  }
  const indicatorToneClass = () =>
    tone() === "positive"
      ? "bg-green-500 dark:bg-green-400"
      : "bg-red-500 dark:bg-red-400"
  return (
    <div
      class={cn("cn-delta-bar relative flex w-full items-center", local.class)}
      data-slot="delta-bar"
      role="meter"
      {...others}
    >
      <div class="flex h-full w-1/2 justify-end" data-slot="delta-bar-decrease">
        <Show when={value() < 0}>
          <div
            class={cn(
              "cn-delta-bar-indicator-decrease h-full",
              indicatorToneClass()
            )}
            data-side="decrease"
            data-slot="delta-bar-indicator"
            data-tone={tone()}
            style={{ width: width() }}
          />
        </Show>
      </div>
      <div
        class={cn(
          "cn-delta-bar-marker z-10",
          value() === 0 ? "bg-muted" : indicatorToneClass()
        )}
        data-slot="delta-bar-marker"
        data-tone={tone()}
      />
      <div
        class="flex h-full w-1/2 justify-start"
        data-slot="delta-bar-increase"
      >
        <Show when={value() > 0}>
          <div
            class={cn(
              "cn-delta-bar-indicator-increase h-full",
              indicatorToneClass()
            )}
            data-side="increase"
            data-slot="delta-bar-indicator"
            data-tone={tone()}
            style={{ width: width() }}
          />
        </Show>
      </div>
    </div>
  )
}

export { DeltaBar, type DeltaBarProps }
