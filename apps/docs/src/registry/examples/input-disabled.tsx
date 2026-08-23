import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel for="input-demo-disabled">Email</FieldLabel>
      <Input disabled id="input-demo-disabled" placeholder="Email" type="email" />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}
