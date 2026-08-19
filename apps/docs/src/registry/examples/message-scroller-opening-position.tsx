import { createEffect, createSignal, For, onCleanup, Show } from "solid-js";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, useMessageScroller } from "~/registry/ui/message-scroller";
import { Bubble, BubbleContent } from "~/registry/ui/bubble";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import { Message, MessageContent } from "~/registry/ui/message";
import { Tabs, TabsList, TabsTrigger } from "~/registry/ui/tabs";
import { type DemoMessage, splitParagraphs } from "./message-scroller-utils";

type Position = "end" | "last-anchor" | "start";

const messages: DemoMessage[] = [
  {
    id: "open-1",
    role: "user",
    text: "This is the first message the user sent in the conversation.",
  },
  {
    id: "open-2",
    role: "assistant",
    text: "Workspace creation rose 8%, but first invite completion only rose 2%.",
  },
  {
    id: "open-3",
    role: "user",
    text: "This is the last message the user sent in the conversation.",
  },
  {
    id: "open-4",
    role: "assistant",
    text: "Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen.\n4. Segment activation by template, since template users may not need invites right away.\n\nIf that pattern holds, the next experiment should make collaboration useful earlier instead of prompting for invites harder.",
  },
];

const positions: { label: string; value: Position }[] = [
  { label: "start", value: "start" },
  { label: "end", value: "end" },
  { label: "last-anchor", value: "last-anchor" },
];

export default function MessageScrollerOpeningPosition() {
  const [position, setPosition] = createSignal<Position>("last-anchor");

  return (
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="gap-1 border-b">
          <CardTitle>Opening Position</CardTitle>
          <CardDescription>Choose where a saved transcript opens.</CardDescription>
        </CardHeader>
        <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
          <MessageScrollerProvider>
            {/* Keyed so switching tabs recreates the scroller and genuinely
                re-opens the thread at the new position. */}
            <Show when={position()} keyed>
              {(current) => <OpeningPositionScroller position={current} />}
            </Show>
          </MessageScrollerProvider>
        </CardContent>
        <CardFooter class="flex items-center justify-center border-t">
          <Tabs
            value={position()}
            onChange={(value) => setPosition(value as Position)}
            class="w-full"
          >
            <TabsList class="w-full">
              <For each={positions}>
                {(option) => <TabsTrigger class="data-[selected]:border-input data-[selected]:bg-accent data-[selected]:shadow-none" value={option.value}>{option.label}</TabsTrigger>}
              </For>
            </TabsList>
          </Tabs>
        </CardFooter>
      </Card>
      <div class="mx-auto max-w-sm px-0.5 text-center text-muted-foreground text-xs">
        Toggle the defaultScrollPosition to see where the transcript starts when you open the thread
      </div>
    </div>
  );
}

function OpeningPositionScroller(props: { position: Position }) {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller();

  createEffect(() => {
    const position = props.position;
    const frame = window.requestAnimationFrame(() => {
      if (position === "start") {
        scrollToStart({ behavior: "auto" });
        return;
      }

      if (position === "end") {
        scrollToEnd({ behavior: "auto" });
        return;
      }

      scrollToMessage("open-3", { align: "start", behavior: "auto", scrollMargin: 64 });
    });

    onCleanup(() => window.cancelAnimationFrame(frame));
  });

  return (
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent class="p-6">
          <For each={messages}>
            {(message) => {
              const isUser = message.role === "user";

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
              );
            }}
          </For>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  );
}
