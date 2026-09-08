import { createSignal } from "solid-js"

import { Label } from "~/registry/ui/label"
import { Slider } from "~/registry/ui/slider"

export default function SliderControlled() {
  const [value, setValue] = createSignal([30, 70])

  return (
    <div class="mx-auto grid w-full max-w-xs gap-3">
      <div class="flex items-center justify-between gap-2">
        <Label for="slider-demo-temperature">Temperature</Label>
        <span class="text-sm text-muted-foreground">
          {value()[0]}°C - {value()[1]}°C
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value()}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
      />
    </div>
  )
}
