import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const Label: Component<ComponentProps<"label">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <label
      class={cn(
        "cn-label flex select-none items-center peer-disabled:cursor-not-allowed group-data-disabled:pointer-events-none peer-data-disabled:cursor-not-allowed",
        local.class
      )}
      data-slot="label"
      {...others}
    />
  )
}

export { Label }
