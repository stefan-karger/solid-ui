import { For } from "solid-js"
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
    <Select<FoodOption>
      itemToLabel={(option) => String(option["label"])}
      itemToValue={(option) => String(option["value"])}

      placeholder="Select a fruit"
    >
      <SelectTrigger aria-label="Select a fruit" class="w-full max-w-52">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <For each={foods}>
          {(group, groupIndex) => (
            <>
              <Show when={groupIndex() !== 0}>
                <SelectSeparator />
              </Show>
              <SelectGroup>
                <SelectLabel>{group.label}</SelectLabel>
                <For each={group["options"]}>
                  {(option) => (
                    <SelectItem value={option} label={option["label"]}>
                      {option.label}
                    </SelectItem>
                  )}
                </For>
              </SelectGroup>
            </>
          )}
        </For>
      </SelectContent>
    </Select>
  )
}
