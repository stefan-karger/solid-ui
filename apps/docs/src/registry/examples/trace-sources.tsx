import { For } from "solid-js"

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

const sources = [
  {
    title: "Install Astro | docs.astro.build",
    href: "https://docs.astro.build/en/install-and-setup/"
  },
  {
    title: "create-astro | npmjs.com",
    href: "https://www.npmjs.com/package/create-astro"
  },
  {
    title: "Settings: minimumReleaseAge | pnpm.io",
    href: "https://pnpm.io/settings#minimumreleaseage"
  }
]

export default function TraceSources() {
  return (
    <div class="w-full max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="GlobeIcon" />
            </TraceIcon>
            <TraceTitle>Used {sources.length} sources</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <For each={sources}>
              {(source) => (
                <a href={source.href} target="_blank" rel="noreferrer">
                  <TraceLine>
                    <TraceIcon>
                      <IconPlaceholder lucide="GlobeIcon" />
                    </TraceIcon>
                    <TraceTitle>
                      {source.title}
                      <span class="sr-only"> (opens in a new tab)</span>
                    </TraceTitle>
                    <TraceIcon>
                      <IconPlaceholder lucide="ArrowUpRightIcon" />
                    </TraceIcon>
                  </TraceLine>
                </a>
              )}
            </For>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </div>
  )
}
