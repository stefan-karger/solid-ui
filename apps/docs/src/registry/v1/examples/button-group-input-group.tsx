import { createSignal } from "solid-js"

import { IconAudioLines, IconPlus } from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"
import { ButtonGroup } from "~/registry/v1/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/v1/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/v1/ui/tooltip"

export default function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = createSignal(false)

  return (
    <ButtonGroup class="[--radius:9999rem]">
      <ButtonGroup>
        <Button size="icon" variant="outline">
          <IconPlus />
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
              <InputGroupButton
                aria-pressed={voiceEnabled}
                as={TooltipTrigger}
                class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                data-active={voiceEnabled}
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                size="icon-xs"
              >
                <IconAudioLines />
              </InputGroupButton>

              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
