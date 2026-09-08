import { CodeIcon, CopyIcon, CornerDownLeftIcon, RefreshCwIcon } from "lucide-solid"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea
} from "~/registry/ui/input-group"

export default function InputGroupTextareaExample() {
  return (
    <div class="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          class="min-h-[200px]"
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
        />
        <InputGroupAddon align="block-end" class="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton class="ml-auto" size="sm" variant="default">
            Run
            <CornerDownLeftIcon class="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" class="border-b">
          <InputGroupText class="font-mono font-medium">
            <CodeIcon class="size-4" />
            script.js
          </InputGroupText>
          <InputGroupButton class="ml-auto" size="icon-xs">
            <RefreshCwIcon class="size-4" />
          </InputGroupButton>
          <InputGroupButton size="icon-xs" variant="ghost">
            <CopyIcon class="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
