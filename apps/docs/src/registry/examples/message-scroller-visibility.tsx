import { For } from "solid-js";
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerVisibility,
} from "~/registry/ui/message-scroller";
import { Bubble, BubbleContent } from "~/registry/ui/bubble";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/registry/ui/hover-card";
import { Message, MessageContent } from "~/registry/ui/message";
import { createScript, type DemoMessage, splitParagraphs } from "./message-scroller-utils";

const script = createScript("vis", [
  {
    questionId: "vis-brief",
    question: "Review the incident handoff and tell me what to read first.",
    answer:
      "Start with the summary and the impact section. The regression affected the upload queue, but the recovery path completed for every queued job.",
  },
  {
    questionId: "vis-impact",
    question: "What was the customer impact?",
    answer:
      "Impact was limited to delayed processing.\n\nNo records were dropped, and the reconciliation worker confirmed each retry batch. Support saw confusion from two customers, but there were no checkout or billing errors.",
  },
  {
    questionId: "vis-actions",
    question: "What actions are open?",
    answer:
      "Keep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike.",
  },
  {
    questionId: "vis-checklist",
    question: "Give me the follow-up checklist.",
    answer:
      "After that, compare the queue recovery graph with the deploy timeline so the handoff shows exactly when processing returned to baseline. That makes it easier for support and engineering to answer the same customer questions without re-reading the whole incident thread.\n\nI would also add a short owner note beside each follow-up item. The checklist is small, but ownership keeps the retry-window decision, alert tuning, and support macro from drifting into separate follow-up conversations.\n\nKeep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike.",
  },
]);

export default function MessageScrollerVisibility() {
  return (
    <MessageScrollerProvider scrollMargin={12}>
      <div class="relative flex flex-col gap-4">
        <div class="relative mx-auto w-full max-w-sm">
          <Card class="h-140 w-full gap-0">
            <CardHeader class="gap-1 border-b">
              <CardTitle>Transcript Outline</CardTitle>
              <CardDescription>Track the current anchored turn.</CardDescription>
            </CardHeader>
            <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent class="p-(--card-spacing)">
                    <For each={script.messages}>
                      {(message) => {
                        const isUser = message.role === "user";

                        return (
                          <MessageScrollerItem messageId={message.id} scrollAnchor={isUser}>
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
                        );
                      }}
                    </For>
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </CardContent>
          </Card>
          <div class="-right-12 -translate-y-1/2 absolute top-1/2">
            <TranscriptOutline />
          </div>
        </div>
        <div class="mx-auto max-w-sm px-0.5 text-center text-muted-foreground text-xs">
          Open the outline to jump between anchored turns as you read.
        </div>
      </div>
    </MessageScrollerProvider>
  );
}

function TranscriptOutline() {
  const { scrollToMessage } = useMessageScroller();
  // `currentAnchorId` is a getter; read it through the object at each use site
  // so the outline stays reactive. Destructuring would freeze it.
  const visibility = useMessageScrollerVisibility();

  return (
    <HoverCard placement="left">
      <HoverCardTrigger
        as="button"
        type="button"
        aria-label="Open transcript outline"
        class="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <For each={script.userMessages}>
          {(message) => (
            <span
              data-current={message.id === visibility.currentAnchorId}
              class="h-0.5 w-4 rounded-full bg-muted-foreground/40 data-[current=true]:bg-foreground"
            />
          )}
        </For>
      </HoverCardTrigger>
      <HoverCardContent class="flex w-64 flex-col gap-1 rounded-2xl p-1">
        <For each={script.userMessages}>
          {(message) => (
            <button
              type="button"
              aria-current={visibility.currentAnchorId === message.id ? "location" : undefined}
              class="flex min-h-7 items-center rounded-xl px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground aria-current:bg-accent aria-current:text-accent-foreground"
              onClick={() => scrollToMessage(message.id, { align: "start", behavior: "smooth" })}
            >
              <span class="line-clamp-1 min-w-0">{getTrimmedMessageText(message)}</span>
            </button>
          )}
        </For>
      </HoverCardContent>
    </HoverCard>
  );
}

function getTrimmedMessageText(message: DemoMessage) {
  return message.text.length > 42 ? `${message.text.slice(0, 39)}...` : message.text;
}
