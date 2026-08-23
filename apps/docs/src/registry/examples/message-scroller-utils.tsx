import { type ComponentProps, createSignal, For, onCleanup } from "solid-js"
import { createStore, produce, reconcile } from "solid-js/store"

import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Message, MessageContent } from "~/registry/ui/message"
import { MessageScrollerItem } from "~/registry/ui/message-scroller"

type BubbleVariant = ComponentProps<typeof Bubble>["variant"]

type ChatStatus = "ready" | "streaming" | "submitted"

type DemoMessage = {
  id: string
  role: "assistant" | "user"
  text: string
}

type ScriptTurn = {
  answer: string
  answerId?: string
  question: string
  questionId?: string
}

type DemoScript = {
  get: (count?: number) => DemoMessage[]
  messages: DemoMessage[]
  userMessages: DemoMessage[]
}

/**
 * Builds a deterministic transcript from question/answer turns. Mirrors the
 * upstream `createChat().user().assistant()` helper: a flat message list that
 * demos slice to choose how much history is already on screen.
 */
function createScript(name: string, turns: ScriptTurn[]): DemoScript {
  const messages = turns.flatMap<DemoMessage>((turn, index) => [
    {
      id: turn.questionId ?? `${name}-${index + 1}-user`,
      role: "user",
      text: turn.question
    },
    {
      id: turn.answerId ?? `${name}-${index + 1}-assistant`,
      role: "assistant",
      text: turn.answer
    }
  ])

  return {
    get: (count = messages.length) => messages.slice(0, count),
    messages,
    userMessages: messages.filter((message) => message.role === "user")
  }
}

function splitParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

type ScriptedChatOptions = {
  /** Milliseconds between streamed word chunks. */
  delayMs?: number
  /** How many scripted messages are already on screen. */
  initialCount?: number
  script: DemoScript
  /** Milliseconds spent in `submitted` before the answer starts streaming. */
  thinkingMs?: number
}

/**
 * Replays a script one turn at a time, streaming each answer word by word.
 * Stands in for the upstream `useChat` + fake transport pairing.
 */
function createScriptedChat(options: ScriptedChatOptions) {
  const initialCount = options.initialCount ?? 0
  const delayMs = options.delayMs ?? 20
  const thinkingMs = options.thinkingMs ?? 1_000
  // A store keeps each message's DOM node stable while its text streams in;
  // replacing the array objects would tear down and recreate the live bubble.
  const [messages, setMessages] = createStore<DemoMessage[]>(options.script.get(initialCount))
  const [status, setStatus] = createSignal<ChatStatus>("ready")
  let thinkingTimer: ReturnType<typeof setTimeout> | undefined
  let streamTimer: ReturnType<typeof setInterval> | undefined

  const clearTimers = () => {
    if (thinkingTimer) clearTimeout(thinkingTimer)
    if (streamTimer) clearInterval(streamTimer)
    thinkingTimer = undefined
    streamTimer = undefined
  }

  onCleanup(clearTimers)

  const isBusy = () => status() !== "ready"
  const nextMessage = () => {
    const candidate = options.script.messages[messages.length]
    return candidate?.role === "user" ? candidate : undefined
  }

  const streamAnswer = (answer: DemoMessage | undefined) => {
    if (!answer) {
      setStatus("ready")
      return
    }

    const chunks = answer.text.match(/\S+\s*/g) ?? [answer.text]
    let chunkIndex = 0

    setMessages(produce((current) => current.push({ ...answer, text: "" })))
    setStatus("streaming")

    streamTimer = setInterval(() => {
      const chunk = chunks[chunkIndex]
      if (chunk) {
        setMessages(
          (message) => message.id === answer.id,
          "text",
          (text) => `${text}${chunk}`
        )
        chunkIndex += 1
      }

      if (chunkIndex < chunks.length) return

      clearTimers()
      setStatus("ready")
    }, delayMs)
  }

  const send = () => {
    const question = nextMessage()
    if (!question || isBusy()) return

    const answer = options.script.messages[messages.length + 1]
    setMessages(produce((current) => current.push({ ...question })))
    setStatus("submitted")

    thinkingTimer = setTimeout(() => {
      thinkingTimer = undefined
      streamAnswer(answer)
    }, thinkingMs)
  }

  const reset = () => {
    clearTimers()
    setMessages(reconcile(options.script.get(initialCount)))
    setStatus("ready")
  }

  return { isBusy, messages, nextMessage, reset, send, status }
}

