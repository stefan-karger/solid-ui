// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For, createSignal, createMemo } from "solid-js"

import {
  useDemoChat,
  type UIMessage,
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
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

type ChatMessage = UIMessage<
  unknown,
  {
    task: {
      title: string
      steps: { title: string; status: "done" | "running" | "error" }[]
    }
  }
>

type TaskPart = Extract<ChatMessage["parts"][number], { type: "data-task" }>

type Status = "running" | "error" | undefined

const TASKS = [
  {
    id: "find",
    title: ["Finding the project files", "Found the project files"],
    steps: [
      ["Searching for generateMetadata", "Searched for generateMetadata"],
      ["Reading app/layout.tsx", "Read app/layout.tsx"],
      ["Reading app/page.tsx", "Read app/page.tsx"]
    ]
  },
  {
    id: "update",
    title: ["Updating the page metadata", "Updated the page metadata"],
    steps: [
      ["Editing app/layout.tsx", "Edited app/layout.tsx"],
      ["Editing app/page.tsx", "Edited app/page.tsx"]
    ]
  }
] as const

function taskAt(task: (typeof TASKS)[number], done: number) {
  return {
    title: task.title[done < task.steps.length ? 0 : 1],
    steps: task.steps.slice(0, done + 1).map(([running, finished], index) => ({
      title: index < done ? finished : running,
      status: index < done ? "done" : "running"
    }))
  } satisfies TaskPart["data"]
}

const chat = createChat<ChatMessage>()
  .user("Add Open Graph metadata to the home page.")
  .assistant(({ writer }) => {
    TASKS.forEach((task) => {
      for (let done = 0; done <= task.steps.length; done++) {
        writer
          .data({ type: "data-task", id: task.id, data: taskAt(task, done) })
          .sleep(900)
      }
    })
    writer.text(
      "Added Open Graph defaults to app/layout.tsx and a title, description and image for the home page in app/page.tsx."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function getStepStatus(
  status: TaskPart["data"]["steps"][number]["status"],
  streaming: boolean
): Status {
  if (status === "done") {
    return undefined
  }

  return status === "running" && streaming ? "running" : "error"
}

function StatusIcon(componentProps: { status: Status }) {
  const content = createMemo(() => {
    const { status } = componentProps
    if (status === "running") {
      return (
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
      )
    }
    return status === "error" ? (
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
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
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
    )
  })
  return <>{content()}</>
}

function TaskRow(componentProps: {
  task: TaskPart["data"]
  streaming: boolean
}) {
  const [open, setOpen] = createSignal<boolean>()
  const content = createMemo(() => {
    const { task, streaming } = componentProps
    const steps = task.steps.map((step) => ({
      title: step.title,
      status: getStepStatus(step.status, streaming)
    }))
    const status = steps.some((step) => step.status === "error")
      ? "error"
      : steps.some((step) => step.status === "running")
        ? "running"
        : undefined
    return (
      <TraceCollapsible
        open={open() ?? status === "running"}
        onOpenChange={setOpen}
      >
        <TraceCollapsibleTrigger>
          <TraceLine status={status}>
            <TraceIcon>
              <StatusIcon status={status} />
            </TraceIcon>
            <TraceTitle>{task.title}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {
              <For each={steps}>
                {(step) => (
                  <TraceLine status={step.status}>
                    <TraceTitle>{step.title}</TraceTitle>
                  </TraceLine>
                )}
              </For>
            }
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  })
  return <>{content()}</>
}

export default function TaskDemo() {
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
              const tasks = message.parts.filter(
                (part) => part.type === "data-task"
              )
              const text = getMessageText(message)

              return (
                <Message>
                  <MessageContent class="gap-4">
                    {tasks.length > 0 && (
                      <Trace>
                        {
                          <For each={tasks}>
                            {(part) => (
                              <TaskRow task={part.data} streaming={streaming} />
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
