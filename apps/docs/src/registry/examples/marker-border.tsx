import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Marker, MarkerContent, MarkerIcon } from "~/registry/ui/marker"

export default function MarkerBorderDemo() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-3 py-12">
      <Marker variant="border">
        <MarkerIcon>
          <IconPlaceholder lucide="GitBranchIcon" />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <IconPlaceholder lucide="SearchIcon" />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <IconPlaceholder lucide="FileTextIcon" />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </div>
  )
}
