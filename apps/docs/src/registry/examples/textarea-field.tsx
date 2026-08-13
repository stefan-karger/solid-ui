import {
  Field,
  FieldDescription,
  FieldLabel,
} from "~/registry/ui/field"
import { Textarea } from "~/registry/ui/textarea"

export default function TextareaField() {
  return (
    <Field>
      <FieldLabel for="textarea-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </Field>
  )
}
