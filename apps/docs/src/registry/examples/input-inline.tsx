import { Button } from "~/registry/ui/button"
import { Field } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input placeholder="Search..." type="search" />
      <Button>Search</Button>
    </Field>
  )
}
