import { Button } from "~/registry/ui/button"
import { Kbd } from "~/registry/ui/kbd"

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd data-icon="inline-end" class="translate-x-0.5">
        ⏎
      </Kbd>
    </Button>
  )
}
