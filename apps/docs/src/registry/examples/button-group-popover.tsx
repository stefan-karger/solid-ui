import { BotIcon, ChevronDownIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "~/registry/ui/popover"
import { Textarea } from "~/registry/ui/textarea"

export default function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <BotIcon class="size-4" />
        Copilot
      </Button>
      <Popover placement="bottom-end">
        <PopoverTrigger as={Button} aria-label="Open Popover" size="icon" variant="outline">
          <ChevronDownIcon class="size-4" />
        </PopoverTrigger>
        <PopoverContent class="rounded-xl text-sm">
          <PopoverHeader>
            <PopoverTitle>Start a new task with Copilot</PopoverTitle>
            <PopoverDescription>Describe your task in natural language.</PopoverDescription>
          </PopoverHeader>
          <Field>
            <FieldLabel class="sr-only" for="task">
              Task Description
            </FieldLabel>
            <Textarea class="resize-none" id="task" placeholder="I need to..." />
            <FieldDescription>Copilot will open a pull request for review.</FieldDescription>
          </Field>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
