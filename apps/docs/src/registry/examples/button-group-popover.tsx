import { Bot, ChevronDown } from "lucide-solid"

import { Button, buttonVariants } from "~/registry/ui/button"
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
        <Bot />
        Copilot
      </Button>
      <Popover placement="bottom-end">
        <PopoverTrigger
          aria-label="Open Popover"
          class={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ChevronDown />
        </PopoverTrigger>
        <PopoverContent class="rounded-xl text-sm">
          <PopoverHeader>
            <PopoverTitle>Start a new task with Copilot</PopoverTitle>
            <PopoverDescription>Describe your task in natural language.</PopoverDescription>
          </PopoverHeader>
          <Field>
            <FieldLabel class="sr-only" for="button-group-task">
              Task Description
            </FieldLabel>
            <Textarea class="resize-none" id="button-group-task" placeholder="I need to..." />
            <FieldDescription>Copilot will open a pull request for review.</FieldDescription>
          </Field>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
