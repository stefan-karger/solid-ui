import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputDemo() {
  return (
    <Field class="w-full max-w-xs">
      <FieldLabel for="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" placeholder="sk-..." type="password" />
      <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
    </Field>
  )
}
