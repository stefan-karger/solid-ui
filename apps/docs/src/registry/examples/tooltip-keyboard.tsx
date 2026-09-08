import { SaveIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { Kbd } from "~/registry/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function TooltipKeyboard() {
  return (
    <Tooltip>
      <TooltipTrigger as={Button} variant="outline" size="icon-sm">
        <SaveIcon />
      </TooltipTrigger>
      <TooltipContent>
        Save Changes <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
