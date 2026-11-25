// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { createSignal, onCleanup, Show } from "solid-js"

import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { Message, MessageContent } from "~/registry/ui/message"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

const reasoning =
  "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash."

export default function TraceThinking() {
  const [progress, setProgress] = createSignal(-1)
  const [expanded, setExpanded] = createSignal<boolean>()
  const running = () => progress() >= 0 && progress() < reasoning.length
  let timer: ReturnType<typeof setInterval> | undefined
  onCleanup(() => clearInterval(timer))

  function send() {
    setExpanded(undefined)
    if (progress() >= 0) {
      setProgress(-1)
      return
    }
    setProgress(0)
    let position = 0
    timer = setInterval(() => {
      position = Math.min(reasoning.length, position + 4)
      setProgress(position)
      if (position === reasoning.length) clearInterval(timer)
    }, 40)
  }

  return (
    <div class="flex min-h-80 w-full max-w-md flex-col gap-4 text-start text-sm">
      <Show when={progress() >= 0}>
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>Why is the checkout deploy so slow?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Trace>
              <TraceCollapsible
                open={expanded() ?? running()}
                onOpenChange={setExpanded}
              >
                <TraceCollapsibleTrigger>
                  <TraceLine status={running() ? "running" : undefined}>
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
                        <path d="M12 18V5" />
                        <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
                        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
                        <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
                        <path d="M18 18a4 4 0 0 0 2-7.464" />
                        <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
                        <path d="M6 18a4 4 0 0 1-2-7.464" />
                        <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
                      </svg>
                    </TraceIcon>
                    <TraceTitle>
                      {running() ? "Thinking" : "Thought"}
                    </TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent class="whitespace-pre-wrap">
                  {reasoning.slice(0, progress())}
                </TraceCollapsibleContent>
              </TraceCollapsible>
            </Trace>
            <Show when={!running()}>
              <p>
                Image optimization is the bottleneck. Key its cache on the
                lockfile and the image directory instead of the commit hash.
              </p>
            </Show>
          </MessageContent>
        </Message>
      </Show>
      <Show when={!running()}>
        <Button
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          onClick={send}
        >
          {progress() < 0 ? "Send message" : "Reset"}
        </Button>
      </Show>
    </div>
  )
}
