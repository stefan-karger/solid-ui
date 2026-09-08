import { Show } from "solid-js"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "~/registry/ui/select"

type FoodOption = {
  label: string
  value: string
}

type FoodGroup = {
  label: string
  options: FoodOption[]
}

const foods: FoodGroup[] = [
  {
    label: "Fruits",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Blueberry", value: "blueberry" }
    ]
  },
  {
    label: "Vegetables",
    options: [
      { label: "Carrot", value: "carrot" },
      { label: "Broccoli", value: "broccoli" },
      { label: "Spinach", value: "spinach" }
    ]
  }
]

export default function SelectGroups() {
  return (
    <Select<FoodOption, FoodGroup>
      options={foods}
      optionGroupChildren="options"
      optionValue="value"
      optionTextValue="label"
      placeholder="Select a food"
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
      )}
      sectionComponent={(props) => (
        <>
          <Show when={props.section.index !== 0}>
            <SelectSeparator />
          </Show>
          <SelectGroup>
            <SelectLabel>{props.section.rawValue.label}</SelectLabel>
          </SelectGroup>
        </>
      )}
    >
      <SelectTrigger class="w-full max-w-52">
        <SelectValue<FoodOption>>{(state) => state.selectedOption()?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}
