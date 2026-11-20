import { createSignal } from "solid-js"

import { Progress } from "~/registry/ui/progress"
import { Slider } from "~/registry/ui/slider"

export default function ProgressControlled() {
  const [value, setValue] = createSignal([50])

  return (
    <div class="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value()[0] ?? 0} class="w-full" />
      <Slider
        max={100}
        min={0}
        onValueChange={setValue}
        step={1}
        value={value()}
      />
    </div>
  )
}
