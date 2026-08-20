import { type ComponentProps, splitProps, type ValidComponent } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Fill,
  Label,
  type ProgressFillProps,
  type ProgressLabelProps,
  type ProgressRootProps,
  type ProgressTrackProps,
  type ProgressValueLabelProps,
  Root,
  Track,
  ValueLabel
} from "@kobalte/core/progress"

import { cn } from "~/lib/utils"

type ProgressProps<T extends ValidComponent = "div"> = PolymorphicProps<T, ProgressRootProps<T>> &
  Pick<ComponentProps<T>, "class" | "children">

const Progress = <T extends ValidComponent = "div">(props: ProgressProps<T>) => {
  const [local, others] = splitProps(props as ProgressProps, ["class", "children"])
  return (
    <Root
      class={cn("cn-progress-root flex flex-wrap gap-3", local.class)}
      data-slot="progress"
      {...others}
    >
      {local.children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Root>
  )
}

type ProgressTrackComponentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ProgressTrackProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ProgressTrack = <T extends ValidComponent = "div">(props: ProgressTrackComponentProps<T>) => {
  const [local, others] = splitProps(props as ProgressTrackComponentProps, ["class"])
  return (
    <Track
      class={cn(
        "cn-progress-track relative flex w-full items-center overflow-x-hidden",
        local.class
      )}
      data-slot="progress-track"
      {...others}
    />
  )
}

type ProgressIndicatorProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ProgressFillProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ProgressIndicator = <T extends ValidComponent = "div">(props: ProgressIndicatorProps<T>) => {
  const [local, others] = splitProps(props as ProgressIndicatorProps, ["class"])
  return (
    <Fill
      class={cn(
        "cn-progress-indicator h-full w-(--kb-progress-fill-width) transition-all",
        local.class
      )}
      data-slot="progress-indicator"
      {...others}
    />
  )
}

type ProgressLabelComponentProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  ProgressLabelProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ProgressLabel = <T extends ValidComponent = "span">(
  props: ProgressLabelComponentProps<T>
) => {
  const [local, others] = splitProps(props as ProgressLabelComponentProps, ["class"])
  return (
    <Label class={cn("cn-progress-label", local.class)} data-slot="progress-label" {...others} />
  )
}

type ProgressValueProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ProgressValueLabelProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ProgressValue = <T extends ValidComponent = "div">(props: ProgressValueProps<T>) => {
  const [local, others] = splitProps(props as ProgressValueProps, ["class"])
  return (
    <ValueLabel
      class={cn("cn-progress-value", local.class)}
      data-slot="progress-value"
      {...others}
    />
  )
}

export { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue }
