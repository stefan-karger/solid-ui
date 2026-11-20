import { TerminalIcon } from "lucide-solid"
import { createSignal, For, onCleanup, Show } from "solid-js"

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

const calls = [
  { command: "node --version", output: "v24.18.0" },
  { command: "npm --version", output: "11.6.2" },
  { command: "pnpm --version", output: "command not found: pnpm", failed: true }
]

export default function TraceToolCalls() {
  const [completed, setCompleted] = createSignal(-1)
  const busy = () => completed() >= 0 && completed() < calls.length
  let timer: ReturnType<typeof setInterval> | undefined
  onCleanup(() => clearInterval(timer))

  function send() {
    if (completed() >= 0) {
      setCompleted(-1)
      return
    }
    setCompleted(0)
    let count = 0
    timer = setInterval(() => {
      setCompleted(++count)
      if (count === calls.length) clearInterval(timer)
    }, 900)
  }

  return (
    <div class="flex min-h-80 w-full max-w-md flex-col gap-4 text-start text-sm">
      <Show when={completed() >= 0}>
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>
                Which package managers are installed?
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Trace>
              <For each={calls}>
                {(call, index) => (
                  <Show when={index() <= completed()}>
                    <Show
                      when={index() < completed()}
                      fallback={
                        <TraceLine status="running">
                          <TraceIcon>
                            <TerminalIcon />
                          </TraceIcon>
                          <TraceTitle>Running {call.command}</TraceTitle>
                        </TraceLine>
                      }
                    >
                      <TraceCollapsible>
                        <TraceCollapsibleTrigger>
                          <TraceLine status={call.failed ? "error" : undefined}>
                            <TraceIcon>
                              <TerminalIcon />
                            </TraceIcon>
                            <TraceTitle>
                              {call.failed ? "Failed" : "Ran"} {call.command}
                            </TraceTitle>
                          </TraceLine>
                        </TraceCollapsibleTrigger>
                        <TraceCollapsibleContent>
                          <pre class="font-mono text-xs">{call.output}</pre>
                        </TraceCollapsibleContent>
                      </TraceCollapsible>
                    </Show>
                  </Show>
                )}
              </For>
            </Trace>
            <Show when={!busy()}>
              <p>Node 24 and npm 11 are installed. pnpm is not.</p>
            </Show>
          </MessageContent>
        </Message>
      </Show>
      <Show when={!busy()}>
        <Button
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          onClick={send}
        >
          {completed() < 0 ? "Send message" : "Reset"}
        </Button>
      </Show>
    </div>
  )
}
