import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Marker, MarkerContent, MarkerIcon } from "~/registry/ui/marker"
import { Spinner } from "~/registry/ui/spinner"

export default function MarkerDemo() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker>
        <MarkerIcon>
          <IconPlaceholder lucide="GitBranchIcon" />
        </MarkerIcon>
        <MarkerContent>Switched to a new branch</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent class="shimmer">Thinking...</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <IconPlaceholder lucide="SearchIcon" />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
    </div>
  )
}