/** The scroll-behavior conversation shared by the overview, streaming, and context demos. */
const scrollBehaviorScript = createScript("scroll-behavior", [
  {
    question:
      "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.",
    answer:
      "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."
  },
  {
    question:
      "Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top.",
    answer:
      "MessageScroller.Item fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container."
  },
  {
    question:
      "And if they've scrolled up to re-read an older answer? I don't want to yank them back down.",
    answer:
      "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScroller.Button` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not."
  },
  {
    question: "Last one — does this work with assistive tech?",
    answer:
      '`MessageScroller.Content` sets `role="log"` and `aria-relevant="additions"` by default, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.'
  }
])

const ANIMATIONS = [
  { class: "animate-in fade-in duration-200 ease-out", id: "fade", name: "Fade" },
  {
    class: "animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out",
    id: "slide-up",
    name: "Slide Up"
  },
  {
    class: "animate-in fade-in slide-in-from-right-4 duration-300 ease-out",
    id: "slide-side",
    name: "Slide Side"
  },
  {
    class: "animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300 ease-out",
    id: "pop",
    name: "Pop"
  },
  {
    class:
      "animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    id: "spring-bounce",
    name: "Spring Bounce"
  },
  {
    class: "animate-in fade-in blur-in-[4px] slide-in-from-bottom-2 duration-300 ease-out",
    id: "blur-fade",
    name: "Blur Fade"
  },
  {
    class: "animate-in fade-in zoom-in-95 duration-200 ease-out",
    id: "scale-fade",
    name: "Scale Fade"
  }
] as const

type MessageAnimationPreset = (typeof ANIMATIONS)[number]
type MessageAnimationId = MessageAnimationPreset["id"]

const MESSAGE_ANIMATIONS = ANIMATIONS.reduce(
  (presets, preset) => {
    presets[preset.id] = preset
    return presets
  },
  {} as Record<MessageAnimationId, MessageAnimationPreset>
)

type MessageAnimatedProps = {
  animationPreset?: MessageAnimationPreset
  assistantVariant?: BubbleVariant
  message: DemoMessage
  scrollAnchor?: boolean
  userVariant?: BubbleVariant
}

/**
 * A transcript row: user turns anchor and animate on entry, assistant turns
 * stream in place. Matches the upstream `MessageAnimated` demo component.
 */
function MessageAnimated(props: MessageAnimatedProps) {
  const isUser = () => props.message.role === "user"
  // Only user turns animate in; an assistant turn is already streaming its own
  // text. Read once at creation so changing the preset later cannot re-trigger
  // the entry animation on rows that are already on screen.
  const enterClass =
    props.message.role === "user"
      ? (props.animationPreset ?? MESSAGE_ANIMATIONS["slide-up"]).class
      : undefined
  const paragraphs = () => splitParagraphs(props.message.text)

  return (
    <MessageScrollerItem
      class={enterClass}
      messageId={props.message.id}
      scrollAnchor={isUser() ? (props.scrollAnchor ?? true) : props.scrollAnchor}
    >
      <Message align={isUser() ? "end" : "start"}>
        <MessageContent>
          <Bubble
            variant={
              isUser() ? (props.userVariant ?? "muted") : (props.assistantVariant ?? "ghost")
            }
          >
            <BubbleContent class="space-y-2">
              <For each={paragraphs()}>
                {(paragraph) => <p class="whitespace-pre-wrap">{paragraph}</p>}
              </For>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  )
}

export type {
  BubbleVariant,
  ChatStatus,
  DemoMessage,
  DemoScript,
  MessageAnimationId,
  MessageAnimationPreset,
  ScriptTurn
}
export {
  createScript,
  createScriptedChat,
  MESSAGE_ANIMATIONS,
  MessageAnimated,
  scrollBehaviorScript,
  splitParagraphs
}
