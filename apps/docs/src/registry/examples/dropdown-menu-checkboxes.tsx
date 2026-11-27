import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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
      <DropdownMenuTrigger
        render={(partProps) => <Button {...partProps} variant="outline" />}
        class="w-fit"
      >
        Checkboxes
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatusBar()}
            onCheckedChange={setShowStatusBar}
          >
            <IconPlaceholder lucide="LayoutPanelTopIcon" class="size-4" />
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar()}
            disabled
            onCheckedChange={setShowActivityBar}
          >
            <IconPlaceholder lucide="ActivityIcon" class="size-4" />
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel()}
            onCheckedChange={setShowPanel}
          >
            <IconPlaceholder lucide="PanelLeftIcon" class="size-4" />
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
