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
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Panel Position
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Placement</DropdownMenuLabel>
          <DropdownMenuRadioGroup onChange={setPosition} value={position()}>
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
