import { IconMinus, IconPlus } from "~/components/icons"
import { Button } from "~/registry/new-york-v4/ui/button"
import { ButtonGroup } from "~/registry/new-york-v4/ui/button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup aria-label="Media controls" class="h-fit" orientation="vertical">
      <Button size="icon" variant="outline">
        <IconPlus />
      </Button>
      <Button size="icon" variant="outline">
        <IconMinus />
      </Button>
    </ButtonGroup>
  )
}
