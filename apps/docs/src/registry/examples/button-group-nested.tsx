import { AudioLinesIcon, PlusIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <Tooltip>
            <TooltipTrigger as={InputGroupAddon} align="inline-end">
              <AudioLinesIcon />
            </TooltipTrigger>
            <TooltipContent>Voice Mode</TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
