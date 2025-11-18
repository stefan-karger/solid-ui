import { Field, FieldDescription, FieldLabel } from "~/registry/v1/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/registry/v1/ui/select"

export default function FieldSelect() {
  return (
    <div class="w-full max-w-md">
      <Field>
        <FieldLabel>Department</FieldLabel>
        <Select
          itemComponent={(props) => (
            <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
          )}
          options={[
            "Engineering",
            "Design",
            "Marketing",
            "Sales",
            "Customer Support",
            "Human Resources",
            "Finance",
            "Operations"
          ]}
          placeholder="Choose department"
        >
          <SelectTrigger aria-label="Department">
            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
          </SelectTrigger>
          <SelectContent />
        </Select>
        <FieldDescription>Select your department or area of work.</FieldDescription>
      </Field>
    </div>
  )
}
