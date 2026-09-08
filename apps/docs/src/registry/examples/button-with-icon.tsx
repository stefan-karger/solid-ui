import { ChevronRightIcon, SearchIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonWithIcon() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button>
        <SearchIcon class="size-4" />
        Search
      </Button>
      <Button variant="outline">
        Continue
        <ChevronRightIcon class="size-4" />
      </Button>
    </div>
  )
}
