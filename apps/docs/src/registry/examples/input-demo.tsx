import {
  Field,
  FieldDescription,
  FieldLabel,
} from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputDemo() {
  return (
    <Field>
      <FieldLabel for="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
      <FieldDescription>
        Your API key is encrypted and stored securely.
      </FieldDescription>
    </Field>
  )
}
