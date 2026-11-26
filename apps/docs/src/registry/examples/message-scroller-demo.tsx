// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { createSignal, For, onCleanup, Show } from "solid-js"

import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "~/registry/ui/input-group"
import { Message, MessageContent } from "~/registry/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport
} from "~/registry/ui/message-scroller"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

const messages = [
  {
    role: "user",
    text: "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around."
  },
  {
    role: "assistant",
    text: "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `stickToEnd` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."
  },
  {
    role: "user",
    text: "Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top."
  },
  {
    role: "assistant",
    text: "MessageScrollerItem fixes that with turn anchoring. Scroll to the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container."
  },
  {
    role: "user",
    text: "And if they've scrolled up to re-read an older answer? I don't want to yank them back down."
  },
  {
    role: "assistant",
    text: "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not."
  },
  {
    role: "user",
    text: "Last one — does this work with assistive tech?"
  },
  {
    role: "assistant",
    text: '`MessageScrollerContent` sets `role="log"` and `aria-relevant="additions"` by default, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.'
  }
]

export default function MessageScrollerDemo() {
  const [count, setCount] = createSignal(0)
  const [response, setResponse] = createSignal("")
  const [busy, setBusy] = createSignal(false)
  const next = () => messages[count()]
  let timer: ReturnType<typeof setInterval> | undefined
  onCleanup(() => clearInterval(timer))

  function send() {
    const index = count()
    const answer = messages[index + 1]
    if (busy() || !answer) return
    setCount(index + 1)
    setBusy(true)
    const words = answer.text.match(/\S+\s*/g) ?? []
    let offset = 0
    timer = setInterval(() => {
      setResponse(words.slice(0, (offset += 2)).join(""))
      if (offset >= words.length) {
        clearInterval(timer)
        setCount(index + 2)
        setBusy(false)
        setResponse("")
      }
    }, 24)
  }

  return (
    <div class="flex w-full flex-col gap-4 text-start">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="gap-1 border-b">
          <CardTitle>New Chat</CardTitle>
          <CardDescription>How can I help you today?</CardDescription>
          <CardAction>
            <Tooltip>
              <TooltipTrigger
                render={(part) => (
                  <Button
                    {...part}
                    variant="outline"
                    size="icon"
                    aria-label="Reset conversation"
                    disabled={busy()}
                    onClick={() => setCount(0)}
                  />
                )}
              >
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
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>Reset</TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
          <Show
            when={count() > 0}
            fallback={
              <Empty class="h-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
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
                      <path d="M17.609 3.72a10 10 0 0 1 2.69 2.7" />
                      <path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
                      <path d="M20.28 17.61a10 10 0 0 1-2.7 2.69" />
                      <path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
                      <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
                      <path d="m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98" />
                    </svg>
                  </EmptyMedia>
                  <EmptyTitle>Morning, Alex!</EmptyTitle>
                  <EmptyDescription>
                    What are we working on today? Press send to start a new
                    conversation
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            }
          >
            <MessageScroller class="h-full">
              <MessageScrollerViewport role="region" aria-label="Messages">
                <MessageScrollerContent
                  class="gap-4 p-(--card-spacing)"
                  role="log"
                  aria-relevant="additions"
                  aria-busy={busy() ? "true" : "false"}
                >
                  <For each={messages.slice(0, count())}>
                    {(message) => (
                      <MessageScrollerItem>
                        <Message
                          align={message.role === "user" ? "end" : "start"}
                        >
                          <MessageContent>
                            <Bubble
                              variant={
                                message.role === "user" ? "muted" : "ghost"
                              }
                            >
                              <BubbleContent class="whitespace-pre-wrap">
                                {message.text}
                              </BubbleContent>
                            </Bubble>
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    )}
                  </For>
                  <Show when={busy()}>
                    <Bubble variant="ghost">
                      <BubbleContent class="whitespace-pre-wrap">
                        {response()}
                      </BubbleContent>
                    </Bubble>
                  </Show>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </Show>
        </CardContent>
        <CardFooter class="flex-col gap-2">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              send()
            }}
            class="w-full"
          >
            <InputGroup>
              <div class="h-14 w-full px-3 py-2.5">
                <span class={["line-clamp-2", { "opacity-60": busy() }]}>
                  {next()?.text ??
                    "No messages queued. Reset the conversation."}
                </span>
              </div>
              <InputGroupAddon align="block-end" class="pt-1">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={(part) => (
                      <InputGroupButton
                        {...part}
                        aria-label="Add files"
                        type="button"
                        size="icon-sm"
                        variant="outline"
                      />
                    )}
                  >
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
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="top" class="w-44">
                    <DropdownMenuItem>
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
                        <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                      </svg>{" "}
                      Add Photos &amp; Files
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
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
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>{" "}
                      Create Image
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
                        <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
                        <path d="m13.56 11.747 4.332-.924" />
                        <path d="m16 21-3.105-6.21" />
                        <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
                        <path d="m6.158 8.633 1.114 4.456" />
                        <path d="m8 21 3.105-6.21" />
                        <circle cx="12" cy="13" r="2" />
                      </svg>{" "}
                      Deep Research
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>{" "}
                      Web Search
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <InputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-sm"
                  disabled={!next() || busy()}
                  class="ms-auto"
                >
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
                    <path d="m5 12 7-7 7 7" />
                    <path d="M12 19V5" />
                  </svg>
                  <span class="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </CardFooter>
      </Card>
      <div class="px-0.5 text-center text-xs text-muted-foreground">
        Demo is read only. Press send to send messages.
      </div>
    </div>
  )
}
