import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { CodeBlock, CodeBlockContent } from "~/registry/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

export default function ToolStates() {
  return (
    <Trace class="max-w-sm">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="TerminalIcon" />
            </TraceIcon>
            <TraceTitle>Ran git status --short</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap class="max-h-64">
              {` M app/api/chat/route.ts
 M components/chat.tsx`}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <IconPlaceholder lucide="TerminalIcon" />
            </TraceIcon>
            <TraceTitle>Failed to run pnpm dev</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap class="max-h-64">
              Command timed out after 120 seconds.
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="TerminalIcon" />
        </TraceIcon>
        <TraceTitle>Denied rm -rf dist</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <IconPlaceholder lucide="TerminalIcon" />
        </TraceIcon>
        <TraceTitle>Running pnpm test</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
