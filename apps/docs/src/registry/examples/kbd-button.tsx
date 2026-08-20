import { Button } from "~/registry/ui/button"
import { Kbd } from "~/registry/ui/kbd"

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd class="translate-x-0.5" data-icon="inline-end">
        ⏎
      </Kbd>
    </Button>
  )
}
