// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import { Trace, TraceIcon, TraceLine, TraceTitle } from "~/registry/ui/trace"

export default function TraceStatic() {
  return (
    <Trace class="max-w-sm">
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
            <path d="M15 6a9 9 0 0 0-9 9V3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
          </svg>
        </TraceIcon>
        <TraceTitle>Created branch fix/frozen-lockfile</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
