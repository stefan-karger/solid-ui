import { InfoIcon } from "lucide-solid"

import { Field, FieldLabel } from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText
} from "~/registry/ui/input-group"

export default function InputInputGroup() {
  return (
    <Field class="w-full max-w-xs">
      <FieldLabel for="input-group-url">Website URL</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InfoIcon class="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
