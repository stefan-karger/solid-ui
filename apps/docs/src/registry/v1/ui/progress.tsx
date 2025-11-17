import type { Component, JSX, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as ProgressPrimitive from "@kobalte/core/progress"

import { Label } from "~/registry/v1/ui/label"

type ProgressRootProps<T extends ValidComponent = "div"> =
  ProgressPrimitive.ProgressRootProps<T> & { children?: JSX.Element }

const Progress = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ProgressRootProps<T>>
) => {
  const [local, others] = splitProps(props as ProgressRootProps, ["children"])
  return (
    <ProgressPrimitive.Root data-slot="progress" {...others}>
      {local.children}
      <ProgressPrimitive.Track
        class="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
        data-slot="progress-track"
      >
        <ProgressPrimitive.Fill
          class="h-full w-[var(--kb-progress-fill-width)] flex-1 bg-primary transition-all"
          data-slot="progress-fill"
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

const ProgressLabel: Component<ProgressPrimitive.ProgressLabelProps> = (props) => {
  return <ProgressPrimitive.Label as={Label} data-slot="progress-label" {...props} />
}

const ProgressValueLabel: Component<ProgressPrimitive.ProgressValueLabelProps> = (props) => {
  return <ProgressPrimitive.ValueLabel as={Label} data-slot="progress-value-label" {...props} />
}

export { Progress, ProgressLabel, ProgressValueLabel }
