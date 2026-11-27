import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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
            <IconPlaceholder lucide="CopyIcon" class="size-4" />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <IconPlaceholder lucide="ScissorsIcon" class="size-4" />
            Cut
          </ContextMenuItem>
          <ContextMenuItem>
            <IconPlaceholder lucide="ClipboardPasteIcon" class="size-4" />
            Paste
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <IconPlaceholder lucide="TrashIcon" class="size-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
