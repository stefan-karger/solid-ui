import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "~/registry/ui/select"

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

export default function SelectDemo() {
  return (
    <Select<Fruit>
      options={fruits}
      optionValue="value"
      optionTextValue="label"
      placeholder="Select a fruit"
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
      )}
      sectionComponent={() => (
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
        </SelectGroup>
      )}
    >
      <SelectTrigger class="w-full max-w-48">
        <SelectValue<Fruit>>{(state) => state.selectedOption()?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}
