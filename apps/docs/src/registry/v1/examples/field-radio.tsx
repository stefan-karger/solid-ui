import { Field, FieldDescription, FieldLabel, FieldSet } from "~/registry/v1/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/v1/ui/radio-group"

export default function FieldRadio() {
  return (
    <div class="w-full max-w-md">
      <FieldSet>
        <FieldLabel>Subscription Plan</FieldLabel>
        <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
        <RadioGroup defaultValue="monthly">
          <Field orientation="horizontal">
            <RadioGroupItem id="plan-monthly" value="monthly" />
            <FieldLabel class="font-normal" for="plan-monthly">
              Monthly ($9.99/month)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem id="plan-yearly" value="yearly" />
            <FieldLabel class="font-normal" for="plan-yearly">
              Yearly ($99.99/year)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem id="plan-lifetime" value="lifetime" />
            <FieldLabel class="font-normal" for="plan-lifetime">
              Lifetime ($299.99)
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </div>
  )
}
