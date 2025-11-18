import { IconArrowUp } from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"

export default function ButtonDemo() {
  return (
    <div class="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button aria-label="Submit" size="icon" variant="outline">
        <IconArrowUp />
      </Button>
    </div>
  )
}
