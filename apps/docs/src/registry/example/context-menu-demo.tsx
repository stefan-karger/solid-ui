import { createSignal } from "solid-js"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from "@/registry/ui/context-menu"

export default function ContextMenuDemo() {
  const [showGitLog, setShowGitLog] = createSignal(true)
  const [showHistory, setShowHistory] = createSignal(false)
  const [branch, setBranch] = createSignal("main")
  return (
    <ContextMenu>
      <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here.
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent class="w-48">
          <ContextMenuItem>
            <span>Commit</span>
            <ContextMenuShortcut>⌘+K</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <span>Push</span>
            <ContextMenuShortcut>⇧+⌘+K</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            <span>Update Project</span>
            <ContextMenuShortcut>⌘+T</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub overlap>
            <ContextMenuSubTrigger>GitHub</ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent>
                <ContextMenuItem>Create Pull Request…</ContextMenuItem>
                <ContextMenuItem>View Pull Requests</ContextMenuItem>
                <ContextMenuItem>Sync Fork</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Open on GitHub</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={showGitLog()} onChange={setShowGitLog}>
            Show Git Log
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showHistory()} onChange={setShowHistory}>
            Show History
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuGroupLabel>Branches</ContextMenuGroupLabel>
            <ContextMenuRadioGroup value={branch()} onChange={setBranch}>
              <ContextMenuRadioItem value="main">main</ContextMenuRadioItem>
              <ContextMenuRadioItem value="develop">develop</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  )
}
