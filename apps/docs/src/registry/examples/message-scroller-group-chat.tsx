import { RotateCwIcon } from "lucide-solid";
import { createSignal, For, Show } from "solid-js";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport } from "~/registry/ui/message-scroller";
import { Bubble, BubbleContent } from "~/registry/ui/bubble";
import { Button } from "~/registry/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import { Marker, MarkerContent } from "~/registry/ui/marker";
import { Message, MessageContent, MessageHeader } from "~/registry/ui/message";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip";
import type { BubbleVariant } from "./message-scroller-utils";

type GroupChatItem =
  | {
      id: string;
      type: "event";
      text: string;
      scrollAnchor?: boolean;
    }
  | {
      id: string;
      type: "message";
      sender: string;
      role: "assistant" | "participant";
      text: string;
      scrollAnchor?: boolean;
    };

const currentUser = "Grace";

const initialItems = [
  {
    id: "group-1",
    type: "message",
    sender: "Grace",
    role: "participant",
    text: "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?",
  },
  {
    id: "group-2",
    type: "message",
    sender: "Mary (Agent)",
    role: "assistant",
    text: "Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need.",
  },
  {
    id: "group-3",
    type: "message",
    sender: "Grace",
    role: "participant",
    text: "ping @rocky",
    scrollAnchor: true,
  },
] satisfies GroupChatItem[];

const rockyMarker = {
  id: "group-4",
  type: "event",
  text: "Rocky has joined the chat",
  scrollAnchor: true,
} satisfies GroupChatItem;

const rockyMessage = {
  id: "group-5",
  type: "message",
  sender: "Rocky",
  role: "participant",
  text: "Amaze. Astrophage eats light, makes heat, goes to carbon dioxide. Rocky has fuel model. Grace is smart.",
} satisfies GroupChatItem;

type RockyTurn = "idle" | "marker" | "message";

export default function MessageScrollerGroupChat() {
  // Solid has no `key` prop; bumping this value re-creates the keyed `Show`
  // subtree below, which is how the upstream demo resets scroller state.
  const [demoKey, setDemoKey] = createSignal(1);
  const [rockyTurn, setRockyTurn] = createSignal<RockyTurn>("idle");
  const items = (): GroupChatItem[] => {
    if (rockyTurn() === "message") return [...initialItems, rockyMarker, rockyMessage];
    if (rockyTurn() === "marker") return [...initialItems, rockyMarker];
    return initialItems;
  };
  const buttonLabel = () => (rockyTurn() === "idle" ? "Add Rocky" : "Send Message as Rocky");
  const isComplete = () => rockyTurn() === "message";

  return (
    <MessageScrollerProvider>
      <div class="relative flex flex-col gap-4">
        <Card class="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader class="gap-1 border-b">
            <CardTitle>Group Chat</CardTitle>
            <CardDescription>
              A group chat with several participants and an assistant. The Marker is marked as a
              turn.
            </CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger as="span" class="inline-block w-fit">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Reset conversation"
                    disabled={rockyTurn() === "idle"}
                    onClick={() => {
                      setRockyTurn("idle");
                      setDemoKey((key) => key + 1);
                    }}
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
            <Show when={demoKey()} keyed>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent class="p-(--card-spacing)">
                    <For each={items()}>
                      {(item) =>
                        item.type === "message" ? (
                          <GroupChatMessage item={item} />
                        ) : (
                          <GroupChatMarker item={item} scrollAnchor={item.scrollAnchor} />
                        )
                      }
                    </For>
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </Show>
          </CardContent>
          <CardFooter class="flex flex-col items-center gap-2 border-t">
            <Button
              type="button"
              disabled={isComplete()}
              onClick={() => setRockyTurn((turn) => (turn === "idle" ? "marker" : "message"))}
              class="w-full"
              variant="secondary"
            >
              {buttonLabel()}
            </Button>
            <p class="text-muted-foreground text-xs">
              {rockyTurn() === "idle"
                ? "This will create a marker and make it the anchor"
                : "Now send Rocky's reply into the conversation"}
            </p>
          </CardFooter>
        </Card>
        <div class="mx-auto max-w-sm px-0.5 text-balance text-center text-muted-foreground text-xs">
          When a user joins, a marker is created. scrollAnchor on the marker marks it as the next
          turn
        </div>
      </div>
    </MessageScrollerProvider>
  );
}

function GroupChatMessage(props: { item: Extract<GroupChatItem, { type: "message" }> }) {
  const isCurrentUser = () => props.item.sender === currentUser;
  const variant = (): BubbleVariant => {
    if (isCurrentUser()) return "muted";
    return props.item.role === "assistant" ? "ghost" : "tinted";
  };

  return (
    <MessageScrollerItem messageId={props.item.id} scrollAnchor={props.item.scrollAnchor}>
      <Message align={isCurrentUser() ? "end" : "start"}>
        <MessageContent>
          <Show when={!isCurrentUser()}>
            <MessageHeader>{props.item.sender}</MessageHeader>
          </Show>
          <Bubble variant={variant()}>
            <BubbleContent>{props.item.text}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
}

function GroupChatMarker(props: {
  item: Extract<GroupChatItem, { type: "event" }>;
  scrollAnchor?: boolean;
}) {
  return (
    <MessageScrollerItem scrollAnchor={props.scrollAnchor ?? false}>
      <Marker variant="separator">
        <MarkerContent>{props.item.text}</MarkerContent>
      </Marker>
    </MessageScrollerItem>
  );
}
