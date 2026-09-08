import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

type Fruit = {
  label: string
  value: string
  disabled?: boolean
}

const fruits: Fruit[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes", disabled: true },
  { label: "Pineapple", value: "pineapple" }
]

export default function SelectDisabled() {
  return (
    <Select<Fruit>
      disabled
      options={fruits}
      optionDisabled="disabled"
      optionValue="value"
      optionTextValue="label"
      placeholder="Select a fruit"
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
      )}
    >
      <SelectTrigger class="w-full max-w-48">
        <SelectValue<Fruit>>{(state) => state.selectedOption()?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}
