// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For, createSignal, createMemo } from "solid-js"

import {
  type UIDataTypes,
  type UIMessage,
  useDemoChat,
  createChat,
  getMessageText
} from "~/registry/lib/ai-demo-chat"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "~/registry/ui/item"
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

type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

const chat = createChat<ChatMessage>()
  .user("Clean up the build folder.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
    )
    writer.sleep(400)
    writer.tool("runCommand", {
      input: { command: "rm -rf dist" },
      needsApproval: true,
      output: { stdout: "" }
    })
  })
  .assistant(({ writer, toolCall }) => {
    writer.sleep(600)
    writer.text(
      toolCall?.approved
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })

const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

export default function ConfirmationDemo() {
  const {
    messages,
    sendMessage,
    setMessages,
    status,
    addToolApprovalResponse
  } = useDemoChat({
    messages: initialMessages,
    transport
  })
  const nextMessage = () => chat.next(messages())
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

              return (
                <Message>
                  <MessageContent class="gap-4">
                    {
                      <For each={message.parts}>
                        {(part) => {
                          const content = createMemo(() => {
                            if (part.type === "text") {
                              return <p>{part.text}</p>
                            }

                            if (part.type === "reasoning") {
                              return (
                                <Trace>
                                  <ReasoningRow
                                    text={part.text}
                                    running={part.state === "streaming"}
                                  />
                                </Trace>
                              )
                            }

                            if (part.type !== "tool-runCommand") {
                              return null
                            }

                            // A pending approval is a prompt, not activity, so it sits outside Trace.
                            if (part.state === "approval-requested") {
                              return (
                                <Item variant="outline" size="sm">
                                  <ItemMedia variant="icon">
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
                                      <path d="M12 19h8" />
                                      <path d="m4 17 6-6-6-6" />
                                    </svg>
                                  </ItemMedia>
                                  <ItemContent>
                                    <ItemTitle>
                                      Run {part.input.command}?
                                    </ItemTitle>
                                    <ItemDescription>
                                      The command runs in this project.
                                    </ItemDescription>
                                  </ItemContent>
                                  <ItemActions>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        addToolApprovalResponse({
                                          id: part.approval.id,
                                          approved: false
                                        })
                                      }
                                    >
                                      Deny
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        addToolApprovalResponse({
                                          id: part.approval.id,
                                          approved: true
                                        })
                                      }
                                    >
                                      Approve
                                    </Button>
                                  </ItemActions>
                                </Item>
                              )
                            }

                            const denied =
                              part.state === "output-denied" ||
                              (part.state === "approval-responded" &&
                                !part.approval.approved)

                            return (
                              <Trace>
                                <TraceLine
                                  status={
                                    !denied && part.state !== "output-available"
                                      ? "running"
                                      : undefined
                                  }
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
                                      <path d="M12 19h8" />
                                      <path d="m4 17 6-6-6-6" />
                                    </svg>
                                  </TraceIcon>
                                  <TraceTitle>
                                    {denied
                                      ? "Denied"
                                      : part.state === "output-available"
                                        ? "Ran"
                                        : "Running"}{" "}
                                    {part.input?.command}
                                  </TraceTitle>
                                </TraceLine>
                              </Trace>
                            )
                          })
                          return <>{content()}</>
                        }}
                      </For>
                    }
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
          onClick={() =>
            nextMessage()
              ? sendMessage(nextMessage())
              : setMessages(initialMessages)
          }
        >
          {nextMessage() ? "Send message" : "Reset"}
        </Button>
      )}
    </div>
  )
}

function ReasoningRow(componentProps: { text: string; running: boolean }) {
  const [open, setOpen] = createSignal<boolean>()
  const content = createMemo(() => {
    const { text, running } = componentProps
    return (
      <TraceCollapsible open={open() ?? running} onOpenChange={setOpen}>
        <TraceCollapsibleTrigger>
          <TraceLine status={running ? "running" : undefined}>
            <TraceIcon>
              {running ? (
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
                  class="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 9-5.5 5.5L8 12" />
                </svg>
              )}
            </TraceIcon>
            <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="whitespace-pre-wrap">
          {text}
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  })
  return <>{content()}</>
}
