import { ChevronDownIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { Card, CardContent } from "~/registry/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/registry/ui/collapsible"

export default function CollapsibleBasic() {
  return (
    <Card class="mx-auto w-full max-w-sm">
      <CardContent>
        <Collapsible class="rounded-md data-[expanded]:bg-muted">
          <CollapsibleTrigger as={Button} class="w-full" variant="ghost">
            Product details
            <ChevronDownIcon class="ml-auto transition-transform group-data-[expanded]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent class="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
            <div>This panel can be expanded or collapsed to reveal additional content.</div>
            <Button size="xs">Learn More</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
