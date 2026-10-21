import { createSignal } from "solid-js"

import { Label } from "~/registry/ui/label"
import { Slider } from "~/registry/ui/slider"

export default function SliderControlled() {
  const [value, setValue] = createSignal([0.3, 0.7])

  return (
    <div class="mx-auto grid w-full max-w-xs gap-3">
      <div class="flex items-center justify-between gap-2">
        <Label for="slider-demo-temperature">Temperature</Label>
        <span class="text-muted-foreground text-sm">{value().join(", ")}</span>
      </div>
      <Slider
        id="slider-demo-temperature"
        maxValue={1}
        minValue={0}
        onChange={(nextValue) => setValue(nextValue)}
        step={0.1}
        value={value()}
      />
    </div>
  )
}
