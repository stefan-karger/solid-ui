import { createSignal } from "solid-js"

import { Progress } from "~/registry/ui/progress"
import { Slider } from "~/registry/ui/slider"

export default function ProgressControlled() {
  const [value, setValue] = createSignal([50])

  return (
    <div class="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value().length ? value()[0] : 0} class="w-full" />
      <Slider
        value={value()}
        onChange={setValue}
        minValue={0}
        maxValue={100}
        step={1}
      />
    </div>
  )
}
