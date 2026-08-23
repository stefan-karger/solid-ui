import { SearchIcon } from "lucide-solid"

import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"

export default function InputGroupInlineStart() {
  return (
    <Field class="max-w-sm">
      <FieldLabel for="inline-start-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput id="inline-start-input" placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon class="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the start.</FieldDescription>
    </Field>
  )
}
