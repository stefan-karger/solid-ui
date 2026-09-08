import { SearchIcon } from "lucide-solid"

import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"

export default function InputGroupDemo() {
  return (
    <InputGroup class="max-w-xs">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon class="size-4 text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}
