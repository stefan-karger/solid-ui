import { For, createMemo } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

const todos: { title: string; description?: string; done: boolean }[] = [
  {
    title: "Write the migration guide",
    description: "Cover the renamed props and the new data attributes.",
    done: true
  },
  { title: "Add a changeset", done: true },
  {
    title: "Fix the focus ring on the select trigger",
    description: "It is clipped by overflow-hidden on the field.",
    done: false
  },
  { title: "Update the registry snapshots", done: false },
  {
    title: "Add tests for the combobox",
    description: "Typing, clearing and keyboard selection.",
    done: false
  }
]

function TodoRow(componentProps: { todo: (typeof todos)[number] }) {
  const content = createMemo(() => {
    const { todo } = componentProps
    const line = (
      <TraceLine>
        <TraceIcon>
          {todo.done ? (
            <IconPlaceholder lucide="CircleCheckIcon" />
          ) : (
            <IconPlaceholder lucide="CircleIcon" />
          )}
        </TraceIcon>
        <TraceTitle>{todo.title}</TraceTitle>
      </TraceLine>
    )
    if (!todo.description) {
      return line
    }
    return (
      <TraceCollapsible>
        <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
        <TraceCollapsibleContent>{todo.description}</TraceCollapsibleContent>
      </TraceCollapsible>
    )
  })
  return <>{content()}</>
}

export default function QueueDescriptions() {
  const pending = todos.filter((todo) => !todo.done)
  const completed = todos.filter((todo) => todo.done)

  return (
    <Trace class="max-w-sm">
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
            {<For each={pending}>{(todo) => <TodoRow todo={todo} />}</For>}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
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
            {<For each={completed}>{(todo) => <TodoRow todo={todo} />}</For>}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
