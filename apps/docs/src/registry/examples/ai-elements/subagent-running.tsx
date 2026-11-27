import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

export default function SubagentRunning() {
  return (
    <Trace class="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="running">
            <TraceIcon>
              <IconPlaceholder lucide="LoaderCircleIcon" class="animate-spin" />
            </TraceIcon>
            <TraceTitle>Running the research agent</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder lucide="CircleCheckIcon" />
              </TraceIcon>
              <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
            </TraceLine>
            <TraceLine status="running">
              <TraceIcon>
                <IconPlaceholder
                  lucide="LoaderCircleIcon"
                  class="animate-spin"
                />
              </TraceIcon>
              <TraceTitle>
                Running sed -n 13,15p scripts/optimize-images.ts
              </TraceTitle>
            </TraceLine>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
