import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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
              <IconPlaceholder lucide="CheckIcon" class="size-4" />
            ) : (
              <IconPlaceholder lucide="CopyIcon" class="size-4" />
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
              <IconPlaceholder lucide="InfoIcon" class="size-4" />
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
            <IconPlaceholder
              lucide="StarIcon"
              class="size-4"
              style={
                isFavorite() ? { color: "var(--color-primary)" } : undefined
              }
            />
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
