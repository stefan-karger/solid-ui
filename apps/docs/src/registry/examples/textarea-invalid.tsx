import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Textarea } from "~/registry/ui/textarea"

export default function TextareaInvalid() {
  return (
    <Field data-invalid>
      <FieldLabel for="textarea-invalid">Message</FieldLabel>
      <Textarea aria-invalid id="textarea-invalid" placeholder="Type your message here." />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  )
}
