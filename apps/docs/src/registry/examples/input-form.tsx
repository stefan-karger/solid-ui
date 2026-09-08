import { Button } from "~/registry/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

type Country = {
  label: string
  value: string
}

const countries: Country[] = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" }
]

export default function InputForm() {
  return (
    <form class="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel for="form-name">Name</FieldLabel>
          <Input id="form-name" placeholder="Evil Rabbit" required type="text" />
        </Field>

        <Field>
          <FieldLabel for="form-email">Email</FieldLabel>
          <Input id="form-email" placeholder="john@example.com" type="email" />
          <FieldDescription>We&apos;ll never share your email with anyone.</FieldDescription>
        </Field>

        <div class="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel for="form-phone">Phone</FieldLabel>
            <Input id="form-phone" placeholder="+1 (555) 123-4567" type="tel" />
          </Field>

          <Field>
            <FieldLabel for="form-country">Country</FieldLabel>
            <Select<Country>
              defaultValue={countries[0]!}
              options={countries}
              optionValue="value"
              optionTextValue="label"
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
              )}
            >
              <SelectTrigger id="form-country" class="w-full">
                <SelectValue<Country>>{(state) => state.selectedOption()?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </Field>
        </div>

        <Field>
          <FieldLabel for="form-address">Address</FieldLabel>
          <Input id="form-address" placeholder="123 Main St" type="text" />
        </Field>

        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
