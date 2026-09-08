import { SearchIcon } from "lucide-solid"

import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"
import { Kbd } from "~/registry/ui/kbd"

export default function KbdInputGroup() {
  return (
    <div class="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon class="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
