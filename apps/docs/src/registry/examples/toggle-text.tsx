import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Toggle } from "~/registry/ui/toggle"

export default function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <IconPlaceholder lucide="ItalicIcon" />
      Italic
    </Toggle>
  )
}
