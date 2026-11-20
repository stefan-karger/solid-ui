import { For } from "solid-js"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/registry/ui/select"

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
      itemToLabel={(option) => String(option["label"])}
      itemToValue={(option) => String(option["value"])}
      disabled

      placeholder="Select a fruit"
    >
      <SelectTrigger aria-label="Select a fruit" class="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <For each={fruits}>
          {(option) => (
            <SelectItem
              value={option}
              label={option["label"]}
              disabled={option["disabled"] ?? false}
            >
              {option.label}
            </SelectItem>
          )}
        </For>
      </SelectContent>
    </Select>
  )
}
