import { Field, FieldContent, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Switch } from "~/registry/ui/switch"

export default function SwitchDescription() {
  return (
    <Field class="w-full max-w-sm" orientation="horizontal">
      <FieldContent>
        <FieldLabel for="switch-focus-mode">Share across devices</FieldLabel>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the app.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode" />
    </Field>
  )
}
