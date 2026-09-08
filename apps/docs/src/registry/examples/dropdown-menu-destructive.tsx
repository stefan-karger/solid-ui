import { ArchiveIcon, PencilIcon, ShareIcon, TrashIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function DropdownMenuDestructive() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <PencilIcon class="size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShareIcon class="size-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ArchiveIcon class="size-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <TrashIcon class="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
