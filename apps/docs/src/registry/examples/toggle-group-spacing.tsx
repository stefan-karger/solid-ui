import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupSpacing() {
  return (
    <ToggleGroup defaultValue="top" size="sm" spacing={2} variant="outline">
      <ToggleGroupItem aria-label="Toggle top" value="top">
        Top
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle bottom" value="bottom">
        Bottom
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle left" value="left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle right" value="right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
