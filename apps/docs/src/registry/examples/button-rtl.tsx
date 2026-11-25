// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import { Button } from "~/registry/ui/button"
import { useDirection } from "~/registry/ui/direction"

export default function ButtonRtl() {
  const direction = useDirection()

  return (
    <div
      class="flex flex-wrap items-center gap-2"
      data-provider-direction={direction()}
    >
      <Button variant="outline">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          data-icon="inline-start"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Previous
      </Button>
      <Button>
        Next
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          data-icon="inline-end"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Button>
    </div>
  )
}
