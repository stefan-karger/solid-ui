import { Badge } from "~/registry/ui/badge"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputBadge() {
  return (
    <Field>
      <FieldLabel for="input-badge">
        Webhook URL{" "}
        <Badge class="ml-auto" variant="secondary">
          Beta
        </Badge>
      </FieldLabel>
      <Input id="input-badge" placeholder="https://api.example.com/webhook" type="url" />
    </Field>
  )
}
