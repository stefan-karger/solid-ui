import { Field, FieldContent, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"

export default function RadioGroupDescription() {
  return (
    <RadioGroup class="w-fit" defaultValue="comfortable">
      <Field orientation="horizontal">
        <RadioGroupItem id="radio-group-description-default" value="default" />
        <FieldContent>
          <FieldLabel for="radio-group-description-default">Default</FieldLabel>
          <FieldDescription>Standard spacing for most use cases.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="radio-group-description-comfortable" value="comfortable" />
        <FieldContent>
          <FieldLabel for="radio-group-description-comfortable">Comfortable</FieldLabel>
          <FieldDescription>More space between elements.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="radio-group-description-compact" value="compact" />
        <FieldContent>
          <FieldLabel for="radio-group-description-compact">Compact</FieldLabel>
          <FieldDescription>Minimal spacing for dense layouts.</FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  )
}
