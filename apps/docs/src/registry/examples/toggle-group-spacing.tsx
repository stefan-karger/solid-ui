import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/registry/ui/toggle-group"

export default function ToggleGroupSpacing() {
  return (
    <ToggleGroup size="sm" defaultValue={["top"]} variant="outline" spacing={2} multiple>
      <ToggleGroupItem value="top" aria-label="Toggle top">
        Top
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
        Bottom
      </ToggleGroupItem>
      <ToggleGroupItem value="left" aria-label="Toggle left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Toggle right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  )
}