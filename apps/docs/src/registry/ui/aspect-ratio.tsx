import { type ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type AspectRatioProps = ComponentProps<"div"> & {
  ratio: number
  class?: string | undefined
}

const AspectRatio = (props: AspectRatioProps) => {
  const others = omit(props, "class", "ratio")
  return (
    <div
      data-slot="aspect-ratio"
      style={{
        "--ratio": props.ratio
      }}
      class={cn("relative aspect-(--ratio) overflow-hidden", props.class)}
      {...others}
    />
  )
}

export { AspectRatio }
