import { createSignal } from "solid-js"

import { Progress } from "~/registry/ui/progress"
import { Slider } from "~/registry/ui/slider"

export default function ProgressControlled() {
  const [value, setValue] = createSignal([50])

  return (
    <div class="flex w-full max-w-sm flex-col gap-4">
      <Progress class="w-full" value={value().length ? value()[0] : 0} />
      <Slider maxValue={100} minValue={0} onChange={setValue} step={1} value={value()} />
    </div>
  )
}
