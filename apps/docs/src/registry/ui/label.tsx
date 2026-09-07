import { type ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type LabelProps = ComponentProps<"label">

const Label = (props: LabelProps) => {
  const others = omit(props, "class")
  return (
    <label
      data-slot="label"
      class={cn(
        "cn-label flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        props.class
      )}
      {...others}
    />
  )
}

export { Label, type LabelProps }
