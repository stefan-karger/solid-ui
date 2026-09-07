import { type ComponentProps } from "@solidjs/web"
import { LoaderCircleIcon } from "lucide-solid"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type SpinnerProps = ComponentProps<typeof LoaderCircleIcon>

const Spinner = (props: SpinnerProps) => {
  const others = omit(props, "class")
  return (
    <LoaderCircleIcon
      role="status"
      aria-label="Loading"
      class={cn("cn-spinner size-4 animate-spin", props.class)}
      data-slot="spinner"
      {...others}
    />
  )
}

export { Spinner, type SpinnerProps }
