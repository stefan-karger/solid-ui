import { ArrowRightIcon, ArrowUpRightIcon, CircleCheckIcon } from "lucide-solid"

import { Badge } from "~/registry/ui/badge"

export default function BadgeIcon() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Badge>
        <CircleCheckIcon class="size-3" data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="secondary">
        New
        <ArrowRightIcon class="size-3" data-icon="inline-end" />
      </Badge>
      <Badge variant="outline">
        External
        <ArrowUpRightIcon class="size-3" data-icon="inline-end" />
      </Badge>
    </div>
  )
}
