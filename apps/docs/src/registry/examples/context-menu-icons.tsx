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
        <span class="pointer-fine:inline-block hidden">Right click here</span>
        <span class="pointer-coarse:inline-block hidden">Long press here</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <CopyIcon />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <ScissorsIcon />
            Cut
          </ContextMenuItem>
          <ContextMenuItem>
            <ClipboardPasteIcon />
            Paste
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
