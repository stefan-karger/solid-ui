import { ArrowUpIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonSizes() {
  return (
    <div class="flex flex-col items-start gap-8 sm:flex-row">
      <div class="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button aria-label="Submit" size="icon-sm" variant="outline">
          <ArrowUpIcon />
        </Button>
      </div>
      <div class="flex items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button aria-label="Submit" size="icon" variant="outline">
          <ArrowUpIcon />
        </Button>
      </div>
      <div class="flex items-start gap-2">
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button aria-label="Submit" size="icon-lg" variant="outline">
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  )
}
