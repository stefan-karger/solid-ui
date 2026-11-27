import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { Kbd } from "~/registry/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function TooltipKeyboard() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={(partProps) => (
          <Button {...partProps} variant="outline" size="icon-sm" />
        )}
      >
        <IconPlaceholder lucide="SaveIcon" />
      </TooltipTrigger>
      <TooltipContent>
        Save Changes <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
