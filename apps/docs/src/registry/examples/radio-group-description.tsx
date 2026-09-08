import { Field, FieldContent, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"

export default function RadioGroupDescription() {
  return (
    <RadioGroup class="w-fit" defaultValue="comfortable">
      <Field orientation="horizontal">
        <RadioGroupItem id="desc-r1" value="default" />
        <FieldContent>
          <FieldLabel for="desc-r1">Default</FieldLabel>
          <FieldDescription>Standard spacing for most use cases.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="desc-r2" value="comfortable" />
        <FieldContent>
          <FieldLabel for="desc-r2">Comfortable</FieldLabel>
          <FieldDescription>More space between elements.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="desc-r3" value="compact" />
        <FieldContent>
          <FieldLabel for="desc-r3">Compact</FieldLabel>
          <FieldDescription>Minimal spacing for dense layouts.</FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  )
}
