import { IconPlus } from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"
import { ButtonGroup } from "~/registry/v1/ui/button-group"

export default function ButtonGroupSize() {
  return (
    <div class="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="sm" variant="outline">
          Button
        </Button>
        <Button size="sm" variant="outline">
          Group
        </Button>
        <Button size="icon-sm" variant="outline">
          <IconPlus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button size="icon" variant="outline">
          <IconPlus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button size="lg" variant="outline">
          Button
        </Button>
        <Button size="lg" variant="outline">
          Group
        </Button>
        <Button size="icon-lg" variant="outline">
          <IconPlus />
        </Button>
      </ButtonGroup>
    </div>
  )
}
