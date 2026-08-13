import { Field, FieldLabel } from "~/registry/ui/field"
import { Textarea } from "~/registry/ui/textarea"

export default function TextareaDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel for="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  )
}
