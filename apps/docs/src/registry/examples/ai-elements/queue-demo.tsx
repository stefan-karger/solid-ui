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
    writeTodos: {
      input: {
        todos: {
          content: string
          status: "pending" | "in_progress" | "completed"
        }[]
      }
      output: string
    }
  }
>

type Todo = Extract<
  ChatMessage["parts"][number],
  { type: "tool-writeTodos"; state: "input-available" }
>["input"]["todos"][number]

const TODOS = [
  "Add a dark variant to the theme tokens",
  "Read the theme from a cookie",
  "Add a toggle to the settings page",
  "Check contrast on the charts"
]

function todosAt(current: number) {
  return TODOS.map(
    (content, index) =>
      ({
        content,
        status:
          index < current
            ? "completed"
            : index === current
              ? "in_progress"
              : "pending"
      }) satisfies Todo
  )
}

const chat = createChat<ChatMessage>()
  .user("Add dark mode to the settings page.")
  .assistant(({ writer }) => {
    TODOS.forEach((_, index) => {
      writer
        .tool("writeTodos", { input: { todos: todosAt(index) } })
        .output("Updated the todo list.")
      writer.sleep(1400)
    })
    writer
      .tool("writeTodos", { input: { todos: todosAt(TODOS.length) } })
      .output("Updated the todo list.")
    writer.text("Dark mode is in. The toggle is under Settings, Appearance.")
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function TodoLine(componentProps: { todo: Todo; streaming: boolean }) {
  const content = createMemo(() => {
    const { todo, streaming } = componentProps
    return (
      <TraceLine
        status={
          streaming && todo.status === "in_progress" ? "running" : undefined
        }
      >
        <TraceIcon>
          {todo.status === "completed" ? (
            <IconPlaceholder lucide="CircleCheckIcon" />
          ) : todo.status === "in_progress" ? (
            <IconPlaceholder lucide="CircleDotIcon" />
          ) : (
            <IconPlaceholder lucide="CircleIcon" />
          )}
        </TraceIcon>
        <TraceTitle>{todo.content}</TraceTitle>
      </TraceLine>
    )
  })
  return <>{content()}</>
}

function TodoQueue(componentProps: { todos: Todo[]; streaming: boolean }) {
  const content = createMemo(() => {
    const { todos, streaming } = componentProps
    const pending = todos.filter((todo) => todo.status !== "completed")
    const completed = todos.filter((todo) => todo.status === "completed")
    return (
      <Trace>
        {pending.length > 0 && (
          <TraceCollapsible defaultOpen>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder lucide="ListTodoIcon" />
                </TraceIcon>
                <TraceTitle>{pending.length} to do</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <Trace>
                {
                  <For each={pending}>
                    {(todo) => <TodoLine todo={todo} streaming={streaming} />}
                  </For>
                }
              </Trace>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        )}
        {completed.length > 0 && (
          <TraceCollapsible defaultOpen>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder lucide="ListChecksIcon" />
                </TraceIcon>
                <TraceTitle>{completed.length} completed</TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <Trace>
                {
                  <For each={completed}>
                    {(todo) => <TodoLine todo={todo} streaming={streaming} />}
                  </For>
                }
              </Trace>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        )}
      </Trace>
    )
  })
  return <>{content()}</>
}

export default function QueueDemo() {
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
              const todos = message.parts
                .filter((part) => part.type === "tool-writeTodos")
                .filter((part) => part.state !== "input-streaming")
                .at(-1)?.input?.todos
              const text = getMessageText(message)

              return (
                <Message>
                  <MessageContent class="gap-4">
                    {todos && <TodoQueue todos={todos} streaming={streaming} />}
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
