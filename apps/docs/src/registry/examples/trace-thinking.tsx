import { BrainIcon } from "lucide-solid"
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
              <TraceCollapsible open={expanded() ?? running()} onOpenChange={setExpanded}>
                <TraceCollapsibleTrigger>
                  <TraceLine status={running() ? "running" : undefined}>
                    <TraceIcon>
                      <BrainIcon />
                    </TraceIcon>
                    <TraceTitle>{running() ? "Thinking" : "Thought"}</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent class="whitespace-pre-wrap">
                  {reasoning.slice(0, progress())}
                </TraceCollapsibleContent>
              </TraceCollapsible>
            </Trace>
            <Show when={!running()}>
              <p>
                Image optimization is the bottleneck. Key its cache on the lockfile and the image
                directory instead of the commit hash.
              </p>
            </Show>
          </MessageContent>
        </Message>
      </Show>
      <Show when={!running()}>
        <Button variant="outline" size="sm" class="mt-auto self-start" onClick={send}>
          {progress() < 0 ? "Send message" : "Reset"}
        </Button>
      </Show>
    </div>
  )
}
