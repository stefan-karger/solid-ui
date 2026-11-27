import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Badge } from "~/registry/ui/badge"
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

export default function SubagentDetails() {
  return (
    <Trace class="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="CircleCheckIcon" />
            </TraceIcon>
            <TraceTitle>Ran the research agent</TraceTitle>
            <TraceDescription>48s</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="flex flex-col gap-3">
          <div class="flex flex-wrap gap-1.5">
            <Badge variant="secondary">anthropic/claude-sonnet-4.5</Badge>
            <Badge variant="outline" class="font-mono">
              runCommand
            </Badge>
          </div>
          <p>Find out why image optimization reruns on every deploy.</p>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder lucide="CircleCheckIcon" />
              </TraceIcon>
              <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
            </TraceLine>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder lucide="CircleCheckIcon" />
              </TraceIcon>
              <TraceTitle>
                Ran sed -n 13,15p scripts/optimize-images.ts
              </TraceTitle>
            </TraceLine>
          </Trace>
          <p>The cache is keyed on the commit SHA.</p>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
