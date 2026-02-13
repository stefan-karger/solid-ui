import { createSignal, onMount, onCleanup } from "solid-js"

import { Progress } from "~/registry/ui/progress"

export default function ProgressDemo() {
  const [progress, setProgress] = createSignal(0)

  onMount(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 10
      })
    }, 500)

    onCleanup(() => clearInterval(timer))
  })

  return <Progress value={progress()} class="w-[60%]" />
}
