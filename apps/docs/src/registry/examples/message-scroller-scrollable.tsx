import { For } from "solid-js";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "~/registry/ui/message-scroller";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import { type DemoMessage, MessageAnimated } from "./message-scroller-utils";

const messages: DemoMessage[] = Array.from({ length: 12 }, (_, index) => ({
  id: `scrollable-${index + 1}`,
  role: index % 2 === 0 ? "user" : "assistant",
  text:
    index % 2 === 0
      ? `Review scroll checkpoint ${index + 1}.`
      : `Checkpoint ${index + 1} is synced. The scrollable hook updates as the viewport moves.\n\nWhen the reader is at the first message, the footer should only point them down. Once they move into the middle of the transcript, it should explain that both directions are available.\n\nAt the latest message, the footer should switch again and only point them back up.`,
}));

export default function MessageScrollerScrollable() {
  return (
    <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Card class="h-140 w-full gap-0 overflow-hidden">
        <CardHeader class="gap-1 border-b">
          <CardTitle>Scroll Status</CardTitle>
          <CardDescription>
            Where the reader can go scroll to based on current scroll position.
          </CardDescription>
        </CardHeader>
        <MessageScrollerProvider defaultScrollPosition="start">
          <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent class="gap-4 p-(--card-spacing)">
                  <For each={messages}>
                    {(message) => (
                      <MessageAnimated
                        message={message}
                        scrollAnchor={message.role === "user"}
                        userVariant="muted"
                        assistantVariant="ghost"
                      />
                    )}
                  </For>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
          <ScrollStateFooter />
        </MessageScrollerProvider>
      </Card>
      <div class="px-0.5 text-center text-muted-foreground text-xs">
        Scroll the transcript to see the footer update.
      </div>
    </div>
  );
}

function ScrollStateFooter() {
  // The hook returns getters; reading them inside the thunk keeps the footer
  // reactive. Destructuring here would freeze the status at its first value.
  const scrollable = useMessageScrollerScrollable();
  const status = () => getScrollStatus(scrollable.start, scrollable.end);

  return (
    <CardFooter class="justify-center border-t text-center text-muted-foreground text-sm">
      {status()}
    </CardFooter>
  );
}

function getScrollStatus(start: boolean, end: boolean) {
  if (start && end) {
    return "You can scroll both ways.";
  }

  if (end) {
    return "You are at the top. You can only scroll down.";
  }

  if (start) {
    return "You are at the bottom. You can only scroll up.";
  }

  return "All messages fit in the viewport.";
}
