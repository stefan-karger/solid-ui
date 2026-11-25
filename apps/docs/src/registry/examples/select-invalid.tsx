import { For } from "solid-js"

import { Field, FieldError, FieldLabel } from "~/registry/ui/field"
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
        itemToLabel={(option) => String(option["label"])}
        itemToValue={(option) => String(option["value"])}

        placeholder="Select a fruit"
      >
        <SelectTrigger
          aria-label="Select a fruit"
          aria-invalid="true"
          class="w-full"
          id="select-invalid-fruit"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <For each={fruits}>
            {(option) => (
              <SelectItem value={option} label={option["label"]}>
                {option.label}
              </SelectItem>
            )}
          </For>
        </SelectContent>
      </Select>
      <FieldError>Please select a fruit.</FieldError>
    </Field>
  )
}
