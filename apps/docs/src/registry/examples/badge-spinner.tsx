import { Badge } from "~/registry/ui/badge"
import { Spinner } from "~/registry/ui/spinner"

export default function BadgeSpinner() {
  return (
    <div class="flex flex-wrap gap-2">
      <Badge variant="destructive">
        <Spinner data-icon="inline-start" />
        Deleting
      </Badge>
      <Badge variant="secondary">
        Generating
        <Spinner data-icon="inline-end" />
      </Badge>
    </div>
  )
}
