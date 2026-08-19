import { Button } from "~/registry/ui/button"
import { Field } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

export default function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  )
}
