import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Toggle } from "~/registry/ui/toggle"

export default function ToggleOutline() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle italic">
        <IconPlaceholder lucide="ItalicIcon" />
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <IconPlaceholder lucide="LetterBIcon" />
        Bold
      </Toggle>
    </div>
  )
}
