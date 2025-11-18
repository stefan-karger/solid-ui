import { Button } from "~/registry/new-york-v4/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "~/registry/new-york-v4/ui/button-group"

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
