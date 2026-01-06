import { SearchIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { Input } from "~/registry/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button aria-label="Search" variant="outline">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
