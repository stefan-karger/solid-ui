import { createSignal } from "solid-js"

import { AudioLinesIcon, PlusIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = createSignal(false)

  return (
    <ButtonGroup class="[--radius:9999rem]">
      <ButtonGroup>
        <Button size="icon" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            disabled={voiceEnabled()}
            placeholder={voiceEnabled() ? "Record and send audio..." : "Send a message..."}
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger
                aria-pressed={voiceEnabled}
                as={InputGroupButton}
                class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                data-active={voiceEnabled}
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                size="icon-xs"
              >
                <AudioLinesIcon />
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
