import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "~/registry/v1/ui/field"
import { Input } from "~/registry/v1/ui/input"

export default function FieldInput() {
  return (
    <div class="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel for="username">Username</FieldLabel>
            <Input id="username" placeholder="Max Leiter" type="text" />
            <FieldDescription>Choose a unique username for your account.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel for="password">Password</FieldLabel>
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            <Input id="password" placeholder="••••••••" type="password" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
