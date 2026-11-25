import { For } from "solid-js"

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
      itemToLabel={(option) => String(option["label"])}
      itemToValue={(option) => String(option["value"])}

      placeholder="Select a fruit"
    >
      <SelectTrigger aria-label="Select a fruit" class="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <For each={fruits}>
            {(option) => (
              <SelectItem value={option} label={option["label"]}>
                {option.label}
              </SelectItem>
            )}
          </For>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
