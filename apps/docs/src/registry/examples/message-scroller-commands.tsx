import { For } from "solid-js"

import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { Message, MessageContent } from "~/registry/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller
} from "~/registry/ui/message-scroller"

import { createScript, type DemoMessage, splitParagraphs } from "./message-scroller-utils"

const script = createScript("command", [
  {
    questionId: "command-activation",
    question:
      "We're seeing activation dip after workspace creation. Can you help me find the likely step?",
    answer:
      "The sharpest drop is between creating the workspace and inviting the first teammate.\n\nWorkspace creation is still healthy, but the invite step is where users pause. That suggests the product is asking for collaboration before the user has enough confidence in the workspace."
  },
  {
    questionId: "command-compare",
    question: "What should I compare before we change the onboarding flow?",
    answer:
      "Compare three cohorts:\n\n1. Users who choose a template before inviting teammates.\n2. Users who start from a blank workspace.\n3. Users who skip invites and return within 24 hours.\n\nIf template users invite faster, the fix is probably better first-run guidance rather than a louder invite prompt."
  },
  {
    questionId: "command-experiment",
    question: "Can you turn that into an experiment?",
    answer:
      "Yes. Create a variant that shows a short checklist after workspace creation:\n\n- Pick a template.\n- Add one project detail.\n- Invite a teammate when the workspace has context.\n\nMeasure first invite completion, 24-hour return rate, and whether teams create a second project."
  },
  {
    questionId: "command-risk",
    question: "What's the risk if we delay the invite prompt?",
    answer:
      "The main risk is reducing team creation for accounts that already know who they want to invite.\n\nTo protect that path, keep the invite action visible in the header and only change the primary empty-state guidance. That gives confident teams a direct route without forcing uncertain users through the invite step too early."
  }
])

export default function MessageScrollerCommands() {
  return (
    <MessageScrollerProvider defaultScrollPosition="end">
      <div class="relative flex flex-col gap-4">
        <Card class="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader class="gap-1 border-b">
            <CardTitle>Commands</CardTitle>
            <CardDescription>Drive the transcript from outside.</CardDescription>
            <CardAction>
              <CommandMenu />
            </CardAction>
          </CardHeader>
          <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent class="p-6">
                  <For each={script.messages}>
                    {(message) => {
                      const isUser = message.role === "user"

                      return (
                        <MessageScrollerItem messageId={message.id} scrollAnchor={isUser}>
                          <Message align={isUser ? "end" : "start"}>
                            <MessageContent>
                              <Bubble variant={isUser ? "muted" : "ghost"}>
                                <BubbleContent class="space-y-2">
                                  <For each={splitParagraphs(message.text)}>
                                    {(paragraph) => <p class="whitespace-pre-wrap">{paragraph}</p>}
                                  </For>
                                </BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScrollerItem>
                      )
                    }}
                  </For>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
        </Card>
        <div class="mx-auto max-w-sm text-balance px-0.5 text-center text-muted-foreground text-xs">
          Use the controls to jump to any message in the conversation.
        </div>
      </div>
    </MessageScrollerProvider>
  )
}

function CommandMenu() {
  const { scrollToMessage } = useMessageScroller()

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger as={Button} type="button" variant="secondary">
        Jump to...
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Conversations</DropdownMenuLabel>
          <For each={script.userMessages}>
            {(message) => (
              <DropdownMenuItem
                onSelect={() => scrollToMessage(message.id, { align: "start", behavior: "smooth" })}
              >
                <span class="line-clamp-1 min-w-0">{getTrimmedMessageText(message)}</span>
              </DropdownMenuItem>
            )}
          </For>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getTrimmedMessageText(message: DemoMessage) {
  return message.text.length > 42 ? `${message.text.slice(0, 39)}...` : message.text
}
