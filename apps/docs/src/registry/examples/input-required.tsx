import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputRequired() {
  return (
    <Field class="w-full max-w-xs">
      <FieldLabel for="input-required">
        Required Field <span class="text-destructive">*</span>
      </FieldLabel>
      <Input id="input-required" placeholder="This field is required" required />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  )
}
