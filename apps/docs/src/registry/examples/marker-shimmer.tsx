import { Marker, MarkerContent } from "~/registry/ui/marker"

export default function MarkerShimmer() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker role="status">
        <MarkerContent class="shimmer">Thinking...</MarkerContent>
      </Marker>
      <Marker role="status" variant="separator">
        <MarkerContent class="shimmer">Reading 4 files</MarkerContent>
      </Marker>
    </div>
  )
}
