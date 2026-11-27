import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Badge } from "~/registry/ui/badge"

export default function BadgeAsLink() {
  return (
    <Badge as="a" href="#link">
      Open Link{" "}
      <IconPlaceholder lucide="ArrowUpRightIcon" data-icon="inline-end" />
    </Badge>
  )
}
