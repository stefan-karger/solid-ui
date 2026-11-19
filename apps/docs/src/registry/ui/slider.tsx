import type { ComponentProps } from "@solidjs/web"
import {
  Slider as SdkSlider,
  SliderTrack as SdkSliderTrack,
  SliderIndicator as SdkSliderIndicator,
  SliderThumb as SdkSliderThumb,
  SliderControl as SdkSliderControl
} from "@ui-sdk/solid/slider"
import { createMemo, For, merge } from "solid-js"

import { cn } from "~/lib/utils"
type SliderProps = Omit<ComponentProps<typeof SdkSlider<number[]>>, "class"> & { class?: string }
const Slider = (props: SliderProps) => {
  const local = merge({ min: 0, max: 100, defaultValue: [50] }, props)

  const thumbCount = createMemo(() => (local.value ?? local.defaultValue).length)
  return (
    <SdkSlider<number[]>
      defaultValue={local.defaultValue}
      min={local.min}
      max={local.max}
      {...props}
      class={cn(
        "w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto",
        props.class
      )}
    >
      <SdkSliderControl class="cn-slider relative flex w-full touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50">
        <SdkSliderTrack class="cn-slider-track relative grow select-none">
          <SdkSliderIndicator class="cn-slider-range data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
          <For each={Array.from({ length: thumbCount() }, (_, index) => index)}>
            {(index) => (
              <SdkSliderThumb
                index={index}
                aria-label={`Value ${index + 1}`}
                class="cn-slider-thumb block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
              />
            )}
          </For>
        </SdkSliderTrack>
      </SdkSliderControl>
    </SdkSlider>
  )
}
export { Slider, type SliderProps }
