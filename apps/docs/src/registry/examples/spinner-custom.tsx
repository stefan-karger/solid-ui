import { LoaderIcon, type LucideProps } from "lucide-solid"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

const CustomSpinner = (props: LucideProps) => {
  const others = omit(props, "class")

  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      class={cn("size-4 animate-spin", props.class)}
      {...others}
    />
  )
}

export default function SpinnerCustom() {
  return (
    <div class="flex items-center gap-4">
      <CustomSpinner />
    </div>
  )
}
