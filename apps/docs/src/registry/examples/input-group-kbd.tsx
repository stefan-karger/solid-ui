import { SearchIcon } from "lucide-solid"

import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"
import { Kbd } from "~/registry/ui/kbd"

export default function InputGroupKbd() {
  return (
    <InputGroup class="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon class="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
