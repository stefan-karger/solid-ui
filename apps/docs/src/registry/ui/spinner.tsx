// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { type ComponentProps } from "@solidjs/web"

import { cn } from "~/lib/utils"

type SpinnerProps = ComponentProps<"svg">

const Spinner = (props: SpinnerProps) => (
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
    data-slot="spinner"
    {...props}
    class={cn("cn-spinner size-4 animate-spin", props.class)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

export { Spinner, type SpinnerProps }
