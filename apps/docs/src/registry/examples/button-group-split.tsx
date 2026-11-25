// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import { Button } from "~/registry/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "~/registry/ui/button-group"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator class="" />
      <Button size="icon" variant="secondary">
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
    </ButtonGroup>
  )
}
