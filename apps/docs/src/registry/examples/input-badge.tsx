import { Badge } from "~/registry/ui/badge"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputBadge() {
  return (
    <Field>
      <FieldLabel for="input-badge">
        Webhook URL{" "}
        <Badge variant="secondary" class="ml-auto">
          Beta
        </Badge>
      </FieldLabel>
      <Input
        id="input-badge"
        type="url"
        placeholder="https://api.example.com/webhook"
      />
    </Field>
  )
}
