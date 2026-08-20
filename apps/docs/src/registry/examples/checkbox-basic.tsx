import { Checkbox } from "~/registry/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"

export default function CheckboxBasic() {
  return (
    <FieldGroup class="mx-auto w-56">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
        <FieldLabel for="terms-checkbox-basic">Accept terms and conditions</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
