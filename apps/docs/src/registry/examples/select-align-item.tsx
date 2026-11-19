import { createSignal } from "solid-js"

import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/registry/ui/select"
import { Switch } from "~/registry/ui/switch"

export default function SelectAlignItem() {
  const [alignItemWithTrigger, setAlignItemWithTrigger] = createSignal(true)

  return (
    <FieldGroup class="w-full max-w-xs">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel for="align-item">Align Item</FieldLabel>
          <FieldDescription>Toggle to align the item with the trigger.</FieldDescription>
        </FieldContent>
        <Switch
          id="align-item"
          checked={alignItemWithTrigger()}
          onCheckedChange={setAlignItemWithTrigger}
        />
      </Field>
      <Field>
        <Select defaultValue="banana">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={alignItemWithTrigger()}>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  )
}
