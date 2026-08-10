import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/registry/ui/toggle-group"

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline" defaultValue={["all"]} multiple>
      <ToggleGroupItem value="all" aria-label="Toggle all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="Toggle missed">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
