import { createSignal } from "solid-js"

import {
  IconArchive,
  IconArrowLeft,
  IconCalendarPlus,
  IconClock,
  IconDots,
  IconFilterPlus,
  IconMailCheck,
  IconTag,
  IconTrash
} from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"
import { ButtonGroup } from "~/registry/v1/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "~/registry/v1/ui/dropdown-menu"

export default function ButttonGroupDemo() {
  const [label, setLabel] = createSignal("personal")
  return (
    <ButtonGroup>
      <ButtonGroup class="hidden sm:flex">
        <Button aria-label="Go Back" size="icon" variant="outline">
          <IconArrowLeft />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger
            aria-label="More Options"
            as={Button<"button">}
            size="icon"
            variant="outline"
          >
            <IconDots />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconMailCheck />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconArchive />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconClock />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCalendarPlus />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconFilterPlus />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub overlap>
                <DropdownMenuSubTrigger>
                  <IconTag />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup onChange={setLabel} value={label()}>
                      <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <IconTrash />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
