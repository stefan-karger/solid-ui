import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputField() {
  return (
    <Field class="w-full max-w-xs">
      <FieldLabel for="input-field-username">Username</FieldLabel>
      <Input id="input-field-username" placeholder="Enter your username" type="text" />
      <FieldDescription>Choose a unique username for your account.</FieldDescription>
    </Field>
  )
}
