import { MinusIcon, PlusIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup aria-label="Media controls" class="h-fit" orientation="vertical">
      <Button size="icon" variant="outline">
        <PlusIcon class="size-4" />
      </Button>
      <Button size="icon" variant="outline">
        <MinusIcon class="size-4" />
      </Button>
    </ButtonGroup>
  )
}
