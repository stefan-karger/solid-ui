import { ClipboardPasteIcon, CopyIcon, ScissorsIcon, TrashIcon } from "lucide-solid"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "~/registry/ui/context-menu"

export default function ContextMenuIcons() {
  return (
    <ContextMenu>
      <ContextMenuTrigger class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span class="hidden pointer-fine:inline-block">Right click here</span>
        <span class="hidden pointer-coarse:inline-block">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <CopyIcon class="size-4" />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <ScissorsIcon class="size-4" />
            Cut
          </ContextMenuItem>
          <ContextMenuItem>
            <ClipboardPasteIcon class="size-4" />
            Paste
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
