import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputInvalid() {
  return (
    <Field class="w-full max-w-xs" data-invalid>
      <FieldLabel for="input-invalid">Invalid Input</FieldLabel>
      <Input aria-invalid="true" id="input-invalid" placeholder="Error" />
      <FieldDescription>This field contains validation errors.</FieldDescription>
    </Field>
  )
}
