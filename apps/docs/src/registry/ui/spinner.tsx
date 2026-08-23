import { type Component, type ComponentProps, splitProps } from "solid-js"

import { LoaderCircleIcon } from "lucide-solid"

import { cn } from "~/lib/utils"

const Spinner: Component<ComponentProps<"svg">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <LoaderCircleIcon
      aria-label="Loading"
      class={cn("size-4 animate-spin", local.class)}
      data-slot="spinner"
      role="status"
      {...others}
    />
  )
}

export { Spinner }
