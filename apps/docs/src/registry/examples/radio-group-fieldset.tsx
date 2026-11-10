import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from "~/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"

export default function RadioGroupFieldset() {
  return (
    <FieldSet class="w-full max-w-xs">
      <FieldLegend variant="label">Subscription Plan</FieldLegend>
      <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
      <RadioGroup defaultValue="monthly">
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-plan-monthly" value="monthly" />
          <FieldLabel class="font-normal" for="radio-group-plan-monthly">
            Monthly ($9.99/month)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-plan-yearly" value="yearly" />
          <FieldLabel class="font-normal" for="radio-group-plan-yearly">
            Yearly ($99.99/year)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="radio-group-plan-lifetime" value="lifetime" />
          <FieldLabel class="font-normal" for="radio-group-plan-lifetime">
            Lifetime ($299.99)
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  )
}
