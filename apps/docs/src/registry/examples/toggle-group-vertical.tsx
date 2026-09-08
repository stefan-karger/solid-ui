import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-solid"

import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupVertical() {
  return (
    <ToggleGroup multiple orientation="vertical" spacing={1} defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
