import { Badge } from "~/registry/ui/badge"
import { Spinner } from "~/registry/ui/spinner"

export default function SpinnerBadge() {
  return (
    <div class="flex items-center gap-2">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Loading
      </Badge>
    </div>
  )
}
