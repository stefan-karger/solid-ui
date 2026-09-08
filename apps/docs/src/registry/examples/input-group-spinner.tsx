import { LoaderCircleIcon, LoaderIcon, RefreshCwIcon } from "lucide-solid"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText
} from "~/registry/ui/input-group"

export default function InputGroupSpinner() {
  return (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Searching..." />
        <InputGroupAddon align="inline-end">
          <LoaderIcon class="size-4 animate-spin" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Processing..." />
        <InputGroupAddon>
          <LoaderCircleIcon class="size-4 animate-spin" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Saving changes..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <LoaderIcon class="size-4 animate-spin" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Refreshing data..." />
        <InputGroupAddon>
          <RefreshCwIcon class="size-4 animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText class="text-muted-foreground">Please wait...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
