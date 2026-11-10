import { type Component, type ComponentProps, splitProps } from "solid-js"

import { LoaderIcon } from "lucide-solid"

import { cn } from "~/lib/utils"

const Spinner: Component<ComponentProps<"svg">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <LoaderIcon
      aria-label="Loading"
      class={cn("size-4 animate-spin", local.class)}
      data-slot="spinner"
      role="status"
      {...others}
    />
  )
}

export default function SpinnerCustom() {
  return (
    <div class="flex items-center gap-4">
      <Spinner />
    </div>
  )
}
