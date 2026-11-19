import { For } from "solid-js"

import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

type Department = {
  label: string
  value: string
}

const departments: Department[] = [
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "support" },
  { label: "Human Resources", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Operations", value: "operations" }
]

export default function FieldSelect() {
  return (
    <div class="w-full max-w-md">
      <Field>
        <FieldLabel for="field-select-department">Department</FieldLabel>
        <Select<Department>
          itemToLabel={(option) => String(option["label"])}
          itemToValue={(option) => String(option["value"])}

          placeholder="Choose department"
        >
          <SelectTrigger aria-label="Choose department" class="w-full" id="field-select-department">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <For each={departments}>
              {(option) => (
                <SelectItem value={option} label={option["label"]}>
                  {option.label}
                </SelectItem>
              )}
            </For>
          </SelectContent>
        </Select>
        <FieldDescription>Select your department or area of work.</FieldDescription>
      </Field>
    </div>
  )
}
