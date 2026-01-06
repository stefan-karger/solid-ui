import { createSignal } from "solid-js"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "~/registry/ui/context-menu"

export default function ContextMenuRadioGroupDemo() {
  const [position, setPosition] = createSignal("bottom")

  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent class="w-56">
        <ContextMenuLabel>Panel Position</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup onChange={setPosition} value={position()}>
          <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
          <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
          <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
