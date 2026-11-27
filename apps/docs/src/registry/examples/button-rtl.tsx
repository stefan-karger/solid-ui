import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { useDirection } from "~/registry/ui/direction"

export default function ButtonRtl() {
  const direction = useDirection()

  return (
    <div
      class="flex flex-wrap items-center gap-2"
      data-provider-direction={direction()}
    >
      <Button variant="outline">
        <IconPlaceholder lucide="ArrowLeftIcon" data-icon="inline-start" />
        Previous
      </Button>
      <Button>
        Next
        <IconPlaceholder lucide="ArrowRightIcon" data-icon="inline-end" />
      </Button>
    </div>
  )
}
