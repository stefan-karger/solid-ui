import { createSignal, onCleanup } from "solid-js"

export type UIDataTypes = Record<string, unknown>
type ToolTypes = Record<string, { input: unknown; output: unknown }>
type ToolPart<Tools extends ToolTypes> = {
  [Name in keyof Tools & string]: {
    type: `tool-${Name}`
    toolCallId: string
    input: Tools[Name]["input"]
  } & (
    | { state: "input-available" }
    | { state: "input-streaming" }
    | {
        state: "output-available"
        output: Tools[Name]["output"]
        preliminary?: boolean
      }
    | { state: "output-error"; errorText: string }
    | { state: "output-denied"; approval: { id: string; approved: false } }
    | { state: "approval-requested"; approval: { id: string } }
    | {
        state: "approval-responded"
        approval: { id: string; approved: boolean }
      }
  )
}[keyof Tools & string]

export type UIMessage<
  Metadata = unknown,
  Data extends UIDataTypes = UIDataTypes,
  Tools extends ToolTypes = ToolTypes
> = {
  id: string
  role: "user" | "assistant"
  metadata?: Metadata
  parts: (
    | { type: "text"; text: string; state?: "streaming" | "done" }
    | { type: "reasoning"; text: string; state?: "streaming" | "done" }
    | { type: "source-url"; url: string; title?: string }
    | {
        [Name in keyof Data & string]: {
          type: `data-${Name}`
          id?: string
          data: Data[Name]
        }
      }[keyof Data & string]
    | ToolPart<Tools>
  )[]
}

type Part = UIMessage["parts"][number]
type Approval = { id: string; approved: boolean }
type Frame = { part: Part; slot: number; delay?: number } | { pause: number }
type Turn<M> =
  | { message: M; pause: number }
  | { write: (context: { writer: DemoWriter; toolCall?: Approval }) => void }

class DemoWriter {
  frames: Frame[] = []
  private slots = 0
  private dataSlots = new Map<string, number>()

  private words(type: "text" | "reasoning", text: string, delay?: number) {
    const slot = this.slots++
    const chunks = text.match(/\S+\s*|^\s+/g) ?? []
    let written = ""
    for (const chunk of chunks) {
      written += chunk
      this.frames.push({
        slot,
        part: { type, text: written, state: "streaming" },
        ...(delay === undefined ? {} : { delay })
      })
    }
    this.frames.push({ slot, part: { type, text, state: "done" }, delay: 0 })
    return this
  }

  text(text: string, options?: { delayMs?: number }) {
    return this.words("text", text, options?.delayMs)
  }

  reasoning(text: string, options?: { delayMs?: number }) {
    return this.words("reasoning", text, options?.delayMs)
  }

  sleep(pause: number) {
    this.frames.push({ pause })
    return this
  }

  data(part: Extract<Part, { type: `data-${string}` }>) {
    const key = part.id ? `${part.type}:${part.id}` : undefined
    const slot = (key ? this.dataSlots.get(key) : undefined) ?? this.slots++
    if (key) this.dataSlots.set(key, slot)
    this.frames.push({ slot, part })
    return this
  }

  sourceUrl(source: { url: string; title?: string }) {
    this.frames.push({
      slot: this.slots++,
      part: { type: "source-url", ...source }
    })
    return this
  }

  tool(
    name: string,
    options: {
      input: unknown
      toolCallId?: string
      needsApproval?: boolean
      output?: unknown
    }
  ) {
    const slot = this.slots++
    const toolCallId = options.toolCallId ?? `tool-${slot}`
    const detail = {
      type: `tool-${name}` as const,
      toolCallId,
      input: options.input
    }
    const approval = { id: toolCallId }
    this.frames.push({
      slot,
      part: options.needsApproval
        ? { ...detail, state: "approval-requested", approval }
        : { ...detail, state: "input-available" }
    })
    const handle = {
      sleep: (pause: number) => {
        this.sleep(pause)
        return handle
      },
      output: (output: unknown, settings?: { preliminary?: boolean }) => {
        this.frames.push({
          slot,
          part: { ...detail, state: "output-available", output, ...settings }
        })
        return handle
      },
      error: (errorText: string) => {
        this.frames.push({
          slot,
          part: { ...detail, state: "output-error", errorText }
        })
        return handle
      }
    }
    if ("output" in options && !options.needsApproval)
      handle.output(options.output)
    return handle
  }
}

