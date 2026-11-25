// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For, createSignal, createMemo } from "solid-js"

import {
  useDemoChat,
  type UIDataTypes,
  type UIMessage,
  createChat,
  getMessageText
} from "~/registry/lib/ai-demo-chat"
import { Markdown } from "~/registry/lib/ai-demo-markdown"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { CodeBlock, CodeBlockContent } from "~/registry/ui/code-block"
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
  InputGroupButton,
  InputGroupTextarea
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

type ChatPart = ChatMessage["parts"][number]

type ToolPart = Extract<ChatPart, { type: "tool-runCommand" }>

const chat = createChat<ChatMessage>()
  .user("Add a dark mode toggle to the settings page.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "I need to know how themes are set up before I add a toggle. If next-themes is already in the layout, the toggle only has to call setTheme."
    )
    writer.sleep(400)
    writer
      .tool("runCommand", { input: { command: "rg -l ThemeProvider app" } })
      .sleep(800)
      .output({ stdout: "app/layout.tsx" })
    writer.sleep(500)
    writer.text(`next-themes is already set up in \`app/layout.tsx\`, so the toggle only has to call \`setTheme\`.

**Changes**

- Added \`components/mode-toggle.tsx\` with a Light and Dark option.
- Put \`<ModeToggle />\` next to the Appearance heading in \`app/settings/page.tsx\`.

\`\`\`tsx
const { setTheme } = useTheme()
\`\`\`
`)
  })
  .user("Make it follow the system setting by default.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "The default theme lives on the ThemeProvider. I should check what it is set to now."
    )
    writer.sleep(400)
    writer
      .tool("runCommand", {
        input: { command: "rg -n defaultTheme app/layout.tsx" }
      })
      .sleep(800)
      .output({
        stdout: '12:  <ThemeProvider attribute="class" defaultTheme="light">'
      })
    writer.sleep(500)
    writer.text(`It was set to \`light\`. I updated the \`ThemeProvider\` in \`app/layout.tsx\`:

\`\`\`tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
\`\`\`

New visitors now get the theme from their OS. The toggle also has a **System** option, so anyone who picked Light or Dark can switch back.
`)
  })
  .user("Run the build before I ship it.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer
      .tool("runCommand", { input: { command: "pnpm build" } })
      .sleep(1600)
      .output({
        stdout:
          "▲ Next.js 16.0.0\n\n✓ Compiled successfully in 4.2s\n✓ Linting and checking validity of types\n✓ Generating static pages (12/12)"
      })
    writer.sleep(500)
    writer.text(`The build passes, so it is ready to ship.

- Compiled in **4.2s**.
- No lint or type errors.
- Generated all **12** static pages.
`)
  })

const initialMessages = chat.get(0)
const transport = chat.transport({
  delayMs: 16,
  fallback:
    "This demo only knows the scripted turns. Press reset to start over."
})

