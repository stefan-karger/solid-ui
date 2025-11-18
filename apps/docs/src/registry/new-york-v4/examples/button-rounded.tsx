import { IconArrowUp } from "~/components/icons"
import { Button } from "~/registry/new-york-v4/ui/button"

export default function ButtonRounded() {
  return (
    <Button class="rounded-full" size="icon" variant="outline">
      <IconArrowUp />
    </Button>
  )
}
