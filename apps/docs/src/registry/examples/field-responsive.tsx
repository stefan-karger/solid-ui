import { Button } from "~/registry/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function FieldResponsive() {
  return (
    <div class="w-full max-w-lg">
      <form>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Fill in your profile information.</FieldDescription>
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel for="name">Name</FieldLabel>
                <FieldDescription>Provide your full name for identification</FieldDescription>
              </FieldContent>
              <Input id="name" placeholder="Evil Rabbit" required />
            </Field>
            <Field orientation="responsive">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
