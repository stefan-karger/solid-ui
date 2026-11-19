import { type ComponentProps } from "@solidjs/web"

import { cn } from "~/lib/utils"

const Skeleton = (props: ComponentProps<"div">) => (
  <div data-slot="skeleton" {...props} class={cn("cn-skeleton animate-pulse", props.class)} />
)

export { Skeleton }
