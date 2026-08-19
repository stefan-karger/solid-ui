import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

const items = [
  { label: "Apple", value: "apple", disabled: false },
  { label: "Banana", value: "banana", disabled: false },
  { label: "Blueberry", value: "blueberry", disabled: false },
  { label: "Grapes", value: "grapes", disabled: true },
  { label: "Pineapple", value: "pineapple", disabled: false }
]

export default function SelectDisabled() {
  return (
    <Select
      disabled
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
      )}
      optionDisabled="disabled"
      options={items}
      optionTextValue="label"
      optionValue="value"
      placeholder="Select a fruit"
    >
      <SelectTrigger aria-label="Fruit" class="w-full max-w-48">
        <SelectValue<(typeof items)[number]>>{(state) => state.selectedOption().label}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}
