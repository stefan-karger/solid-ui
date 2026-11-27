import { For, createMemo } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/registry/ui/sheet"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "~/registry/ui/trace"

type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    readFile: {
      input: { path: string }
      output: { path: string; content: string }
    }
  }
>

const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/react": "^4.0.0",
    "ai": "^7.0.0",
    "next": "^16.3.0"
  }
}`

const chat = createChat<ChatMessage>()
  .user("Which AI SDK version does this app use?")
  .assistant(({ writer }) => {
    writer
      .tool("readFile", { input: { path: "package.json" } })
      .sleep(900)
      .output({ path: "package.json", content: PACKAGE_JSON })
    writer.text("It uses ai 7 with @ai-sdk/react 4.")
  })

const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

export default function ToolSheet() {
  const { messages, sendMessage, setMessages, status } = useDemoChat({
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

              const streaming = busy() && message === messages().at(-1)

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

                            if (part.type !== "tool-readFile") {
                              return null
                            }

                            if (part.state !== "output-available") {
                              const running =
                                streaming &&
                                (part.state === "input-streaming" ||
                                  part.state === "input-available")

                              return (
                                <Trace>
                                  <TraceLine
                                    status={running ? "running" : "error"}
                                  >
                                    <TraceIcon>
                                      <IconPlaceholder lucide="FileTextIcon" />
                                    </TraceIcon>
                                    <TraceTitle>
                                      {running ? "Reading" : "Failed to read"}{" "}
                                      {part.input?.path}
                                    </TraceTitle>
                                  </TraceLine>
                                </Trace>
                              )
                            }

                            return (
                              <Trace>
                                <Sheet>
                                  <SheetTrigger>
                                    <TraceLine>
                                      <TraceIcon>
                                        <IconPlaceholder lucide="FileTextIcon" />
                                      </TraceIcon>
                                      <TraceTitle>
                                        Read {part.output.path}
                                      </TraceTitle>
                                      <TraceIcon>
                                        <IconPlaceholder lucide="ChevronRightIcon" />
                                      </TraceIcon>
                                    </TraceLine>
                                  </SheetTrigger>
                                  <SheetContent>
                                    <SheetHeader>
                                      <SheetTitle class="font-mono">
                                        {part.output.path}
                                      </SheetTitle>
                                      <SheetDescription>
                                        {part.output.content.split("\n").length}{" "}
                                        lines
                                      </SheetDescription>
                                    </SheetHeader>
                                    <CodeBlock class="mx-6 mb-6 w-auto">
                                      <CodeBlockContent lineNumbers>
                                        {part.output.content}
                                      </CodeBlockContent>
                                    </CodeBlock>
                                  </SheetContent>
                                </Sheet>
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
