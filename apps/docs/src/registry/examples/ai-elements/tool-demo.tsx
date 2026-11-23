import { TerminalIcon } from "lucide-solid"
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

type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-runCommand" }
>

const chat = createChat<ChatMessage>()
  .user("Which package managers are installed?")
  .assistant(({ writer }) => {
    writer
      .tool("runCommand", { input: { command: "node --version" } })
      .sleep(900)
      .output({ stdout: "v24.18.0" })
    writer
      .tool("runCommand", { input: { command: "npm --version" } })
      .sleep(900)
      .output({ stdout: "11.6.2" })
    writer
      .tool("runCommand", { input: { command: "pnpm --version" } })
      .sleep(900)
      .error("command not found: pnpm")
    writer.text("Node 24 and npm 11 are installed. pnpm is not.")
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function ToolRow(componentProps: {
  part: ToolPart
  streaming: boolean
  defaultOpen?: boolean | undefined
}) {
  const content = createMemo(() => {
    const { part, streaming, defaultOpen } = componentProps
    const command = part.input?.command
    if (part.state === "output-available" || part.state === "output-error") {
      const failed = part.state === "output-error"

      return (
        <TraceCollapsible defaultOpen={defaultOpen ?? false}>
          <TraceCollapsibleTrigger>
            <TraceLine status={failed ? "error" : undefined}>
              <TraceIcon>
                <TerminalIcon />
              </TraceIcon>
              <TraceTitle>
                {failed ? "Failed to run" : "Ran"} {command}
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap class="max-h-64">
                {failed ? part.errorText : part.output.stdout}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )
    }
    return (
      <TraceLine status={streaming ? "running" : "error"}>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>
          {streaming ? "Running" : "Failed to run"} {command}
        </TraceTitle>
      </TraceLine>
    )
  })
  return <>{content()}</>
}

export default function ToolDemo() {
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
                (part) => part.type === "tool-runCommand"
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
                              <ToolRow
                                part={part}
                                streaming={streaming}
                                defaultOpen={
                                  busy()
                                    ? undefined
                                    : part.state === "output-error"
                                }
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
