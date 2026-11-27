import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "~/registry/ui/trace"

export default function TraceLink() {
  return (
    <Trace class="max-w-sm">
      <a href="#link">
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder lucide="FileTextIcon" />
          </TraceIcon>
          <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
          <TraceIcon>
            <IconPlaceholder lucide="ChevronRightIcon" />
          </TraceIcon>
        </TraceLine>
      </a>
      <a
        href="https://docs.astro.build/en/install-and-setup/"
        target="_blank"
        rel="noreferrer"
      >
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder lucide="GlobeIcon" />
          </TraceIcon>
          <TraceTitle>
            Install Astro | docs.astro.build
            <span class="sr-only"> (opens in a new tab)</span>
          </TraceTitle>
          <TraceIcon>
            <IconPlaceholder lucide="ArrowUpRightIcon" />
          </TraceIcon>
        </TraceLine>
      </a>
    </Trace>
  )
}
