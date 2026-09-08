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
          options={departments}
          optionValue="value"
          optionTextValue="label"
          placeholder="Choose department"
          itemComponent={(props) => (
            <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
          )}
        >
          <SelectTrigger class="w-full" id="field-select-department">
            <SelectValue<Department>>{(state) => state.selectedOption()?.label}</SelectValue>
          </SelectTrigger>
          <SelectContent />
        </Select>
        <FieldDescription>Select your department or area of work.</FieldDescription>
      </Field>
    </div>
  )
}