export default function ChatDemo() {
  const { messages, sendMessage, setMessages, status } = useDemoChat({
    messages: initialMessages,
    transport
  })
  const [draft, setDraft] = createSignal<string | null>(null)
  let formRef: HTMLFormElement | undefined
  let viewport: HTMLDivElement | undefined

  const nextMessage = () => chat.next(messages())
  const busy = () => status() === "submitted" || status() === "streaming"
  const text = () => draft() ?? getMessageText(nextMessage())
  const canSend = () => text().trim().length > 0 && !busy()

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    if (!canSend()) {
      return
    }

    if (draft() === null && nextMessage()) {
      void sendMessage(nextMessage())
    } else {
      void sendMessage({ text: text().trim() })
    }
    setDraft(null)
    requestAnimationFrame(() => {
      const turn =
        viewport &&
        Array.from(viewport.querySelectorAll("[data-user-turn]")).at(-1)
      if (!turn || !viewport) return
      viewport.scrollTo({
        top:
          viewport.scrollTop +
          turn.getBoundingClientRect().top -
          viewport.getBoundingClientRect().top
      })
    })
  }

  return (
    <>
      <div class="relative flex w-full flex-col gap-4 [[data-slot=preview]:has(&)]:bg-background [[data-slot=preview]:has(&)>div]:p-0!">
        <div class="flex h-200 w-full flex-col gap-4">
          <div class="flex items-start justify-between gap-4 p-8 pb-4">
            <div class="flex flex-col gap-1">
              <div class="font-medium">New Thread</div>
              <div class="text-sm text-muted-foreground">
                Ask the agent to change your code.
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger
                render={(triggerProps) => (
                  <Button
                    {...triggerProps}
                    variant="outline"
                    size="icon-sm"
                    aria-label="Reset conversation"
                    onClick={() => {
                      setMessages(initialMessages)
                      setDraft(null)
                    }}
                    disabled={busy()}
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
                  </Button>
                )}
              />
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div class="min-h-0 flex-1">
            {messages().length === 0 ? (
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
                  <EmptyTitle>What should we build?</EmptyTitle>
                  <EmptyDescription>
                    The agent can read your code, run commands and make changes.
                    Press send to start.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <MessageScroller>
                <MessageScrollerViewport
                  ref={(element) => {
                    viewport = element
                  }}
                >
                  <MessageScrollerContent
                    aria-busy={busy() ? "true" : "false"}
                    class="gap-6 px-8 py-0"
                  >
                    {
                      <For each={messages()}>
                        {(message) => {
                          const content = createMemo(() => {
                            if (message.role === "user") {
                              return (
                                <MessageScrollerItem data-user-turn>
                                  <Message align="end">
                                    <MessageContent>
                                      <Bubble align="end" variant="muted">
                                        <BubbleContent>
                                          {getMessageText(message)}
                                        </BubbleContent>
                                      </Bubble>
                                    </MessageContent>
                                  </Message>
                                </MessageScrollerItem>
                              )
                            }

                            const streaming =
                              busy() && message === messages().at(-1)
                            const steps = message.parts.filter(
                              (part) =>
                                part.type === "reasoning" ||
                                part.type === "tool-runCommand"
                            )
                            const reply = getMessageText(message)

                            return (
                              <MessageScrollerItem>
                                <Message>
                                  <MessageContent class="gap-3">
                                    {steps.length > 0 && (
                                      <Trace>
                                        {
                                          <For each={steps}>
                                            {(part) => (
                                              <StepRow
                                                part={part}
                                                streaming={streaming}
                                              />
                                            )}
                                          </For>
                                        }
                                      </Trace>
                                    )}
                                    {reply && <Markdown>{reply}</Markdown>}
                                  </MessageContent>
                                </Message>
                              </MessageScrollerItem>
                            )
                          })
                          return <>{content()}</>
                        }}
                      </For>
                    }
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            )}
          </div>
          <div class="p-8 pt-0">
            <form
              ref={(element) => {
                formRef = element
              }}
              onSubmit={onSubmit}
              class="w-full"
            >
              <InputGroup>
                <InputGroupTextarea
                  value={text()}
                  onInput={(event) => setDraft(event.currentTarget.value)}
                  placeholder="Ask the agent..."
                  aria-label="Message"
                  class="min-h-14"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault()
                      formRef?.requestSubmit()
                    }
                  }}
                />
                <InputGroupAddon align="block-end" class="pt-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={(triggerProps) => (
                        <InputGroupButton
                          {...triggerProps}
                          aria-label="Add context"
                          type="button"
                          size="icon-sm"
                          variant="outline"
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
                        </InputGroupButton>
                      )}
                    />
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
                        </svg>
                        Add Photos & Files
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
                          <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
                          <path d="m13.56 11.747 4.332-.924" />
                          <path d="m16 21-3.105-6.21" />
                          <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
                          <path d="m6.158 8.633 1.114 4.456" />
                          <path d="m8 21 3.105-6.21" />
                          <circle cx="12" cy="13" r="2" />
                        </svg>
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
                        </svg>
                        Web Search
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <InputGroupButton
                    type="submit"
                    variant="default"
                    size="icon-sm"
                    disabled={!canSend()}
                    class="ml-auto"
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
          </div>
        </div>
      </div>
    </>
  )
}

function StepRow(componentProps: { part: ChatPart; streaming: boolean }) {
  const content = createMemo(() => {
    const { part, streaming } = componentProps
    if (part.type === "reasoning") {
      return (
        <ReasoningRow text={part.text} running={part.state === "streaming"} />
      )
    }
    if (part.type === "tool-runCommand") {
      return <ToolRow part={part} streaming={streaming} />
    }
    return null
  })
  return <>{content()}</>
}

function ReasoningRow(componentProps: { text: string; running: boolean }) {
  const [open, setOpen] = createSignal<boolean>()
  const content = createMemo(() => {
    const { text, running } = componentProps
    return (
      <TraceCollapsible open={open() ?? running} onOpenChange={setOpen}>
        <TraceCollapsibleTrigger>
          <TraceLine status={running ? "running" : undefined}>
            <TraceIcon>
              {running ? (
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
              )}
            </TraceIcon>
            <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent class="whitespace-pre-wrap">
          {text}
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  })
  return <>{content()}</>
}

function ToolRow(componentProps: { part: ToolPart; streaming: boolean }) {
  const content = createMemo(() => {
    const { part, streaming } = componentProps
    const command = part.input?.command
    if (part.state === "output-available" || part.state === "output-error") {
      const failed = part.state === "output-error"

      return (
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status={failed ? "error" : undefined}>
              <TraceIcon>
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
                  <path d="M12 19h8" />
                  <path d="m4 17 6-6-6-6" />
                </svg>
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
            <path d="M12 19h8" />
            <path d="m4 17 6-6-6-6" />
          </svg>
        </TraceIcon>
        <TraceTitle>
          {streaming ? "Running" : "Failed to run"} {command}
        </TraceTitle>
      </TraceLine>
    )
  })
  return <>{content()}</>
}
