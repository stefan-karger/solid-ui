import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "~/registry/ui/button-group"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator class="" />
      <Button size="icon" variant="secondary">
        <IconPlaceholder lucide="PlusIcon" class="size-4" />
      </Button>
    </ButtonGroup>
  )
}
