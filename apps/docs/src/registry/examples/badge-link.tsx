import { ArrowUpRightIcon } from "lucide-solid"

import { Badge } from "~/registry/ui/badge"

export default function BadgeAsLink() {
  return (
    <Badge as="a" href="#link">
      Open Link <ArrowUpRightIcon data-icon="inline-end" />
    </Badge>
  )
}
