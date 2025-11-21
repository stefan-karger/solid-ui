import { A } from "@solidjs/router"

import { IconArrowRight } from "~/components/icons"
import { Badge } from "~/registry/v1/ui/badge"

export function Announcement() {
  return (
    <Badge as={A} class="bg-transparent" href="/docs/changelog" variant="secondary">
      <span class="flex size-2 rounded-full bg-blue-500" title="New" />
      New Components: Field, Input Group, Item and more <IconArrowRight />
    </Badge>
  )
}
