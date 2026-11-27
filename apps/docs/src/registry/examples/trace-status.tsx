import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "~/registry/ui/trace"

export default function TraceStatus() {
  return (
    <Trace class="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="CircleCheckIcon" />
        </TraceIcon>
        <TraceTitle>Ran pnpm install</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <IconPlaceholder lucide="CircleExclamationPointIcon" />
        </TraceIcon>
        <TraceTitle>Failed to run pnpm lint</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <IconPlaceholder lucide="LoaderCircleIcon" class="animate-spin" />
        </TraceIcon>
        <TraceTitle>Running pnpm build</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <IconPlaceholder lucide="CircleIcon" />
        </TraceIcon>
        <TraceTitle>Run pnpm test</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
