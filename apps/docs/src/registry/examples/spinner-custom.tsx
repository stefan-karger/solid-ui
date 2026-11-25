// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

const CustomSpinner = (props: ComponentProps<"svg">) => {
  const others = omit(props, "class")

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      role="status"
      aria-label="Loading"
      class={cn("size-4 animate-spin", props.class)}
      {...others}
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  )
}

export default function SpinnerCustom() {
  return (
    <div class="flex items-center gap-4">
      <CustomSpinner />
    </div>
  )
}
