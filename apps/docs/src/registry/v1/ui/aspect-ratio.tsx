import type { Component, ComponentProps } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

type AspectRatioProps = ComponentProps<"div"> & { ratio?: number }

const AspectRatio: Component<AspectRatioProps> = (rawProps) => {
  const props = mergeProps({ ratio: 1 / 1 }, rawProps)
  const [local, others] = splitProps(props, ["ratio"])
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        "padding-bottom": `${100 / local.ratio}%`
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
        {...others}
      />
    </div>
  )
}

export { AspectRatio }
