import { createSignal, For, Show } from "solid-js"

import { RotateCwIcon } from "lucide-solid"

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
import { Marker, MarkerContent } from "~/registry/ui/marker"
import { Message, MessageContent } from "~/registry/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport
} from "~/registry/ui/message-scroller"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

import { createScript, splitParagraphs } from "./message-scroller-utils"

const script = createScript("history", [
  {
    question: "Can you summarize the incident channel?",
    answer:
      "The first alert was a delayed export job. It started backing up around 09:42 UTC and triggered the warning once the retry queue crossed the threshold.\n\nNo customer-facing checkout paths were affected, but exports for larger workspaces were running about 12 minutes behind."
  },
  {
    question: "Was checkout affected?",
    answer:
      "No checkout errors were reported. Payment authorization, order creation, and confirmation emails stayed inside their normal latency bands.\n\nThe only elevated metric was export queue depth, which maps to analytics downloads instead of checkout."
  },
  {
    question: "What changed in the last deploy?",
    answer:
      "Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy, which made each failed attempt hold a worker slot longer than before.\n\nThe app deploy did not include checkout, pricing, or billing API changes."
  },
  {
    question: "Do we need to roll back?",
    answer:
      "Not yet. Queue depth is recovering after we reduced retry concurrency, and the oldest pending job is now under five minutes old.\n\nKeep rollback ready if the queue starts climbing again, but the current trend points toward recovery."
  },
  {
    question: "Keep watching for customer-visible issues.",
    answer:
      "I will watch the queue and support tags for another 15 minutes. I am tracking export failures, delayed download requests, and any support thread that mentions missing reports.\n\nIf those stay quiet through the next batch window, we can close this as an internal degradation."
  }
])

const history = script.messages
const INITIAL_VISIBLE_COUNT = 5

export default function MessageScrollerLoadHistory() {
  // Starts at 1 so the keyed Show below is always truthy and renders.
  const [demoKey, setDemoKey] = createSignal(1)
  const [visibleCount, setVisibleCount] = createSignal(INITIAL_VISIBLE_COUNT)
  const visibleMessages = () => history.slice(-visibleCount())
  const canLoadHistory = () => visibleCount() < history.length

  return (
    <MessageScrollerProvider>
      <div class="relative flex flex-col gap-4">
        <Card class="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader class="gap-1 border-b">
            <CardTitle>Load History</CardTitle>
            <CardDescription>Prepended messages keep your place.</CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger as="span" class="inline-block w-fit">
                  <Button
                    aria-label="Reset loaded messages"
                    disabled={visibleCount() === INITIAL_VISIBLE_COUNT}
                    onClick={() => {
                      setVisibleCount(INITIAL_VISIBLE_COUNT)
                      setDemoKey((key) => key + 1)
                    }}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <RotateCwIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset</p>
                </TooltipContent>
              </Tooltip>
            </CardAction>
          </CardHeader>
          <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
            {/* Keyed so resetting recreates the scroller and re-seeds its
                opening position, matching the upstream remount. */}
            <Show keyed when={demoKey()}>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent class="p-6">
                    <For each={visibleMessages()}>
                      {(message) => {
                        const isUser = message.role === "user"

                        return (
                          <MessageScrollerItem messageId={message.id}>
                            <Message align={isUser ? "end" : "start"}>
                              <MessageContent>
                                <Bubble variant={isUser ? "muted" : "ghost"}>
                                  <BubbleContent class="space-y-2">
                                    <For each={splitParagraphs(message.text)}>
                                      {(paragraph) => (
                                        <p class="whitespace-pre-wrap">{paragraph}</p>
                                      )}
                                    </For>
                                  </BubbleContent>
                                </Bubble>
                              </MessageContent>
                            </Message>
                          </MessageScrollerItem>
                        )
                      }}
                    </For>
                    <MessageScrollerItem scrollAnchor={false}>
                      <Marker variant="separator">
                        <MarkerContent>End of Conversation</MarkerContent>
                      </Marker>
                    </MessageScrollerItem>
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </Show>
          </CardContent>
          <CardFooter class="flex flex-col items-center gap-2 border-t">
            <Button
              class="w-full"
              disabled={!canLoadHistory()}
              onClick={() => setVisibleCount(history.length)}
              type="button"
              variant="secondary"
            >
              {canLoadHistory() ? "Load History" : "History Loaded"}
            </Button>
            <p class="text-muted-foreground text-xs">
              Restore earlier messages while keeping your place.
            </p>
          </CardFooter>
        </Card>
        <div class="mx-auto max-w-sm text-balance px-0.5 text-center text-muted-foreground text-xs">
          Click Load History to load the entire conversation
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
