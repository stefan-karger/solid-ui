import type { ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as ProgressPrimitive from "@kobalte/core/progress"

import { cn } from "~/lib/utils"

type ProgressProps<T extends ValidComponent = "div"> = ProgressPrimitive.ProgressRootProps<T> & {
  class?: string | undefined
}

const Progress = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ProgressProps<T>>
) => {
  const [local, others] = splitProps(props as ProgressProps, ["class", "value"])

  return (
    <ProgressPrimitive.Root
      class={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", local.class)}
      data-slot="progress"
      value={local.value}
      {...others}
    >
      <ProgressPrimitive.Track class="h-full w-full">
        <ProgressPrimitive.Fill
          class="h-full bg-primary transition-transform duration-500 ease-in-out"
          data-slot="progress-indicator"
          style={{
            transform: `translateX(-${100 - (local.value ?? 0)}%)`
          }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
