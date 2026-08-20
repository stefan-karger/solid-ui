import { BracesIcon, CopyIcon, CornerDownLeftIcon, RefreshCwIcon } from "lucide-solid"

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
            Run <CornerDownLeftIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" class="border-b">
          <InputGroupText class="font-medium font-mono">
            <BracesIcon />
            script.js
          </InputGroupText>
          <InputGroupButton aria-label="Refresh" class="ml-auto" size="icon-xs">
            <RefreshCwIcon />
          </InputGroupButton>
          <InputGroupButton aria-label="Copy" size="icon-xs" variant="ghost">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
