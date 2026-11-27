import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "~/registry/ui/trace"

export default function TraceStatic() {
  return (
    <Trace class="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="GitBranchIcon" />
        </TraceIcon>
        <TraceTitle>Created branch fix/frozen-lockfile</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
