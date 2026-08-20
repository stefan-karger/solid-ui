import { Button } from "~/registry/ui/button"
import { Spinner } from "~/registry/ui/spinner"

export default function ButtonSpinner() {
  return (
    <div class="flex gap-2">
      <Button disabled variant="outline">
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
      <Button disabled variant="secondary">
        Downloading
        <Spinner data-icon="inline-end" />
      </Button>
    </div>
  )
}
