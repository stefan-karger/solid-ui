import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet
} from "~/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"

export default function RadioGroupInvalid() {
  return (
    <FieldSet class="w-full max-w-xs">
      <FieldLegend variant="label">Notification Preferences</FieldLegend>
      <FieldDescription>
        Choose how you want to receive notifications.
      </FieldDescription>
      <RadioGroup defaultValue="email">
        <Field data-invalid orientation="horizontal">
          <RadioGroupItem
            aria-invalid="true"
            id="invalid-email"
            value="email"
          />
          <FieldLabel class="font-normal" for="invalid-email">
            Email only
          </FieldLabel>
        </Field>
        <Field data-invalid orientation="horizontal">
          <RadioGroupItem aria-invalid="true" id="invalid-sms" value="sms" />
          <FieldLabel class="font-normal" for="invalid-sms">
            SMS only
          </FieldLabel>
        </Field>
        <Field data-invalid orientation="horizontal">
          <RadioGroupItem aria-invalid="true" id="invalid-both" value="both" />
          <FieldLabel class="font-normal" for="invalid-both">
            Both Email & SMS
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  )
}
