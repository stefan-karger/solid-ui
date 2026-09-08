import { LoaderCircleIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonSpinner() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button disabled>
        <LoaderCircleIcon class="size-4 animate-spin" />
        Saving...
      </Button>
      <Button disabled size="icon" variant="outline">
        <LoaderCircleIcon class="size-4 animate-spin" />
        <span class="sr-only">Loading</span>
      </Button>
    </div>
  )
}
