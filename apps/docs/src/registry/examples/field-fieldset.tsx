import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function FieldFieldset() {
  return (
    <div class="w-full max-w-sm">
      <FieldSet>
        <FieldLegend>Address Information</FieldLegend>
        <FieldDescription>We need your address to deliver your order.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel for="field-fieldset-street">Street Address</FieldLabel>
            <Input id="field-fieldset-street" placeholder="123 Main St" type="text" />
          </Field>
          <div class="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel for="field-fieldset-city">City</FieldLabel>
              <Input id="field-fieldset-city" placeholder="New York" type="text" />
            </Field>
            <Field>
              <FieldLabel for="field-fieldset-zip">Postal Code</FieldLabel>
              <Input id="field-fieldset-zip" placeholder="90502" type="text" />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
