import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function FieldInput() {
  return (
    <div class="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel for="field-input-username">Username</FieldLabel>
            <Input id="field-input-username" placeholder="Max Leiter" type="text" />
            <FieldDescription>Choose a unique username for your account.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel for="field-input-password">Password</FieldLabel>
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            <Input id="field-input-password" placeholder="••••••••" type="password" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
