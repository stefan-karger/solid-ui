import { Field, FieldLabel } from "~/registry/ui/field"
import { Textarea } from "~/registry/ui/textarea"

export default function TextareaDisabled() {
  return (
    <Field class="w-full max-w-xs" data-disabled="true">
      <FieldLabel for="textarea-disabled">Message</FieldLabel>
      <Textarea disabled id="textarea-disabled" placeholder="Type your message here." />
    </Field>
  )
}
