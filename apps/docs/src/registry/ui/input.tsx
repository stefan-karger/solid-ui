import { type ComponentProps } from "@solidjs/web"

import { cn } from "~/lib/utils"

type InputProps = ComponentProps<"input">

const Input = (props: InputProps) => (
  <input
    data-slot="input"
    {...props}
    class={cn(
      "cn-input w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      props.class
    )}
  />
)

export { Input, type InputProps }
