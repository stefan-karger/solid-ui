import { Checkbox } from "~/registry/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"

export default function CheckboxDisabled() {
  return (
    <FieldGroup class="mx-auto w-56">
      <Field data-disabled orientation="horizontal">
        <Checkbox disabled id="toggle-checkbox-disabled" name="toggle-checkbox-disabled" />
        <FieldLabel for="toggle-checkbox-disabled">Enable notifications</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
