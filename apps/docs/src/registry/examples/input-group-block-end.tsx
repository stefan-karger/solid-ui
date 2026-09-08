import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from "~/registry/ui/input-group"

export default function InputGroupBlockEnd() {
  return (
    <FieldGroup class="w-full max-w-sm">
      <Field>
        <FieldLabel for="block-end-input">Input</FieldLabel>
        <InputGroup class="h-auto">
          <InputGroupInput id="block-end-input" placeholder="Enter amount" />
          <InputGroupAddon align="block-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Footer positioned below the input.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel for="block-end-textarea">Textarea</FieldLabel>
        <InputGroup>
          <InputGroupTextarea id="block-end-textarea" placeholder="Write a comment..." />
          <InputGroupAddon align="block-end">
            <InputGroupText>0/280</InputGroupText>
            <InputGroupButton class="ml-auto" size="sm" variant="default">
              Post
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Footer positioned below the textarea.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}
