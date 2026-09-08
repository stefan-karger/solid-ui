import { LoaderCircleIcon, LoaderIcon, RefreshCwIcon } from "lucide-solid"

import { Badge } from "~/registry/ui/badge"

export default function BadgeSpinner() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Badge>
        <LoaderCircleIcon class="size-3 animate-spin" data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <LoaderIcon class="size-3 animate-spin" data-icon="inline-start" />
        Processing
      </Badge>
      <Badge variant="destructive">
        <RefreshCwIcon class="size-3 animate-spin" data-icon="inline-start" />
        Retrying
      </Badge>
    </div>
  )
}
