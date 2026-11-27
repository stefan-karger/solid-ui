import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupVertical() {
  return (
    <ToggleGroup
      multiple
      orientation="vertical"
      spacing={1}
      defaultValue={["bold", "italic"]}
    >
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <IconPlaceholder lucide="LetterBIcon" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <IconPlaceholder lucide="ItalicIcon" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <IconPlaceholder lucide="UnderlineIcon" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
