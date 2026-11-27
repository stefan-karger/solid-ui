import { For } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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

const steps = [
  "Add a dark variant to the theme tokens",
  "Read the theme from a cookie on the server",
  "Add a toggle to the settings page",
  "Check contrast on the charts"
]

export default function PlanDescription() {
  return (
    <Trace class="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="RouteIcon" />
            </TraceIcon>
            <TraceTitle>Plan: add dark mode</TraceTitle>
            <TraceDescription>1 of {steps.length} done</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="flex flex-col gap-3">
          <p>
            Store the theme in a cookie so the server renders the right one and
            the page does not flash on load.
          </p>
          <Trace>
            {
              <For each={steps}>
                {(step, index) => (
                  <TraceLine status={index() > 0 ? "pending" : undefined}>
                    <TraceIcon>
                      {index() === 0 ? (
                        <IconPlaceholder lucide="CircleCheckIcon" />
                      ) : (
                        <IconPlaceholder lucide="CircleIcon" />
                      )}
                    </TraceIcon>
                    <TraceTitle>{step}</TraceTitle>
                  </TraceLine>
                )}
              </For>
            }
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
