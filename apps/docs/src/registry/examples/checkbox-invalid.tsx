import { Checkbox } from "~/registry/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"

export default function CheckboxInvalid() {
  return (
    <FieldGroup class="mx-auto w-56">
      <Field data-invalid orientation="horizontal">
        <Checkbox aria-invalid id="terms-checkbox-invalid" name="terms-checkbox-invalid" />
        <FieldLabel for="terms-checkbox-invalid">Accept terms and conditions</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
