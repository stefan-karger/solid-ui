import { Field, FieldError, FieldLabel } from "~/registry/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" }
]

export default function SelectInvalid() {
  return (
    <Field class="w-full max-w-48" data-invalid>
      <FieldLabel for="invalid-fruit">Fruit</FieldLabel>
      <Select
        itemComponent={(props) => (
          <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
        )}
        options={items}
        optionTextValue="label"
        optionValue="value"
        placeholder="Select a fruit"
        validationState="invalid"
      >
        <SelectTrigger aria-invalid id="invalid-fruit">
          <SelectValue<(typeof items)[number]>>
            {(state) => state.selectedOption().label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
      <FieldError>Please select a fruit.</FieldError>
    </Field>
  )
}
