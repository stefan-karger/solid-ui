import { Button } from "~/registry/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "~/registry/ui/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button size="sm" variant="secondary">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button size="sm" variant="secondary">
        Paste
      </Button>
    </ButtonGroup>
  )
}
