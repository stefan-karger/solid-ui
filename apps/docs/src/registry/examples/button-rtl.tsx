import { ArrowLeftIcon, ArrowRightIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { useDirection } from "~/registry/ui/direction"

export default function ButtonRtl() {
  const direction = useDirection()

  return (
    <div class="flex flex-wrap items-center gap-2" data-provider-direction={direction()}>
      <Button variant="outline">
        <ArrowLeftIcon data-icon="inline-start" />
        Previous
      </Button>
      <Button>
        Next
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  )
}
