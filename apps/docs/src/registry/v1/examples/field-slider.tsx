import { createSignal } from "solid-js"

import { Field, FieldDescription, FieldTitle } from "~/registry/v1/ui/field"
import { Slider } from "~/registry/v1/ui/slider"

export default function FieldSlider() {
  const [values, setValues] = createSignal([200, 800])
  return (
    <div class="w-full max-w-md">
      <Field>
        <FieldTitle>Price Range</FieldTitle>
        <FieldDescription>
          Set your budget range ($
          <span class="font-medium tabular-nums">{values()[0]}</span> -{" "}
          <span class="font-medium tabular-nums">{values()[1]}</span>).
        </FieldDescription>
        <Slider
          aria-label="Price Range"
          class="mt-2 w-full"
          maxValue={1000}
          minValue={0}
          onChange={setValues}
          step={10}
          value={values()}
        />
      </Field>
    </div>
  )
}
