import { createSignal } from "solid-js"

import { CheckIcon, CopyIcon, InfoIcon, StarIcon } from "lucide-solid"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

export default function InputGroupButtonExample() {
  const [copied, setCopied] = createSignal(false)
  const [favorite, setFavorite] = createSignal(false)

  const copy = async () => {
    await navigator.clipboard?.writeText("https://x.com/shadcn")
    setCopied(true)
  }

  return (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="https://x.com/shadcn" readonly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Copy" onClick={copy} size="icon-xs" title="Copy">
            {copied() ? <CheckIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup class="[--radius:9999px]">
        <Popover placement="bottom-start">
          <PopoverTrigger as={InputGroupAddon}>
            <InputGroupButton
              aria-label="Connection information"
              size="icon-xs"
              variant="secondary"
            >
              <InfoIcon />
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent class="flex flex-col gap-1 rounded-xl text-sm">
            <p class="font-medium">Your connection is not secure.</p>
            <p>You should not enter any sensitive information on this site.</p>
          </PopoverContent>
        </Popover>
        <InputGroupAddon class="pl-1.5 text-muted-foreground">https://</InputGroupAddon>
        <InputGroupInput id="input-secure-19" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Toggle favorite"
            aria-pressed={favorite()}
            onClick={() => setFavorite((value) => !value)}
            size="icon-xs"
          >
            <StarIcon
              class="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600"
              data-favorite={favorite()}
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
