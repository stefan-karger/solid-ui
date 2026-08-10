import {  BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-solid"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/registry/ui/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}