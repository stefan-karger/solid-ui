import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function DropdownMenuRadioGroupExample() {
  const [position, setPosition] = createSignal("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(partProps) => <Button {...partProps} variant="outline" />}
        class="w-fit"
      >
        Panel Position
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Placement</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            onValueChange={setPosition}
            value={position()}
          >
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right" disabled>
              Right
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
