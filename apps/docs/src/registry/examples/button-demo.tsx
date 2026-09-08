import { ArrowUpIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonDemo() {
  return (
    <div class="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
