import { Field, FieldLabel } from "~/registry/ui/field"
import { Switch } from "~/registry/ui/switch"

export default function SwitchDisabled() {
  return (
    <Field class="w-fit" data-disabled orientation="horizontal">
      <Switch disabled id="switch-disabled-unchecked" />
      <FieldLabel for="switch-disabled-unchecked">Disabled</FieldLabel>
    </Field>
  )
}
