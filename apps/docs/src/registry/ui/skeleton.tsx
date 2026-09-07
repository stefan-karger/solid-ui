import { type ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

const Skeleton = (props: ComponentProps<"div">) => {
  const others = omit(props, "class")
  return (
    <div class={cn("cn-skeleton animate-pulse", props.class)} data-slot="skeleton" {...others} />
  )
}

export { Skeleton }
