import { createSignal } from "solid-js"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "~/registry/ui/context-menu"

export default function ContextMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = createSignal(true)
  const [showActivityBar, setShowActivityBar] = createSignal(false)
  const [showPanel, setShowPanel] = createSignal(false)

  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent class="w-56">
        <ContextMenuLabel>Appearance</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={showStatusBar()} onChange={setShowStatusBar}>
          Status Bar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={showActivityBar()} disabled onChange={setShowActivityBar}>
          Activity Bar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={showPanel()} onChange={setShowPanel}>
          Panel
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
