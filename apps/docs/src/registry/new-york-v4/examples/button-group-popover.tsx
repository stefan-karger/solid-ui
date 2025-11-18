import { IconBot, IconChevronDown } from "~/components/icons"
import { Button } from "~/registry/new-york-v4/ui/button"
import { ButtonGroup } from "~/registry/new-york-v4/ui/button-group"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/new-york-v4/ui/popover"
import { Separator } from "~/registry/new-york-v4/ui/separator"
import { Textarea } from "~/registry/new-york-v4/ui/textarea"

export default function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <IconBot /> Copilot
      </Button>
      <Popover placement="bottom-end">
        <Button aria-label="Open Popover" as={PopoverTrigger} size="icon" variant="outline">
          <IconChevronDown />
        </Button>

        <PopoverContent class="rounded-xl p-0 text-sm">
          <div class="px-4 py-3">
            <div class="font-medium text-sm">Agent Tasks</div>
          </div>
          <Separator />
          <div class="p-4 text-sm *:[p:not(:last-child)]:mb-2">
            <Textarea
              class="mb-4 resize-none"
              placeholder="Describe your task in natural language."
            />
            <p class="font-medium">Start a new task with Copilot</p>
            <p class="text-muted-foreground">
              Describe your task in natural language. Copilot will work in the background and open a
              pull request for your review.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
