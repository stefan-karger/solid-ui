// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      aria-label="Media controls"
      class="h-fit"
      orientation="vertical"
    >
      <Button size="icon" variant="outline">
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
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </Button>
      <Button size="icon" variant="outline">
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
          <path d="M5 12h14" />
        </svg>
      </Button>
    </ButtonGroup>
  )
}
