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

const STACK = `TypeError: Cannot read properties of undefined (reading 'email')
    at seedUsers (prisma/seed.ts:27:34)
    at main (prisma/seed.ts:51:9)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at Object.transformer (node_modules/tsx/dist/register.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)`

const chat = createChat<ChatMessage>()
  .user("Reset the database and seed it.")
  .assistant(({ writer }) => {
    writer
      .tool("runCommand", {
        input: { command: "pnpm prisma migrate reset --skip-seed" }
      })
      .sleep(900)
      .output({
        stdout: `Database reset successful

The following migrations have been applied:

migrations/
  └─ 20260912_init/
  └─ 20260920_add_profiles/`
      })
    writer
      .tool("runCommand", { input: { command: "pnpm prisma db seed" } })
      .sleep(1200)
      .error(STACK)
    writer.text(
      "The migrations ran, but the seed failed in seedUsers. One fixture has no profile, so profile.email is undefined."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function parseFrame(line: string) {
  const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/)

  return {
    line,
    name: match?.[1],
    file: match?.[2],
    lineNumber: match?.[3],
    internal: line.includes("node_modules") || line.includes("node:")
  }
}

function StackTrace(componentProps: { stack: string }) {
  const content = createMemo(() => {
    const { stack } = componentProps
    const [error, ...lines] = stack.split("\n").map((line) => line.trim())
    const frames = lines.map(parseFrame)
    const appFrames = frames.filter((frame) => !frame.internal)
    const internalFrames = frames.filter((frame) => frame.internal)
    return (
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <IconPlaceholder lucide="TerminalIcon" />
            </TraceIcon>
            <TraceTitle>Failed: {error}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="flex flex-col gap-2">
          <p class="font-mono text-xs text-destructive">{error}</p>
          <Trace>
            {
              <For each={appFrames}>
                {(frame) => (
                  <a href={`#${frame.file}:${frame.lineNumber}`}>
                    <TraceLine>
                      <TraceIcon>
                        <IconPlaceholder lucide="FileCodeIcon" />
                      </TraceIcon>
                      <TraceTitle>
                        {frame.name} in {frame.file}:{frame.lineNumber}
                      </TraceTitle>
                    </TraceLine>
                  </a>
                )}
              </For>
            }
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder lucide="LayersIcon" />
                  </TraceIcon>
                  <TraceTitle>
                    {internalFrames.length} framework frames
                  </TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <ol class="flex flex-col gap-1 overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
                  {
                    <For each={internalFrames}>
                      {(frame) => (
                        <li class="whitespace-nowrap">{frame.line}</li>
                      )}
                    </For>
                  }
                </ol>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  })
  return <>{content()}</>
}

function CommandRow(componentProps: { part: ToolPart; streaming: boolean }) {
  const content = createMemo(() => {
    const { part, streaming } = componentProps
    const command = part.input?.command
    if (part.state === "output-error") {
      return <StackTrace stack={part.errorText} />
    }
    if (part.state === "output-available") {
      return (
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder lucide="TerminalIcon" />
              </TraceIcon>
              <TraceTitle>Ran {command}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap class="max-h-64">
                {part.output.stdout}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )
    }
    return (
      <TraceLine status={streaming ? "running" : "error"}>
        <TraceIcon>
          <IconPlaceholder lucide="TerminalIcon" />
        </TraceIcon>
        <TraceTitle>
          {streaming ? "Running" : "Failed to run"} {command}
        </TraceTitle>
      </TraceLine>
    )
  })
  return <>{content()}</>
}

export default function StackTraceDemo() {
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
                              <CommandRow part={part} streaming={streaming} />
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
