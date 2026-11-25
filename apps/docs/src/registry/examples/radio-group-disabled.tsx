import { Field, FieldLabel } from "~/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"

export default function RadioGroupDisabled() {
  return (
    <RadioGroup class="w-fit" defaultValue="option2">
      <Field data-disabled orientation="horizontal">
        <RadioGroupItem disabled id="disabled-1" value="option1" />
        <FieldLabel class="font-normal" for="disabled-1">
          Disabled
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="disabled-2" value="option2" />
        <FieldLabel class="font-normal" for="disabled-2">
          Option 2
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="disabled-3" value="option3" />
        <FieldLabel class="font-normal" for="disabled-3">
          Option 3
        </FieldLabel>
      </Field>
    </RadioGroup>
  )
}
