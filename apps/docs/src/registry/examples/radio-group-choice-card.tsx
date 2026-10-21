import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "~/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"

export default function RadioGroupChoiceCard() {
  return (
    <RadioGroup class="max-w-sm" defaultValue="plus">
      <FieldLabel for="radio-group-plan-plus">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Plus</FieldTitle>
            <FieldDescription>For individuals and small teams.</FieldDescription>
          </FieldContent>
          <RadioGroupItem id="radio-group-plan-plus" value="plus" />
        </Field>
      </FieldLabel>
      <FieldLabel for="radio-group-plan-pro">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Pro</FieldTitle>
            <FieldDescription>For growing businesses.</FieldDescription>
          </FieldContent>
          <RadioGroupItem id="radio-group-plan-pro" value="pro" />
        </Field>
      </FieldLabel>
      <FieldLabel for="radio-group-plan-enterprise">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enterprise</FieldTitle>
            <FieldDescription>For large teams and enterprises.</FieldDescription>
          </FieldContent>
          <RadioGroupItem id="radio-group-plan-enterprise" value="enterprise" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  )
}
