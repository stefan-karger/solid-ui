import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { CodeBlock, CodeBlockContent } from "~/registry/ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

export default function TraceOpen() {
  const [open, setOpen] = createSignal(false)

  return (
    <div class="flex w-full max-w-sm flex-col items-start gap-4">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="TerminalIcon" />
            </TraceIcon>
            <TraceTitle>Ran node --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap class="max-h-64">
              {"$ node --version\nv24.18.0"}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible open={open()} onOpenChange={setOpen}>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="TerminalIcon" />
            </TraceIcon>
            <TraceTitle>Ran pnpm --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap class="max-h-64">
              {"$ pnpm --version\n10.33.4"}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <Button variant="outline" size="sm" onClick={() => setOpen(!open())}>
        {open() ? "Hide" : "Show"} the pnpm output
      </Button>
    </div>
  )
}
