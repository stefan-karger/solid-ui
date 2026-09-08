import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "~/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"

export default function RadioGroupChoiceCard() {
  return (
    <RadioGroup class="max-w-sm" defaultValue="plus">
      <FieldLabel for="plus-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Plus</FieldTitle>
            <FieldDescription>For individuals and small teams.</FieldDescription>
          </FieldContent>
          <RadioGroupItem id="plus-plan" value="plus" />
        </Field>
      </FieldLabel>
      <FieldLabel for="pro-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Pro</FieldTitle>
            <FieldDescription>For growing businesses.</FieldDescription>
          </FieldContent>
          <RadioGroupItem id="pro-plan" value="pro" />
        </Field>
      </FieldLabel>
      <FieldLabel for="enterprise-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enterprise</FieldTitle>
            <FieldDescription>For large teams and enterprises.</FieldDescription>
          </FieldContent>
          <RadioGroupItem id="enterprise-plan" value="enterprise" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  )
}
