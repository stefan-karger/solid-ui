import { CircleCheckIcon } from "lucide-solid"

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

export default function ReasoningDuration() {
  return (
    <Trace class="max-w-sm">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Thought</TraceTitle>
            <TraceDescription>12s</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="whitespace-pre-wrap">
          The build log shows install and compile finish in under a minute.
          Image optimization takes almost four, and it reruns on every deploy
          because the cache key includes the commit hash.
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
