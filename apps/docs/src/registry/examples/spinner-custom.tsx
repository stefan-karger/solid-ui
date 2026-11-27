import type { ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
import { IconPlaceholder } from "~/registry/icons/icon-placeholder"

const CustomSpinner = (props: ComponentProps<"svg">) => {
  const others = omit(props, "class")

  return (
    <IconPlaceholder
      lucide="LoaderIcon"
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
