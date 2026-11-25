import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { Kbd, KbdGroup } from "~/registry/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function KbdTooltip() {
  return (
    <div class="flex flex-wrap gap-4">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger
            render={(partProps) => <Button {...partProps} variant="outline" />}
          >
            Save
          </TooltipTrigger>
          <TooltipContent>
            Save Changes <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={(partProps) => <Button {...partProps} variant="outline" />}
          >
            Print
          </TooltipTrigger>
          <TooltipContent>
            Print Document{" "}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
