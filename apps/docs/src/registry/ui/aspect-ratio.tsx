import type { Component, ComponentProps, JSX } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

type AspectRatioProps = ComponentProps<"div"> & { ratio?: number }

const AspectRatio: Component<AspectRatioProps> = (rawProps) => {
  const props = mergeProps({ ratio: 1 / 1 }, rawProps)
  const [local, others] = splitProps(props, ["class", "ratio"])
  return (
    <div
      class={cn("relative aspect-(--ratio)", local.class)}
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": local.ratio
        } as JSX.CSSProperties
      }
      {...others}
    />
  )
}

export { AspectRatio }
