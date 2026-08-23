import { ArrowUpIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonRounded() {
  return (
    <Button class="rounded-full" size="icon" variant="outline">
      <ArrowUpIcon />
    </Button>
  )
}
