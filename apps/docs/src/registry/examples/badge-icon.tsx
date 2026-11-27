import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Badge } from "~/registry/ui/badge"

export default function BadgeIcon() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Badge>
        <IconPlaceholder
          lucide="CircleCheckIcon"
          class="size-3"
          data-icon="inline-start"
        />
        Verified
      </Badge>
      <Badge variant="secondary">
        New
        <IconPlaceholder
          lucide="ArrowRightIcon"
          class="size-3"
          data-icon="inline-end"
        />
      </Badge>
      <Badge variant="outline">
        External
        <IconPlaceholder
          lucide="ArrowUpRightIcon"
          class="size-3"
          data-icon="inline-end"
        />
      </Badge>
    </div>
  )
}
