import { LoaderCircleIcon } from "lucide-solid"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText
} from "~/registry/ui/input-group"
import { Spinner } from "~/registry/ui/spinner"

export default function InputGroupSpinner() {
  return (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Searching..." />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Processing..." />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Saving changes..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Refreshing data..." />
        <InputGroupAddon>
          <LoaderCircleIcon class="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText class="text-muted-foreground">Please wait...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
