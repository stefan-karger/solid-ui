import { createSignal, For, Show } from "solid-js"

import { ArrowUpIcon, MessageCircleDashedIcon, RotateCwIcon } from "lucide-solid"

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
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/registry/ui/empty"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport
} from "~/registry/ui/message-scroller"
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

import { createScript, type DemoMessage, MessageAnimated } from "./message-scroller-utils"

type AnchorRole = DemoMessage["role"]

const anchorScript = createScript("anchor", [
  {
    question: "Can you show me how anchoring behaves when a new prompt starts the turn?",
    answer:
      "Append the user prompt first, then append the assistant response. With User selected, the prompt settles near the top and the assistant response fills in below it."
  },
  {
    question: "What changes when assistant messages are the anchor?",
    answer:
      "Now each assistant response is the item `MessageScroller` keeps in view. This is useful when the reply is the moment you want readers to land on after each turn."
  },
  {
    question: "Can I switch roles and keep adding turns?",
    answer:
      "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo."
  }
])

export default function MessageScrollerAnchoring() {
  const [anchorRole, setAnchorRole] = createSignal<AnchorRole>("user")
  const [messages, setMessages] = createSignal<DemoMessage[]>([])
  const [messageIndex, setMessageIndex] = createSignal(0)
  const nextMessage = () => anchorScript.messages[messageIndex()]

  const reset = () => {
    setMessages([])
    setMessageIndex(0)
  }

  return (
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="border-b">
          <CardTitle>Anchoring Turns</CardTitle>
          <CardDescription>Choose which role settles near the top edge.</CardDescription>
          <CardAction>
            <Button
              aria-label="Reset anchored turns"
              disabled={messages().length === 0}
              onClick={reset}
              size="icon"
              variant="outline"
            >
              <RotateCwIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
          <Show
            fallback={
              <Empty class="h-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MessageCircleDashedIcon />
                  </EmptyMedia>
                  <EmptyTitle>No anchored messages yet</EmptyTitle>
                  <EmptyDescription>
                    Send the first message to see the selected role anchor.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            }
            when={messages().length > 0}
          >
            <MessageScrollerProvider>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent class="p-6">
                    <For each={messages()}>
                      {(message) => (
                        <MessageAnimated
                          assistantVariant="ghost"
                          message={message}
                          scrollAnchor={message.role === anchorRole()}
                          userVariant="muted"
                        />
                      )}
                    </For>
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </MessageScrollerProvider>
          </Show>
        </CardContent>
        <CardFooter>
          <ToggleGroup
            aria-label="Select scroll anchor role"
            onChange={(value) => {
              if (value === "user" || value === "assistant") {
                setAnchorRole(value)
                reset()
              }
            }}
            value={anchorRole()}
          >
            <ToggleGroupItem aria-label="Anchor user messages" value="user">
              User
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Anchor assistant messages" value="assistant">
              Assistant
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            class="ml-auto"
            disabled={!nextMessage()}
            onClick={() => {
              const message = nextMessage()
              if (!message) return

              setMessages((current) => [...current, message])
              setMessageIndex((index) => index + 1)
            }}
            size="icon"
          >
            <ArrowUpIcon />
            <span class="sr-only">Send Message</span>
          </Button>
        </CardFooter>
      </Card>
      <div class="mx-auto max-w-xs px-0.5 text-center text-muted-foreground text-xs">
        Toggle the anchor role, then send messages to compare where turns settle.
      </div>
    </div>
  )
}
