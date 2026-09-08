import { Button } from "~/registry/ui/button"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "~/registry/ui/popover"

export default function PopoverForm() {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger as={Button} variant="outline">
        Set dimensions
      </PopoverTrigger>
      <PopoverContent class="w-64">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <FieldGroup class="gap-4">
          <Field orientation="horizontal">
            <FieldLabel for="width" class="w-1/2">
              Width
            </FieldLabel>
            <Input id="width" value="100%" />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel for="height" class="w-1/2">
              Height
            </FieldLabel>
            <Input id="height" value="25px" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  )
}
