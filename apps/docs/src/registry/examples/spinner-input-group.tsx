// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea
} from "~/registry/ui/input-group"
import { Spinner } from "~/registry/ui/spinner"

export default function SpinnerInputGroup() {
  return (
    <div class="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput disabled placeholder="Send a message..." />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupTextarea disabled placeholder="Send a message..." />
        <InputGroupAddon align="block-end">
          <Spinner />
          Validating...
          <InputGroupButton class="ml-auto" variant="default">
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
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
            <span class="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
