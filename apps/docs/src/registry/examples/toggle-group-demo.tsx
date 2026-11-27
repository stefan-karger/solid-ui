import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline" multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <IconPlaceholder lucide="LetterBIcon" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <IconPlaceholder lucide="ItalicIcon" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <IconPlaceholder lucide="UnderlineIcon" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
