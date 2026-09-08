import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup defaultValue="all" variant="outline">
      <ToggleGroupItem aria-label="Toggle all" value="all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle missed" value="missed">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
