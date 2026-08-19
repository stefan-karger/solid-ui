import { ArrowUpIcon, MessageCircleDashedIcon, RotateCwIcon } from "lucide-solid";
import { createSignal, For, Show } from "solid-js";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerProvider, MessageScrollerViewport } from "~/registry/ui/message-scroller";
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
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/registry/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/registry/ui/select";
import {
  createScript,
  createScriptedChat,
  MESSAGE_ANIMATIONS,
  MessageAnimated,
  type MessageAnimationId,
  type MessageAnimationPreset,
} from "./message-scroller-utils";

const animationScript = createScript("animation", [
  {
    question: "Can user messages pop in like iMessage without breaking anchoring?",
    answer:
      "Yes. Animate the user row with transform and opacity, and let the assistant response stream normally below it.\n\nThat keeps the row measurement predictable while still giving the newly sent bubble a more tactile entrance.",
  },
  {
    question: "What makes the animation feel more like iMessage?",
    answer:
      "Use a quick spring from the trailing edge: a little scale, a small upward move, and no layout animation.\n\nThe bubble feels tactile, but the measured row stays predictable, so anchoring and auto-scroll do not have to fight a changing layout.",
  },
  {
    question: "Can I switch between presets while testing the same thread?",
    answer:
      "Yes. Keep the conversation in place while you change the preset, then send the next message to compare the new entrance against the same context.\n\nThat makes it easier to judge the difference between a subtle fade, a snappy pop, and a more dramatic 3D tilt without rebuilding the scenario each time.",
  },
]);

const animationPresets = Object.values(MESSAGE_ANIMATIONS);

export default function MessageScrollerAnimation() {
  const chat = createScriptedChat({ delayMs: 15, initialCount: 0, script: animationScript });
  const [presetId, setPresetId] = createSignal<MessageAnimationId>("fade");
  const preset = () => MESSAGE_ANIMATIONS[presetId()];

  return (
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="border-b">
          <CardTitle>Animation</CardTitle>
          <CardDescription>
            Choose how user messages are animated when they are added to the conversation.
          </CardDescription>
          <CardAction class="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Reset animated messages"
              disabled={chat.messages.length === 0 || chat.isBusy()}
              onClick={chat.reset}
            >
              <RotateCwIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
          <Show
            when={chat.messages.length > 0}
            fallback={
              <Empty class="h-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MessageCircleDashedIcon />
                  </EmptyMedia>
                  <EmptyTitle>No Messages Yet</EmptyTitle>
                  <EmptyDescription>
                    Click the button below to send the first message.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            }
          >
            <MessageScrollerProvider>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent aria-busy={chat.isBusy()} class="p-6">
                    <For each={chat.messages}>
                      {(message) => (
                        <MessageAnimated
                          message={message}
                          animationPreset={preset()}
                          userVariant="muted"
                          assistantVariant="ghost"
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
        <CardFooter class="border-t">
          <Select<MessageAnimationPreset>
            options={animationPresets}
            optionValue="id"
            optionTextValue="name"
            placement="top-start"
            value={preset()}
            onChange={(value) => setPresetId(value?.id ?? "fade")}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue.name}</SelectItem>
            )}
          >
            <SelectTrigger aria-label="Animation preset">
              <SelectValue<MessageAnimationPreset>>
                {(state) => state.selectedOption().name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
          <Button
            size="icon"
            class="ml-auto"
            disabled={!chat.nextMessage() || chat.isBusy()}
            onClick={chat.send}
          >
            <ArrowUpIcon />
            <span class="sr-only">Send Message</span>
          </Button>
        </CardFooter>
      </Card>
      <div class="mx-auto max-w-sm text-balance px-0.5 text-center text-muted-foreground text-xs">
        Select an animation then click send to see it in action.
      </div>
    </div>
  );
}
