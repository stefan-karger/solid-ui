import {
  IconAlertTriangle,
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconShare,
  IconTrash,
  IconUserRoundX,
  IconVolumeOff
} from "~/components/icons"
import { Button } from "~/registry/new-york-v4/ui/button"
import { ButtonGroup } from "~/registry/new-york-v4/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/new-york-v4/ui/dropdown-menu"

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu placement="bottom-end">
        <Button as={DropdownMenuTrigger} class="!pl-2" variant="outline">
          <IconChevronDown />
        </Button>
        <DropdownMenuContent class="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconVolumeOff />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconCheck />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconAlertTriangle />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconUserRoundX />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconShare />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconCopy />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <IconTrash />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
