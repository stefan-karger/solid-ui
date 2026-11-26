import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Switch } from "~/registry/ui/switch"

export default function SwitchSizes() {
  return (
    <FieldGroup class="w-full max-w-[10rem]">
      <Field orientation="horizontal">
        <Switch id="switch-size-sm" size="sm" />
        <FieldLabel for="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-size-default" size="default" />
        <FieldLabel for="switch-size-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
