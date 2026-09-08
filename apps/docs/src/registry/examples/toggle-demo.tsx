import { BookmarkIcon } from "lucide-solid"

import { Toggle } from "~/registry/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <BookmarkIcon class="group-data-pressed/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  )
}
