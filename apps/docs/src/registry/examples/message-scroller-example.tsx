import { createSignal, createUniqueId, For, onCleanup, Show } from "solid-js"

import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Marker, MarkerContent } from "~/registry/ui/marker"
import { Message, MessageContent, MessageHeader } from "~/registry/ui/message"
import {
  createMessageScrollerController,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport
} from "~/registry/ui/message-scroller"

type TranscriptLine = {
  role: "user" | "assistant" | "participant" | "event"
  text: string
  sender?: string
}
type OpeningPosition = "start" | "end" | "last-anchor"
type Scenario =
  | "anchoring"
  | "group-chat"
  | "previous-context"
  | "streaming"
  | "opening-position"
  | "load-history"
  | "animation"
  | "commands"
  | "visibility"
  | "scrollable"

export function MessageScrollerExample(props: {
  title: string
  description: string
  scenario: Scenario
  messages: readonly TranscriptLine[]
}) {
  const id = createUniqueId()
  const scroll = createMessageScrollerController()
  const isStreaming = () => ["streaming", "previous-context", "animation"].includes(props.scenario)
  const initialCount = () =>
    props.scenario === "group-chat"
      ? 3
      : props.scenario === "anchoring"
        ? 0
        : isStreaming()
          ? props.scenario === "previous-context"
            ? 2
            : 0
          : props.messages.length
  const initialOffset = () =>
    props.scenario === "load-history" ? Math.max(props.messages.length - 5, 0) : 0
  const [start, setStart] = createSignal(initialOffset())
  const [end, setEnd] = createSignal(initialCount())
  const [stream, setStream] = createSignal("")
  const [running, setRunning] = createSignal(false)
  const [anchor, setAnchor] = createSignal<"user" | "assistant">("user")
  const [position, setPosition] = createSignal<OpeningPosition>("last-anchor")
  const [status, setStatus] = createSignal("Start")
  let viewport!: HTMLDivElement
  let timer: ReturnType<typeof setInterval> | undefined
  onCleanup(() => clearInterval(timer))

  function jump(index: number) {
    requestAnimationFrame(() => {
      const item = viewport.querySelector(`[data-transcript-index="${index}"]`)
      if (item) {
        viewport.scrollTo({
          top:
            viewport.scrollTop +
            item.getBoundingClientRect().top -
            viewport.getBoundingClientRect().top,
          behavior: "instant"
        })
      }
    })
  }

  function reset() {
    clearInterval(timer)
    setRunning(false)
    setStream("")
    setStart(initialOffset())
    setEnd(initialCount())
    if (props.scenario === "load-history") requestAnimationFrame(() => scroll.scrollToEnd())
  }

  function addTurn() {
    const index = end()
    const first = props.messages[index]
    if (!first) return
    setEnd(index + 1)
    if (!isStreaming()) {
      const next = props.messages[index + 1]
      if (next?.role === "assistant" || props.scenario === "group-chat") setEnd(index + 2)
      if (props.scenario === "anchoring") jump(anchor() === "assistant" && next ? index + 1 : index)
      return
    }
    if (props.scenario === "previous-context") jump(Math.max(0, index - 1))
    const reply = props.messages[index + 1]
    if (!reply) return
    setRunning(true)
    const chunks = reply.text.match(/\S+\s*/g) ?? []
    let offset = 0
    timer = setInterval(() => {
      setStream(chunks.slice(0, ++offset).join(""))
      if (offset >= chunks.length) {
        clearInterval(timer)
        setEnd(index + 2)
        setStream("")
        setRunning(false)
      }
    }, 24)
  }

  function loadHistory() {
    const height = viewport.scrollHeight
    const offset = viewport.scrollTop
    setStart((previous) => Math.max(0, previous - 5))
    requestAnimationFrame(() => {
      viewport.scrollTop = offset + viewport.scrollHeight - height
    })
  }

  function scrollStatus() {
    if (props.scenario === "visibility") {
      const bounds = viewport.getBoundingClientRect()
      const visible = [
        ...viewport.querySelectorAll<HTMLElement>('[data-transcript-role="user"]')
      ].find((node) => node.getBoundingClientRect().bottom >= bounds.top)
      setStatus(visible?.textContent?.trim() ?? "End")
    } else {
      setStatus(scroll.isAtStart() ? "Start" : scroll.isAtEnd() ? "End" : "Scrollable")
    }
  }

  function openAt(next: OpeningPosition) {
    setPosition(next)
    if (next === "start") scroll.scrollToStart()
    else if (next === "end") scroll.scrollToEnd()
    else jump(props.messages.findLastIndex((line) => line.role === "user"))
  }

  return (
    <Card class="mx-auto h-[32rem] w-full max-w-sm gap-0 text-start">
      <CardHeader class="border-b">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <MessageScroller
          class="h-full"
          controller={scroll}
          stickToEnd={
            props.scenario !== "scrollable" &&
            props.scenario !== "visibility" &&
            props.scenario !== "previous-context"
          }
        >
          <MessageScrollerViewport
            ref={(element) => {
              viewport = element
            }}
            onScroll={scrollStatus}
            role="region"
            aria-label={props.title}
          >
            <MessageScrollerContent class="gap-3 p-4" role="log" aria-relevant="additions">
              <Show when={props.scenario === "load-history" && start() > 0}>
                <Button variant="outline" size="sm" onClick={loadHistory}>
                  Load earlier messages
                </Button>
              </Show>
              <For each={props.messages.slice(start(), end())}>
                {(line, index) => (
                  <MessageScrollerItem
                    id={`${id}-${start() + index()}`}
                    data-transcript-index={start() + index()}
                    data-transcript-role={line.role}
                    class={
                      props.scenario === "animation"
                        ? "motion-safe:animate-in motion-safe:fade-in-0"
                        : ""
                    }
                  >
                    <Show
                      when={line.role !== "event"}
                      fallback={
                        <Marker variant="separator">
                          <MarkerContent>{line.text}</MarkerContent>
                        </Marker>
                      }
                    >
                      <Message
                        align={line.role === "user" || line.sender === "Grace" ? "end" : "start"}
                      >
                        <MessageContent>
                          <Show when={line.sender}>
                            <MessageHeader>{line.sender}</MessageHeader>
                          </Show>
                          <Bubble variant={line.role === "assistant" ? "ghost" : "muted"}>
                            <BubbleContent class="whitespace-pre-wrap">{line.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </Show>
                  </MessageScrollerItem>
                )}
              </For>
              <Show when={running()}>
                <Bubble variant="ghost">
                  <BubbleContent class="whitespace-pre-wrap">{stream()}</BubbleContent>
                </Bubble>
              </Show>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </CardContent>
      <CardFooter class="flex flex-wrap gap-2 border-t">
        <Show
          when={isStreaming() || props.scenario === "anchoring" || props.scenario === "group-chat"}
        >
          <Show when={props.scenario === "anchoring"}>
            <select
              class="text-sm"
              aria-label="Anchor role"
              value={anchor()}
              onChange={(event) =>
                setAnchor(event.currentTarget.value === "user" ? "user" : "assistant")
              }
            >
              <option value="user">User</option>
              <option value="assistant">Assistant</option>
            </select>
          </Show>
          <Button
            size="sm"
            onClick={addTurn}
            disabled={running() || end() >= props.messages.length}
          >
            {props.scenario === "group-chat"
              ? "Add Rocky"
              : props.scenario === "anchoring"
                ? "Add turn"
                : "Send"}
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
        </Show>
        <Show when={props.scenario === "opening-position"}>
          <For each={["start", "end", "last-anchor"] as const}>
            {(option) => (
              <Button
                size="sm"
                variant={position() === option ? "default" : "outline"}
                onClick={() => openAt(option)}
              >
                {option}
              </Button>
            )}
          </For>
        </Show>
        <Show when={props.scenario === "commands"}>
          <select
            aria-label="Jump to message"
            class="w-full truncate text-sm"
            onChange={(event) => jump(Number(event.currentTarget.value))}
          >
            <option value="" disabled selected>
              Jump to message
            </option>
            <For each={props.messages}>
              {(line, index) => (
                <Show when={line.role === "user"}>
                  <option value={index()}>{line.text}</option>
                </Show>
              )}
            </For>
          </select>
          <Button size="sm" variant="outline" onClick={() => scroll.scrollToStart()}>
            Start
          </Button>
          <Button size="sm" onClick={() => scroll.scrollToEnd()}>
            End
          </Button>
        </Show>
        <Show when={props.scenario === "load-history"}>
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
        </Show>
        <Show when={props.scenario === "visibility" || props.scenario === "scrollable"}>
          <output class="text-sm text-muted-foreground">{status()}</output>
        </Show>
      </CardFooter>
    </Card>
  )
}

export { default } from "./message-scroller-demo"
