import { Checkbox } from "~/registry/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"

export default function CheckboxDisabled() {
  return (
    <FieldGroup class="mx-auto w-56">
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="toggle-checkbox-disabled" name="toggle-checkbox-disabled" disabled />
        <FieldLabel for="toggle-checkbox-disabled">Enable notifications</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
