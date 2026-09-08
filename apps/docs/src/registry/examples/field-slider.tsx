import { createSignal } from "solid-js"

import { Field, FieldDescription, FieldTitle } from "~/registry/ui/field"
import { Slider } from "~/registry/ui/slider"

export default function FieldSlider() {
  const [value, setValue] = createSignal([200, 800])

  return (
    <div class="w-full max-w-md">
      <Field>
        <FieldTitle>Price Range</FieldTitle>
        <FieldDescription>
          Set your budget range ($<span class="font-medium tabular-nums">{value()[0]}</span> -{" "}
          <span class="font-medium tabular-nums">{value()[1]}</span>).
        </FieldDescription>
        <Slider
          aria-label="Price Range"
          class="mt-2 w-full"
          max={1000}
          min={0}
          onChange={setValue}
          step={10}
          value={value()}
        />
      </Field>
    </div>
  )
}
