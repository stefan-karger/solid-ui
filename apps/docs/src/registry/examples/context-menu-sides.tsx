import { For } from "solid-js"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger
} from "~/registry/ui/context-menu"

const sides = ["top", "right", "bottom", "left"] as const

export default function ContextMenuSides() {
  return (
    <div class="grid w-full max-w-sm grid-cols-2 gap-4">
      <For each={sides}>
        {(side) => (
          <ContextMenu placement={side}>
            <ContextMenuTrigger class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
              <span class="pointer-fine:inline-block hidden">Right click ({side})</span>
              <span class="pointer-coarse:inline-block hidden">Long press ({side})</span>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuGroup>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem>Forward</ContextMenuItem>
                <ContextMenuItem>Reload</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
        )}
      </For>
    </div>
  )
}
