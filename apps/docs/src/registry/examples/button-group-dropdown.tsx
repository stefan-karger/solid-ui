import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  TriangleAlert,
  UserRoundXIcon,
  VolumeOffIcon
} from "lucide-solid"

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
        <DropdownMenuTrigger as={Button} aria-label="More options" class="!pl-2" variant="outline">
          <ChevronDownIcon class="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <VolumeOffIcon class="size-4" />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckIcon class="size-4" />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TriangleAlert class="size-4" />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserRoundXIcon class="size-4" />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareIcon class="size-4" />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon class="size-4" />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <TrashIcon class="size-4" />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
