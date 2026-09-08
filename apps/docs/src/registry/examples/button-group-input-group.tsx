import { AudioLinesIcon, PlusIcon } from "lucide-solid"
import { createSignal } from "solid-js"

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
        <Button aria-label="Add" size="icon" variant="outline">
          <PlusIcon class="size-4" />
        </Button>
      </ButtonGroup>
      <ButtonGroup class="flex-1">
        <InputGroup>
          <InputGroupInput
            disabled={voiceEnabled()}
            placeholder={voiceEnabled() ? "Record and send audio..." : "Send a message..."}
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger
                aria-label="Voice Mode"
                aria-pressed={voiceEnabled() ? "true" : "false"}
                as={InputGroupButton}
                class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                data-active={voiceEnabled()}
                onClick={() => setVoiceEnabled((value) => !value)}
                size="icon-xs"
              >
                <AudioLinesIcon class="size-4" />
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
