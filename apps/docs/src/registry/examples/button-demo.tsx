import { ArrowUpIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonDemo() {
  return (
    <div class="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button aria-label="Submit" size="icon" variant="outline">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
