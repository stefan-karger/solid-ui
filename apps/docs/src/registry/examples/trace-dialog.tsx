// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For } from "solid-js"

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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </TraceIcon>
            <TraceTitle>Searched the web for cache keys</TraceTitle>
            <TraceIcon>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                    </TraceIcon>
                    <TraceTitle>
                      {result.title}
                      <span class="sr-only"> (opens in a new tab)</span>
                    </TraceTitle>
                    <TraceIcon>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
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
