import { Button } from "~/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function TooltipDisabled() {
  return (
    <Tooltip>
      <TooltipTrigger as="span" class="inline-block w-fit">
        <Button variant="outline" disabled>
          Disabled
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  )
}
