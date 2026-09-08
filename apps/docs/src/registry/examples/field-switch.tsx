import { Field, FieldLabel } from "~/registry/ui/field"
import { Switch } from "~/registry/ui/switch"

export default function FieldSwitch() {
  return (
    <Field orientation="horizontal" class="w-fit">
      <FieldLabel for="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  )
}
