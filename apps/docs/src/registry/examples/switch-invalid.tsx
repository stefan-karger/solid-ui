import { Field, FieldContent, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Switch } from "~/registry/ui/switch"

export default function SwitchInvalid() {
  return (
    <Field class="max-w-sm" data-invalid orientation="horizontal">
      <FieldContent>
        <FieldLabel for="switch-terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>You must accept the terms and conditions to continue.</FieldDescription>
      </FieldContent>
      <Switch aria-invalid id="switch-terms" />
    </Field>
  )
}
