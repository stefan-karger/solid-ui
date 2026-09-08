import { Field, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputBadge() {
  return (
    <Field class="w-full max-w-xs">
      <FieldLabel for="input-badge">
        Webhook URL
        <span class="cn-badge cn-badge-variant-secondary ml-auto">Beta</span>
      </FieldLabel>
      <Input id="input-badge" placeholder="https://api.example.com/webhook" type="url" />
    </Field>
  )
}
