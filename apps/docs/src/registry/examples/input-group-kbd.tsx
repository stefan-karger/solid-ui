// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "~/registry/ui/input-group"

export default function InputGroupKbd() {
  return (
    <InputGroup class="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
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
          class="size-4 text-muted-foreground"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <kbd class="rounded-md border px-1.5 py-0.5 text-xs text-muted-foreground">
          Ctrl
        </kbd>
        <kbd class="rounded-md border px-1.5 py-0.5 text-xs text-muted-foreground">
          K
        </kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
