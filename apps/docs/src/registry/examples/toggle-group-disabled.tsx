import { Bold, Italic, Underline } from "lucide-solid"

import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupDisabled() {
  return (
    <ToggleGroup disabled multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
