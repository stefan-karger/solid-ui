import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as SliderPrimitive from "@kobalte/core/slider"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { createMemo, For, merge, omit, untrack } from "solid-js"

import { cn } from "~/lib/utils"

type SliderProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  Omit<SliderPrimitive.SliderRootProps<T>, "minValue" | "maxValue">
> &
  Pick<ComponentProps<T>, "class"> & {
    min?: number
    max?: number
  }

const Slider = <T extends ValidComponent = "div">(rawProps: SliderProps<T>) => {
  const local = merge(
    {
      defaultValue: [50],
      min: 0,
      max: 100,
      step: 1,
      orientation: "horizontal" as const
    },
    rawProps
  ) as SliderProps
  const others = omit(
    rawProps as SliderProps,
    "class",
    "value",
    "defaultValue",
    "min",
    "max",
    "orientation",
    "step"
  )
  const thumbs = createMemo(() => {
    if (Array.isArray(untrack(() => local.value))) return untrack(() => local.value)
    if (Array.isArray(local.defaultValue)) return local.defaultValue
    return [local.min]
  })
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      class={cn(
        "cn-slider relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col",
        local.class
      )}
      {...(local.value === undefined ? {} : { value: local.value })}
      {...(local.defaultValue === undefined ? {} : { defaultValue: local.defaultValue })}
      minValue={local.min ?? 0}
      maxValue={local.max ?? 100}
      orientation={local.orientation ?? "horizontal"}
      step={local.step ?? 1}
      {...others}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        class="cn-slider-track relative grow overflow-hidden"
      >
        <SliderPrimitive.Fill
          data-slot="slider-range"
          class="cn-slider-range absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      <For each={thumbs()}>
        {() => (
          <SliderPrimitive.Thumb data-slot="slider-thumb" class="cn-slider-thumb block">
            <SliderPrimitive.Input />
          </SliderPrimitive.Thumb>
        )}
      </For>
    </SliderPrimitive.Root>
  )
}

export { Slider, type SliderProps }
