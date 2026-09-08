import { Field, FieldError, FieldLabel } from "~/registry/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

type Fruit = {
  label: string
  value: string
}

const fruits: Fruit[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" }
]

export default function SelectInvalid() {
  return (
    <Field class="max-w-48" data-invalid>
      <FieldLabel for="select-invalid-fruit">Fruit</FieldLabel>
      <Select<Fruit>
        options={fruits}
        optionValue="value"
        optionTextValue="label"
        placeholder="Select a fruit"
        validationState="invalid"
        itemComponent={(props) => (
          <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
        )}
      >
        <SelectTrigger aria-invalid="true" class="w-full" id="select-invalid-fruit">
          <SelectValue<Fruit>>{(state) => state.selectedOption()?.label}</SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
      <FieldError>Please select a fruit.</FieldError>
    </Field>
  )
}
