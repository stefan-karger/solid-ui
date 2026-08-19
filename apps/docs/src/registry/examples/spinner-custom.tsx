import { LoaderIcon } from "lucide-solid"
import { splitProps, type Component, type ComponentProps } from "solid-js"
import { cn } from "~/lib/utils"

const Spinner: Component<ComponentProps<"svg">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <LoaderIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      class={cn("size-4 animate-spin", local.class)}
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
