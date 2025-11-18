import { IconSearch } from "~/components/icons"
import { Button } from "~/registry/new-york-v4/ui/button"
import { ButtonGroup } from "~/registry/new-york-v4/ui/button-group"
import { Input } from "~/registry/new-york-v4/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button aria-label="Search" variant="outline">
        <IconSearch />
      </Button>
    </ButtonGroup>
  )
}
