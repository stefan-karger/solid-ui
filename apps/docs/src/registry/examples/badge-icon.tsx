import { BadgeCheck, BookmarkIcon } from "lucide-solid"

import { Badge } from "~/registry/ui/badge"

export default function BadgeIcon() {
  return (
    <div class="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <BadgeCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="outline">
        Bookmark
        <BookmarkIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}
