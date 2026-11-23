import type { JSX } from "@solidjs/web"
import {
  ArrowUpRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  GlobeIcon,
  LoaderCircleIcon
} from "lucide-solid"
import { For, createSignal, createMemo } from "solid-js"

import {
  useDemoChat,
  type UIDataTypes,
  type UIMessage,
  createChat,
  getMessageText
} from "~/registry/lib/ai-demo-chat"
import { Badge } from "~/registry/ui/badge"
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
    searchWeb: {
      input: { query: string }
      output: { results: { title: string; url: string }[] }
    }
    readBuildLog: {
      input: { deployment: string }
      output: { log: string }
    }
    searchCode: {
      input: { query: string }
      output: { files: string[] }
    }
  }
>

type StepPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-searchWeb" | "tool-readBuildLog" | "tool-searchCode" }
>

const chat = createChat<ChatMessage>()
  .user("Why is the checkout deploy so slow?")
  .assistant(({ writer }) => {
    writer
      .tool("readBuildLog", { input: { deployment: "dpl_8Kx2" } })
      .sleep(900)
      .output({
        log: "install    41s\ncompile    38s\nimages   3m 52s"
      })
    writer
      .tool("searchWeb", { input: { query: "next.js image cache key" } })
      .sleep(900)
      .output({
        results: [
          {
            title: "Image component | nextjs.org",
            url: "https://nextjs.org/docs/app/api-reference/components/image"
          },
          {
            title: "Build cache | vercel.com",
            url: "https://vercel.com/docs/deployments/troubleshoot-a-build"
          }
        ]
      })
    writer
      .tool("searchCode", { input: { query: "cacheKey" } })
      .sleep(900)
      .output({ files: ["next.config.ts", "scripts/optimize-images.ts"] })
    writer.text(
      "Image optimization takes almost four minutes because its cache key includes the commit hash. Key it on the image directory instead."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function StatusIcon(componentProps: {
  status?: "running" | "error" | undefined
}) {
  const content = createMemo(() => {
    const { status } = componentProps
    if (status === "running") {
      return <LoaderCircleIcon class="animate-spin" />
    }
    return status === "error" ? <CircleAlertIcon /> : <CircleCheckIcon />
  })
  return <>{content()}</>
}

function Step(componentProps: {
  title: string
  status?: "running" | "error" | undefined
  defaultOpen?: boolean | undefined
  children?: JSX.Element
}) {
  const content = createMemo(() => {
    const { title, status, defaultOpen, children } = componentProps
    const line = (
      <TraceLine status={status}>
        <TraceIcon>
          <StatusIcon status={status} />
        </TraceIcon>
        <TraceTitle>{title}</TraceTitle>
      </TraceLine>
    )
    if (!children) {
      return line
    }
    return (
      <TraceCollapsible defaultOpen={defaultOpen ?? false}>
        <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
        <TraceCollapsibleContent>{children}</TraceCollapsibleContent>
      </TraceCollapsible>
    )
  })
  return <>{content()}</>
}

function StepRow(componentProps: { part: StepPart; streaming: boolean }) {
  const content = createMemo(() => {
    const { part, streaming } = componentProps
    const status =
      part.state === "output-available"
        ? undefined
        : part.state === "output-error" || !streaming
          ? "error"
          : "running"
    const verb = (running: string, done: string, failed: string) =>
      status === "running" ? running : status === "error" ? failed : done
    const error = part.state === "output-error" && (
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockContent wrap class="max-h-64">
          {part.errorText}
        </CodeBlockContent>
      </CodeBlock>
    )
    if (part.type === "tool-searchWeb") {
      return (
        <Step
          status={status}
          title={`${verb("Searching", "Searched", "Failed to search")} the web for ${part.input?.query}`}
        >
          {error ||
            (part.state === "output-available" && (
              <Trace>
                {
                  <For each={part.output.results}>
                    {(result) => (
                      <a href={result.url} target="_blank" rel="noreferrer">
                        <TraceLine>
                          <TraceIcon>
                            <GlobeIcon />
                          </TraceIcon>
                          <TraceTitle>
                            {result.title}
                            <span class="sr-only"> (opens in a new tab)</span>
                          </TraceTitle>
                          <TraceIcon>
                            <ArrowUpRightIcon />
                          </TraceIcon>
                        </TraceLine>
                      </a>
                    )}
                  </For>
                }
              </Trace>
            ))}
        </Step>
      )
    }
    if (part.type === "tool-readBuildLog") {
      return (
        <Step
          status={status}
          defaultOpen
          title={`${verb("Reading", "Read", "Failed to read")} the build log for ${part.input?.deployment}`}
        >
          {error ||
            (part.state === "output-available" && (
              <CodeBlock size="sm">
                <CodeBlockContent wrap class="max-h-64">
                  {part.output.log}
                </CodeBlockContent>
              </CodeBlock>
            ))}
        </Step>
      )
    }
    return (
      <Step
        status={status}
        title={`${verb("Searching", "Searched", "Failed to search")} the code for ${part.input?.query}`}
      >
        {error ||
          (part.state === "output-available" && (
            <div class="flex flex-wrap gap-1.5">
              {
                <For each={part.output.files}>
                  {(file) => (
                    <Badge variant="secondary" class="font-mono">
                      {file}
                    </Badge>
                  )}
                </For>
              }
            </div>
          ))}
      </Step>
    )
  })
  return <>{content()}</>
}

function ChainOfThought(componentProps: {
  steps: StepPart[]
  streaming: boolean
  answering: boolean
}) {
  const [open, setOpen] = createSignal<boolean>()
  const content = createMemo(() => {
    const { steps, streaming, answering } = componentProps
    const running = streaming && !answering
    const failed = steps.filter((part) => part.state === "output-error").length
    const status = running ? "running" : failed > 0 ? "error" : undefined
    return (
      <Trace>
        <TraceCollapsible open={open() ?? running} onOpenChange={setOpen}>
          <TraceCollapsibleTrigger>
            <TraceLine status={status}>
              <TraceIcon>
                <StatusIcon status={status} />
              </TraceIcon>
              <TraceTitle>
                {running
                  ? "Researching"
                  : `Researched in ${steps.length} steps${failed > 0 ? `, ${failed} failed` : ""}`}
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              {
                <For each={steps}>
                  {(part) => <StepRow part={part} streaming={streaming} />}
                </For>
              }
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    )
  })
  return <>{content()}</>
}

export default function ChainOfThoughtDemo() {
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
              const steps = message.parts.filter(
                (part) =>
                  part.type === "tool-searchWeb" ||
                  part.type === "tool-readBuildLog" ||
                  part.type === "tool-searchCode"
              )
              const text = getMessageText(message)

              return (
                <Message>
                  <MessageContent class="gap-4">
                    {steps.length > 0 && (
                      <ChainOfThought
                        steps={steps}
                        streaming={streaming}
                        answering={text.length > 0}
                      />
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
