// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from "~/registry/ui/input-group"

export default function InputGroupBlockStart() {
  return (
    <FieldGroup class="w-full max-w-sm">
      <Field>
        <FieldLabel for="block-start-input">Input</FieldLabel>
        <InputGroup class="h-auto">
          <InputGroupInput
            id="block-start-input"
            placeholder="Enter your name"
          />
          <InputGroupAddon align="block-start">
            <InputGroupText>Full Name</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Header positioned above the input.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel for="block-start-textarea">Textarea</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            class="font-mono text-sm"
            id="block-start-textarea"
            placeholder="console.log('Hello, world!');"
          />
          <InputGroupAddon align="block-start">
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
              <path d="m16 18 6-6-6-6" />
              <path d="m8 6-6 6 6 6" />
            </svg>
            <InputGroupText class="font-mono">script.js</InputGroupText>
            <InputGroupButton aria-label="Copy" class="ml-auto" size="icon-xs">
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
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          Header positioned above the textarea.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
