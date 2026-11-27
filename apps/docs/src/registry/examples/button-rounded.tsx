import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"

export default function ButtonRounded() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button class="rounded-full" size="sm">
        Rounded
      </Button>
      <Button class="rounded-full" variant="secondary">
        Rounded Secondary
      </Button>
      <Button class="rounded-full" size="icon" variant="outline">
        <IconPlaceholder lucide="SearchIcon" class="size-4" />
        <span class="sr-only">Search</span>
      </Button>
    </div>
  )
}
