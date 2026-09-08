import { ActivityIcon, LayoutPanelTopIcon, PanelLeftIcon } from "lucide-solid"
import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = createSignal(true)
  const [showActivityBar, setShowActivityBar] = createSignal(false)
  const [showPanel, setShowPanel] = createSignal(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Checkboxes
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showStatusBar()} onChange={setShowStatusBar}>
            <LayoutPanelTopIcon class="size-4" />
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar()}
            disabled
            onChange={setShowActivityBar}
          >
            <ActivityIcon class="size-4" />
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPanel()} onChange={setShowPanel}>
            <PanelLeftIcon class="size-4" />
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
