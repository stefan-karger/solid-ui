import { GitBranchIcon, RotateCcwIcon } from "lucide-solid"

import { Marker, MarkerContent, MarkerIcon } from "~/registry/ui/marker"

export default function MarkerLinkButtonDemo() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker as={"a"} href="#links-and-buttons">
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>View the pull request</MarkerContent>
      </Marker>
      <Marker as={"button"} class="transition-colors hover:text-foreground" onClick={() => alert("You clicked the revert button")}>
        <MarkerIcon>
          <RotateCcwIcon />
        </MarkerIcon>
        <MarkerContent>Revert this change</MarkerContent>
      </Marker>
    </div>
  )
}
