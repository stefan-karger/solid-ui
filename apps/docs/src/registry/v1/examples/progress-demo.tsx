import { createEffect, createSignal } from "solid-js"

import { Progress } from "~/registry/v1/ui/progress"

export default function ProgressDemo() {
  const [progress, setProgress] = createSignal(13)

  createEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  })

  return <Progress class="w-[60%]" value={progress()} />
}
