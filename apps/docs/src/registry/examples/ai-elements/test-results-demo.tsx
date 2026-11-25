// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For, createMemo } from "solid-js"

import {
  useDemoChat,
  type UIDataTypes,
  type UIMessage,
  createChat,
  getMessageText
} from "~/registry/lib/ai-demo-chat"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { CodeBlock, CodeBlockContent } from "~/registry/ui/code-block"
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

type Test = {
  name: string
  status: "passed" | "failed" | "skipped"
  error?: string
}

type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runTests: {
      input: { command: string }
      output: { suites: { name: string; tests: Test[] }[] }
    }
  }
>

type ToolPart = Extract<ChatMessage["parts"][number], { type: "tool-runTests" }>

const chat = createChat<ChatMessage>()
  .user("Run the checkout tests.")
  .assistant(({ writer }) => {
    writer
      .tool("runTests", { input: { command: "pnpm test checkout" } })
      .sleep(1500)
      .output({
        suites: [
          {
            name: "cart.test.ts",
            tests: [
              { name: "adds an item", status: "passed" },
              { name: "removes an item", status: "passed" },
              { name: "applies a discount code", status: "passed" }
            ]
          },
          {
            name: "payment.test.ts",
            tests: [
              { name: "charges the saved card", status: "passed" },
              {
                name: "retries a declined card",
                status: "failed",
                error: `Expected 2 charge attempts, received 1

  at Object.<anonymous> (src/payment.test.ts:58:22)`
              }
            ]
          }
        ]
      })
    writer.text(
      "One test failed. The payment client does not retry a declined card, so the second charge attempt never happens."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function countTests(tests: Test[]) {
  return {
    total: tests.length,
    failed: tests.filter((test) => test.status === "failed").length,
    skipped: tests.filter((test) => test.status === "skipped").length
  }
}

function formatCounts({
  total,
  failed,
  skipped
}: ReturnType<typeof countTests>) {
  return [
    `${total} tests`,
    failed > 0 && `${failed} failed`,
    skipped > 0 && `${skipped} skipped`
  ]
    .filter(Boolean)
    .join(", ")
}

function TestRow(componentProps: { test: Test }) {
  const content = createMemo(() => {
    const { test } = componentProps
    if (test.status === "failed") {
      return (
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </TraceIcon>
              <TraceTitle>{test.name}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap class="max-h-64">
                {test.error}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )
    }
    return (
      <TraceLine>
        <TraceIcon>
          {test.status === "skipped" ? (
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
              <path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
              <path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
              <path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />
              <path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
              <path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />
              <path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
              <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
              <path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />
            </svg>
          ) : (
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
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </TraceIcon>
        <TraceTitle>
          {test.status === "skipped" ? `Skipped ${test.name}` : test.name}
        </TraceTitle>
      </TraceLine>
    )
  })
  return <>{content()}</>
}

function TestResultsRow(componentProps: {
  part: ToolPart
  streaming: boolean
}) {
  const content = createMemo(() => {
    const { part, streaming } = componentProps
    const command = part.input?.command
    if (part.state !== "output-available") {
      const running = streaming && part.state !== "output-error"

      return (
        <TraceLine status={running ? "running" : "error"}>
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
              <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
              <path d="M6.453 15h11.094" />
              <path d="M8.5 2h7" />
            </svg>
          </TraceIcon>
          <TraceTitle>
            {running ? "Running" : "Failed to run"} {command}
          </TraceTitle>
        </TraceLine>
      )
    }
    const { suites } = part.output
    const summary = countTests(suites.flatMap((suite) => suite.tests))
    return (
      <TraceCollapsible defaultOpen={summary.failed > 0}>
        <TraceCollapsibleTrigger>
          <TraceLine status={summary.failed > 0 ? "error" : undefined}>
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
                <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
                <path d="M6.453 15h11.094" />
                <path d="M8.5 2h7" />
              </svg>
            </TraceIcon>
            <TraceTitle>Ran {formatCounts(summary)}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {
              <For each={suites}>
                {(suite) => {
                  const content = createMemo(() => {
                    const counts = countTests(suite.tests)

                    return (
                      <TraceCollapsible defaultOpen={counts.failed > 0}>
                        <TraceCollapsibleTrigger>
                          <TraceLine
                            status={counts.failed > 0 ? "error" : undefined}
                          >
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
                                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                                <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                                <path d="M10 12.5 8 15l2 2.5" />
                                <path d="m14 12.5 2 2.5-2 2.5" />
                              </svg>
                            </TraceIcon>
                            <TraceTitle>
                              {suite.name}, {formatCounts(counts)}
                            </TraceTitle>
                          </TraceLine>
                        </TraceCollapsibleTrigger>
                        <TraceCollapsibleContent>
                          <Trace>
                            {
                              <For each={suite.tests}>
                                {(test) => <TestRow test={test} />}
                              </For>
                            }
                          </Trace>
                        </TraceCollapsibleContent>
                      </TraceCollapsible>
                    )
                  })
                  return <>{content()}</>
                }}
              </For>
            }
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  })
  return <>{content()}</>
}

export default function TestResultsDemo() {
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
              const tools = message.parts.filter(
                (part) => part.type === "tool-runTests"
              )
              const text = getMessageText(message)

              return (
                <Message>
                  <MessageContent class="gap-4">
                    {tools.length > 0 && (
                      <Trace>
                        {
                          <For each={tools}>
                            {(part) => (
                              <TestResultsRow
                                part={part}
                                streaming={streaming}
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
