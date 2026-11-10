import { Button } from "~/registry/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

export default function InputForm() {
  const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" }
  ]
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
            <Select
              defaultValue={countries[0]}
              itemComponent={(props) => (
                <SelectItem item={props.item}>
                  <span class="text-muted-foreground">{props.item.rawValue.label}</span>
                </SelectItem>
              )}
              options={countries}
              optionTextValue="label"
              optionValue="value"
            >
              <SelectTrigger class="font-mono" id="form-country">
                <SelectValue<(typeof countries)[number]>>
                  {(state) => (
                    <span class="text-muted-foreground">{state.selectedOption().label}</span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent class="min-w-24" />
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
