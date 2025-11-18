import { IconPlus } from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "~/registry/v1/ui/button-group"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <IconPlus />
      </Button>
    </ButtonGroup>
  )
}
