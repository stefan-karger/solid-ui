import { For, createSignal, untrack, createMemo } from "solid-js"

import {
  useDemoChat,
  createChat,
  getMessageText
} from "~/registry/lib/ai-demo-chat"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { Message, MessageContent } from "~/registry/ui/message"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

const chat = createChat()
  .user("Why is the checkout deploy so slow?")
  .assistant(({ writer }) => {
    writer.reasoning(
      "The deploy log has three phases. Install takes 38s and next build takes 52s, both normal for this repo.\n\nImage optimization takes 3m 50s. It reruns on every deploy because its cache key includes the commit hash, so the cache never hits.",
      { delayMs: 40 }
    )
    writer.sleep(400)
    writer.text(
      "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash, and the deploy should take under two minutes."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function ReasoningRow(componentProps: {
  text: string
  running: boolean
  defaultOpen?: boolean | undefined
}) {
  const [open, setOpen] = createSignal(
    untrack(() => componentProps.defaultOpen)
  )
  const content = createMemo(() => {
    const { text, running } = componentProps
    const line = (
      <TraceLine status={running ? "running" : undefined}>
        <TraceTitle>{running ? "Thinking" : "Thought for 5s"}</TraceTitle>
      </TraceLine>
    )
    if (text.length === 0) {
      return line
    }
    return (
      <TraceCollapsible open={open() ?? running} onOpenChange={setOpen}>
        <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="whitespace-pre-wrap">
          {text}
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  })
  return <>{content()}</>
}

export default function ReasoningDemo() {
  const { messages, sendMessage, setMessages, status } = useDemoChat({
    messages: transcript,
    transport
  })
  const busy = () => status() === "submitted" || status() === "streaming"

  return (
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      {
        <For each={messages()}>
          {(message) => {
            const content = createMemo(() => {
              if (message.role === "user") {
                return (
                  <Message align="end">
                    <MessageContent>
                      <Bubble align="end" variant="muted">
                        <BubbleContent>{getMessageText(message)}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                )
              }

              const streaming = busy() && message === messages().at(-1)
              const reasoning = message.parts.filter(
                (part) => part.type === "reasoning"
              )
              const text = getMessageText(message)

              return (
                <Message>
                  <MessageContent class="gap-4">
                    {reasoning.length > 0 && (
                      <Trace>
                        {
                          <For each={reasoning}>
                            {(part) => (
                              <ReasoningRow
                                text={part.text}
                                running={
                                  streaming && part.state === "streaming"
                                }
                                defaultOpen={busy() ? undefined : true}
                              />
                            )}
                          </For>
                        }
                      </Trace>
                    )}
                    {text && <p>{text}</p>}
                  </MessageContent>
                </Message>
              )
            })
            return <>{content()}</>
          }}
        </For>
      }
      {!busy() && (
        <Button
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          onClick={() => {
            setMessages([])
            sendMessage(question)
          }}
        >
          Replay
        </Button>
      )}
    </div>
  )
}
