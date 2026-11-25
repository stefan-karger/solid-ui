// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "~/registry/ui/input-group"

export default function InputGroupDemo() {
  return (
    <InputGroup class="max-w-xs">
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
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}
