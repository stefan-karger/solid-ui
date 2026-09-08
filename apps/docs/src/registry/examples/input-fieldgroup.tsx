import { Button } from "~/registry/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputFieldgroup() {
  return (
    <div class="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel for="fieldgroup-name">Name</FieldLabel>
          <Input id="fieldgroup-name" placeholder="Jordan Lee" />
        </Field>

        <Field>
          <FieldLabel for="fieldgroup-email">Email</FieldLabel>
          <Input id="fieldgroup-email" placeholder="name@example.com" type="email" />
          <FieldDescription>We&apos;ll send updates to this address.</FieldDescription>
        </Field>

        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </div>
  )
}
