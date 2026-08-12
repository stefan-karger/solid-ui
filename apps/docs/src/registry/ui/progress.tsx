import * as ProgressPrimitive from "@kobalte/core/progress"
import { mergeProps, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type { Component, JSX, ValidComponent } from "solid-js"

import { Label } from "~/registry/ui/label"
import { cn } from "~/lib/utils"

type ProgressRootProps<T extends ValidComponent = "div"> =
  ProgressPrimitive.ProgressRootProps<T> & { children?: JSX.Element; class?: string }

const Progress = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, ProgressRootProps<T>>
) => {
  const props = mergeProps({ as: "div" } as ProgressRootProps, rawProps)
  const [local, others] = splitProps(props, ["children", "class", "as"])
  return (
    <ProgressPrimitive.Root
      as={local.as}
      class={cn("cn-progress", local.class)}
      data-slot="progress"
      {...others}
    >
      <div class="flex flex-1">
        {local.children}
      </div>
      <ProgressPrimitive.Track class="cn-progress-track relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <ProgressPrimitive.Fill class="cn-progress-indicator h-full w-(--kb-progress-fill-width) flex-1 bg-primary transition-all" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

const ProgressLabel: Component<ProgressPrimitive.ProgressLabelProps> = (props) => {
  return <ProgressPrimitive.Label as={Label} class="cn-progress-label" {...props} />
}

const ProgressValue: Component<ProgressPrimitive.ProgressValueLabelProps> = (
  props
) => {
  return <ProgressPrimitive.ValueLabel as={Label} class="cn-progress-value" {...props} />
}

export { Progress, ProgressLabel, ProgressValue }
