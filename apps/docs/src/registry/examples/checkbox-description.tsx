import { Checkbox } from "~/registry/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"

export default function CheckboxDescription() {
  return (
    <FieldGroup class="mx-auto w-72">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-desc" name="terms-checkbox-desc" defaultChecked />
        <FieldContent>
          <FieldLabel for="terms-checkbox-desc">Accept terms and conditions</FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
