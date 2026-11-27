import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Toggle } from "~/registry/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <IconPlaceholder
        lucide="BookmarkIcon"
        class="group-data-pressed/toggle:fill-foreground"
      />
      Bookmark
    </Toggle>
  )
}
