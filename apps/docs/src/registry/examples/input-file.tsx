import {
  Field,
  FieldDescription,
  FieldLabel,
} from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputFile() {
  return (
    <Field>
      <FieldLabel for="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}
