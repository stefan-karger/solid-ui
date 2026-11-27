import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function ButtonGroupDemo() {
  const [label, setLabel] = createSignal("personal")

  return (
    <ButtonGroup>
      <ButtonGroup class="hidden sm:flex">
        <Button aria-label="Go Back" size="icon-sm" variant="outline">
          <IconPlaceholder lucide="ArrowLeftIcon" class="size-4" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Archive
        </Button>
        <Button size="sm" variant="outline">
          Report
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Snooze
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(partProps) => (
              <Button {...partProps} size="icon-sm" variant="outline" />
            )}
            aria-label="More Options"
            class=""
          >
            <IconPlaceholder lucide="EllipsisIcon" class="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" class="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder lucide="MailCheckIcon" class="size-4" />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder lucide="ArchiveIcon" class="size-4" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder lucide="Clock4Icon" class="size-4" />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder lucide="CalendarPlusIcon" class="size-4" />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder lucide="ListFilterIcon" class="size-4" />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <IconPlaceholder lucide="TagIcon" class="size-4" />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    onValueChange={setLabel}
                    value={label()}
                  >
                    <DropdownMenuRadioItem value="personal">
                      Personal
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="work">
                      Work
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">
                      Other
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <IconPlaceholder lucide="TrashIcon" class="size-4" />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
