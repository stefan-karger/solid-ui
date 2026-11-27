import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Marker, MarkerContent, MarkerIcon } from "~/registry/ui/marker"

export default function MarkerIconDemo() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-12 py-12">
      <Marker>
        <MarkerIcon>
          <IconPlaceholder lucide="GitBranchIcon" />
        </MarkerIcon>
        <MarkerContent>Switched to a new branch</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <IconPlaceholder lucide="SearchIcon" />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
      <Marker class="flex-col">
        <MarkerIcon>
          <IconPlaceholder lucide="BookOpenCheckIcon" />
        </MarkerIcon>
        <MarkerContent>Syncing completed</MarkerContent>
      </Marker>
    </div>
  )
}
