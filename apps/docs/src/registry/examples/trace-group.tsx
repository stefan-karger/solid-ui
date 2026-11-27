import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "~/registry/ui/trace"

export default function TraceGroupDemo() {
  return (
    <Trace class="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="SearchIcon" />
        </TraceIcon>
        <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="FileTextIcon" />
        </TraceIcon>
        <TraceTitle>Read pnpm-workspace.yaml</TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="TerminalIcon" />
        </TraceIcon>
        <TraceTitle>Ran pnpm install</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