export function getMessageText(message: Pick<UIMessage, "parts"> | undefined) {
  return (
    message?.parts.reduce(
      (text, part) => (part.type === "text" ? text + part.text : text),
      ""
    ) ?? ""
  )
}

export function createChat<M extends UIMessage = UIMessage>() {
  const turns: Turn<M>[] = []
  const render = (index: number, approval?: Approval) => {
    const turn = turns[index]
    if (!turn || "message" in turn) return []
    const writer = new DemoWriter()
    turn.write({ writer, ...(approval ? { toolCall: approval } : {}) })
    return writer.frames
  }
  const chat = {
    user(text: string) {
      const message = {
        role: "user",
        id: String(turns.length),
        parts: [{ type: "text", text }]
      } as M
      turns.push({ message, pause: 0 })
      return chat
    },
    sleep(pause: number) {
      const turn = turns.at(-1)
      if (turn && "message" in turn) turn.pause = pause
      return chat
    },
    assistant(write: Extract<Turn<M>, { write: unknown }>["write"]) {
      turns.push({ write })
      return chat
    },
    get(count = turns.length): M[] {
      return turns.slice(0, count).map((turn, index) => {
        if ("message" in turn) return turn.message
        const parts: Part[] = []
        for (const frame of render(index)) {
          if ("part" in frame) parts[frame.slot] = frame.part
        }
        return { role: "assistant", id: String(index), parts } as M
      })
    },
    next(messages: readonly M[]) {
      const turn = turns[messages.length]
      return turn && "message" in turn ? turn.message : undefined
    },
    transport(options: { delayMs?: number; fallback?: string } = {}) {
      return { turns, render, delayMs: 20, ...options }
    }
  }
  return chat
}

type Transport<M extends UIMessage> = ReturnType<
  ReturnType<typeof createChat<M>>["transport"]
>

export function useDemoChat<M extends UIMessage>(props: {
  messages: M[]
  transport: Transport<M>
}) {
  let current = props.messages
  let timer: ReturnType<typeof setTimeout> | undefined
  let generation = 0
  const [messages, publish] = createSignal(current)
  const [status, setStatus] = createSignal<"ready" | "submitted" | "streaming">(
    "ready"
  )

  const update = (next: M[]) => {
    current = next
    publish(next)
  }
  const stop = () => {
    generation++
    clearTimeout(timer)
  }
  onCleanup(stop)

  function setMessages(next: M[]) {
    stop()
    update(next)
    setStatus("ready")
  }

  function stream(index: number, frames: Frame[], pause = 0) {
    stop()
    const run = generation
    const transcript = current.slice()
    const parts: Part[] = []
    let frameIndex = 0
    setStatus("submitted")
    function tick() {
      if (run !== generation) return
      const frame = frames[frameIndex++]
      if (!frame) {
        setStatus("ready")
        return
      }
      if ("pause" in frame) {
        timer = setTimeout(tick, frame.pause)
        return
      }
      parts[frame.slot] = frame.part
      setStatus("streaming")
      update([
        ...transcript,
        { role: "assistant", id: String(index), parts: parts.slice() } as M
      ])
      timer = setTimeout(tick, frame.delay ?? props.transport.delayMs)
    }
    timer = setTimeout(tick, pause)
  }

  function sendMessage(message: M | { text: string } | undefined) {
    if (!message) return
    const index = current.length
    const turn = props.transport.turns[index]
    const expected = turn && "message" in turn ? turn : undefined
    const text = "text" in message ? message.text : getMessageText(message)
    const frames =
      expected && text === getMessageText(expected.message)
        ? props.transport.render(index + 1)
        : [
            {
              slot: 0,
              part: {
                type: "text" as const,
                text: props.transport.fallback ?? ""
              }
            }
          ]
    update([
      ...current,
      { role: "user", id: String(index), parts: [{ type: "text", text }] } as M
    ])
    stream(index + 1, frames, expected?.pause)
  }

  function addToolApprovalResponse(approval: Approval) {
    const message = current.at(-1)
    if (!message) return
    const parts = message.parts.map((part): Part =>
      "approval" in part && part.approval.id === approval.id
        ? ({
            ...part,
            state: approval.approved ? "output-available" : "output-denied",
            approval,
            output: { stdout: "" }
          } as Part)
        : part
    )
    update([...current.slice(0, -1), { ...message, parts } as M])
    stream(current.length, props.transport.render(current.length, approval))
  }

  return { messages, status, setMessages, sendMessage, addToolApprovalResponse }
}
