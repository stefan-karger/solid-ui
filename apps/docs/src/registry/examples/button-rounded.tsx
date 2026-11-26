// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import { Button } from "~/registry/ui/button"

export default function ButtonRounded() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button class="rounded-full" size="sm">
        Rounded
      </Button>
      <Button class="rounded-full" variant="secondary">
        Rounded Secondary
      </Button>
      <Button class="rounded-full" size="icon" variant="outline">
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
          class="size-4"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
        <span class="sr-only">Search</span>
      </Button>
    </div>
  )
}
