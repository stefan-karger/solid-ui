import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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
      <DropdownMenuTrigger
        render={(partProps) => <Button {...partProps} variant="outline" />}
        class="w-fit"
      >
        Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconPlaceholder lucide="PencilIcon" class="size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlaceholder lucide="ShareIcon" class="size-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconPlaceholder lucide="ArchiveIcon" class="size-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <IconPlaceholder lucide="TrashIcon" class="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
