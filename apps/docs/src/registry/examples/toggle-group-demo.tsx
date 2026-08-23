import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-solid"

import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline">
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle strikethrough" value="strikethrough">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
