import {
  Field,
  FieldDescription,
  FieldLabel,
} from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputInvalid() {
  return (
    <Field data-invalid>
      <FieldLabel for="input-invalid">Invalid Input</FieldLabel>
      <Input id="input-invalid" placeholder="Error" aria-invalid />
      <FieldDescription>
        This field contains validation errors.
      </FieldDescription>
    </Field>
  )
}
