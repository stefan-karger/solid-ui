import {
  ArrowUpIcon,
  GlobeIcon,
  ImageIcon,
  MessageCircleDashedIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
  TelescopeIcon,
} from "lucide-solid";
import { For, Show } from "solid-js";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/registry/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/registry/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupButton } from "~/registry/ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip";
import {
  createScriptedChat,
  MessageAnimated,
  scrollBehaviorScript,
} from "./message-scroller-utils";

export default function MessageScrollerStreaming() {
  const chat = createScriptedChat({
    delayMs: 20,
    initialCount: 0,
    script: scrollBehaviorScript,
  });

  return (
    <MessageScrollerProvider autoScroll>
      <div class="relative flex flex-col gap-4">
        <Card class="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader class="gap-1 border-b">
            <CardTitle>Streaming Messages</CardTitle>
            <CardDescription>
              Auto-scroll follows the live edge of the conversation.
            </CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger as="span" class="inline-block w-fit">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Reset stream"
                    disabled={chat.messages.length === 0 || chat.isBusy()}
                    onClick={chat.reset}
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
            <Show
              when={chat.messages.length > 0}
              fallback={
                <Empty class="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MessageCircleDashedIcon />
                    </EmptyMedia>
                    <EmptyTitle>Ready to Stream</EmptyTitle>
                    <EmptyDescription>
                      Press send to stream a scripted launch summary.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              }
            >
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent aria-busy={chat.isBusy()} class="p-(--card-spacing)">
                    <For each={chat.messages}>
                      {(message) => (
                        <MessageAnimated message={message} scrollAnchor={message.role === "user"} />
                      )}
                    </For>
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </Show>
          </CardContent>
          <CardFooter class="flex-col gap-2">
            <form
              class="w-full"
              onSubmit={(event) => {
                event.preventDefault();
                chat.send();
              }}
            >
              <InputGroup>
                <div class="h-14 w-full px-3 py-2.5">
                  <span
                    class="line-clamp-2 opacity-60 data-[status=ready]:opacity-100"
                    data-status={chat.status()}
                  >
                    <Show
                      when={chat.nextMessage()}
                      keyed
                      fallback={
                        <span class="text-muted-foreground">
                          No messages queued. Reset the stream.
                        </span>
                      }
                    >
                      {(message) => message.text}
                    </Show>
                  </span>
                </div>
                <InputGroupAddon align="block-end" class="pt-1">
                  <DropdownMenu placement="top-start">
                    <DropdownMenuTrigger
                      as={InputGroupButton}
                      aria-label="Add files"
                      type="button"
                      size="icon-sm"
                      variant="outline"
                    >
                      <PlusIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-44">
                      <DropdownMenuItem>
                        <PaperclipIcon />
                        Add Photos & Files
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <ImageIcon />
                        Create Image
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <TelescopeIcon />
                        Deep Research
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <GlobeIcon />
                        Web Search
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <InputGroupButton
                    type="submit"
                    variant="default"
                    size="icon-sm"
                    disabled={!chat.nextMessage() || chat.isBusy()}
                    class="ml-auto"
                  >
                    <ArrowUpIcon />
                    <span class="sr-only">Send</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </CardFooter>
        </Card>
        <div class="px-0.5 text-center text-muted-foreground text-xs">
          Streaming is simulated. `autoScroll` is enabled.
        </div>
      </div>
    </MessageScrollerProvider>
  );
}
