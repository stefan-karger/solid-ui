import { ButtonGroup, ButtonGroupText } from "~/registry/ui/button-group"
import { Input } from "~/registry/ui/input"
import { Label } from "~/registry/ui/label"

export default function ButtonGroupTextExample() {
  return (
    <ButtonGroup>
      <ButtonGroupText as={Label} for="button-group-text-input">
        GPU Size
      </ButtonGroupText>
      <Input id="button-group-text-input" placeholder="Type something here..." />
    </ButtonGroup>
  )
}
