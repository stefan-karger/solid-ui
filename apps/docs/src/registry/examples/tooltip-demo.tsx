import { Button } from "~/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger as={Button} variant="outline">
        Hover
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  )
}
