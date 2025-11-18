import { Field, FieldContent, FieldDescription, FieldLabel } from "~/registry/v1/ui/field"
import { Switch } from "~/registry/v1/ui/switch"

export default function FieldSwitch() {
  return (
    <div class="w-full max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel for="2fa">Multi-factor authentication</FieldLabel>
          <FieldDescription>
            Enable multi-factor authentication. If you do not have a two-factor device, you can use
            a one-time code sent to your email.
          </FieldDescription>
        </FieldContent>
        <Switch id="2fa" />
      </Field>
    </div>
  )
}
