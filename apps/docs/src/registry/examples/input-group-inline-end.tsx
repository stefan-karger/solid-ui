import { EyeOffIcon } from "lucide-solid"

import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"

export default function InputGroupInlineEnd() {
  return (
    <Field class="w-full max-w-sm">
      <FieldLabel for="inline-end-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput id="inline-end-input" placeholder="Enter password" type="password" />
        <InputGroupAddon align="inline-end">
          <EyeOffIcon class="size-4" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the end.</FieldDescription>
    </Field>
  )
}
