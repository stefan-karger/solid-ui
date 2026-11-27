import { For } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "~/registry/ui/trace"

const results = [
  {
    title: "Caching build outputs",
    url: "https://nextjs.org/docs/app/guides/caching"
  },
  {
    title: "Image optimization reference",
    url: "https://nextjs.org/docs/app/api-reference/components/image"
  },
  {
    title: "Deploy hooks and cache keys",
    url: "https://vercel.com/docs/deploy-hooks"
  }
]

export default function TraceDialog() {
  return (
    <Trace class="max-w-sm">
      <Dialog>
        <DialogTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="GlobeIcon" />
            </TraceIcon>
            <TraceTitle>Searched the web for cache keys</TraceTitle>
            <TraceIcon>
              <IconPlaceholder lucide="ChevronRightIcon" />
            </TraceIcon>
          </TraceLine>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Searched the web for cache keys</DialogTitle>
            <DialogDescription>
              Three results were used in the response.
            </DialogDescription>
          </DialogHeader>
          <Trace>
            <For each={results}>
              {(result) => (
                <a href={result.url} target="_blank" rel="noreferrer">
                  <TraceLine>
                    <TraceIcon>
                      <IconPlaceholder lucide="GlobeIcon" />
                    </TraceIcon>
                    <TraceTitle>
                      {result.title}
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
        </DialogContent>
      </Dialog>
    </Trace>
  )
}
