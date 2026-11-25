// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { createSignal } from "solid-js"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger
} from "~/registry/ui/popover"

export default function InputGroupButtonExample() {
  const [isCopied, setIsCopied] = createSignal(false)
  const [isFavorite, setIsFavorite] = createSignal(false)
  let resetCopyTimeout: ReturnType<typeof setTimeout> | undefined

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(
      "https://github.com/stefan-karger/solid-ui"
    )
    setIsCopied(true)

    if (resetCopyTimeout) {
      clearTimeout(resetCopyTimeout)
    }

    resetCopyTimeout = setTimeout(() => {
      setIsCopied(false)
    }, 1200)
  }

  return (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput
          placeholder="https://github.com/stefan-karger/solid-ui"
          readonly
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            onClick={handleCopy}
            size="icon-xs"
            title="Copy"
          >
            {isCopied() ? (
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
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
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
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup class="[--radius:9999px]">
        <InputGroupAddon>
          <Popover>
            <PopoverTrigger
              render={(partProps) => (
                <InputGroupButton
                  {...partProps}
                  size="icon-xs"
                  variant="secondary"
                />
              )}
            >
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </PopoverTrigger>
            <PopoverContent class="rounded-xl text-sm">
              <PopoverTitle class="text-sm">
                Your connection is not secure.
              </PopoverTitle>
              <PopoverDescription>
                You should not enter any sensitive information on this site.
              </PopoverDescription>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
        <InputGroupAddon class="pl-1.5 text-muted-foreground">
          https://
        </InputGroupAddon>
        <InputGroupInput />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => {
              setIsFavorite((value) => !value)
            }}
            size="icon-xs"
          >
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
              style={
                isFavorite() ? { color: "var(--color-primary)" } : undefined
              }
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
