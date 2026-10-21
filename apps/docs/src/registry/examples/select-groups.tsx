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

type Food = {
  label: string
  options: FoodOption[]
}

const foods: Food[] = [
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
    <Select<FoodOption, Food>
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
      )}
      optionGroupChildren="options"
      options={foods}
      optionTextValue="label"
      optionValue="value"
      placeholder="Select a food"
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
      <SelectTrigger aria-label="Food" class="w-full max-w-48">
        <SelectValue<FoodOption>>{(state) => state.selectedOption().label}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}
