/** biome-ignore-all lint/a11y/useValidAnchor: <example file> */
import { ArrowUpRightIcon } from "lucide-solid"

import { Badge } from "~/registry/ui/badge"

export default function BadgeLink() {
  return (
    <Badge as="a" href="#link">
      Open Link <ArrowUpRightIcon data-icon="inline-end" />
    </Badge>
  )
}
