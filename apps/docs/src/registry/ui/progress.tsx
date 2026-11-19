import { type ComponentProps } from "@solidjs/web"
import {
  Progress as SdkProgress,
  ProgressTrack as SdkProgressTrack,
  ProgressIndicator as SdkProgressIndicator,
  ProgressLabel as SdkProgressLabel,
  ProgressValue as SdkProgressValue
} from "@ui-sdk/solid/progress"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
type ProgressProps = Omit<ComponentProps<typeof SdkProgress>, "class"> & {
  class?: string
}
const Progress = (props: ProgressProps) => {
  const others = omit(props, "class", "children")
  return (
    <SdkProgress class={cn("w-full", props.class)} {...others}>
      {props.children}
      <SdkProgressTrack class={cn("cn-progress cn-progress-track relative overflow-hidden")}>
        <SdkProgressIndicator
          class={cn("cn-progress-indicator h-full w-(--progress-value) transition-all")}
        />
      </SdkProgressTrack>
    </SdkProgress>
  )
}
type ProgressLabelProps = Omit<ComponentProps<typeof SdkProgressLabel>, "class"> & {
  class?: string
}
const ProgressLabel = (props: ProgressLabelProps) => (
  <SdkProgressLabel {...props} class={cn("cn-progress-label", props.class)} />
)
type ProgressValueProps = Omit<ComponentProps<typeof SdkProgressValue>, "class"> & {
  class?: string
}
const ProgressValue = (props: ProgressValueProps) => (
  <SdkProgressValue {...props} class={cn("cn-progress-value", props.class)} />
)
export {
  Progress,
  ProgressLabel,
  ProgressValue,
  type ProgressLabelProps,
  type ProgressProps,
  type ProgressValueProps
}
