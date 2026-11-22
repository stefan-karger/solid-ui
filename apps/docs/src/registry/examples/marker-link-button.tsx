import { GitBranchIcon, RotateCcwIcon } from "lucide-solid"

import { Marker, MarkerContent, MarkerIcon } from "~/registry/ui/marker"
import { Toaster, createToaster } from "~/registry/ui/toast"

export default function MarkerLinkButtonDemo() {
  const toast = createToaster()
  return (
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Toaster toaster={toast} />
      <Marker
        render={(partProps) => (
          <a {...partProps} href="#links-and-buttons">
            <MarkerIcon>
              <GitBranchIcon />
            </MarkerIcon>
            <MarkerContent>View the pull request</MarkerContent>
          </a>
        )}
      />
      <Marker
        render={(partProps) => (
          <button
            {...partProps}
            type="button"
            class={`${partProps.class} transition-colors hover:text-foreground`}
            onClick={() => toast("You clicked the revert button")}
          >
            <MarkerIcon>
              <RotateCcwIcon />
            </MarkerIcon>
            <MarkerContent>Revert this change</MarkerContent>
          </button>
        )}
      />
    </div>
  )
}
