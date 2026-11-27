import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={(partProps) => <Button {...partProps} variant="outline" />}
          aria-label="More options"
          class="!pl-2"
        >
          <IconPlaceholder lucide="ChevronDownIcon" class="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconPlaceholder lucide="VolumeOffIcon" class="size-4" />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="CheckIcon" class="size-4" />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="TriangleExclamationPointIcon"
                class="size-4"
              />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="UserRoundXIcon" class="size-4" />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="ShareIcon" class="size-4" />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="CopyIcon" class="size-4" />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder lucide="TrashIcon" class="size-4" />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
