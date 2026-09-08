import { PencilIcon, ShareIcon, TrashIcon } from "lucide-solid"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "~/registry/ui/context-menu"

export default function ContextMenuDestructive() {
  return (
    <ContextMenu>
      <ContextMenuTrigger class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span class="hidden pointer-fine:inline-block">Right click here</span>
        <span class="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <PencilIcon class="size-4" />
            Edit
          </ContextMenuItem>
          <ContextMenuItem>
            <ShareIcon class="size-4" />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <TrashIcon class="size-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
