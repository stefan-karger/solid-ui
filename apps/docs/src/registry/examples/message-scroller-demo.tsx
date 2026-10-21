import { For, Show } from "solid-js"

import {
  ArrowUpIcon,
  GlobeIcon,
  ImageIcon,
  MessageCircleDashedIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
  TelescopeIcon
} from "lucide-solid"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/registry/ui/empty"
import { InputGroup, InputGroupAddon, InputGroupButton } from "~/registry/ui/input-group"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport
} from "~/registry/ui/message-scroller"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

import { createScriptedChat, MessageAnimated, scrollBehaviorScript } from "./message-scroller-utils"

export default function MessageScrollerDemo() {
  const chat = createScriptedChat({ delayMs: 20, script: scrollBehaviorScript })

  return (
    <MessageScrollerProvider>
      <div class="relative flex flex-col gap-4">
        <Card class="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader class="gap-1 border-b">
            <CardTitle>New Chat</CardTitle>
            <CardDescription>How can I help you today?</CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger as="span" class="inline-block w-fit">
                  <Button
                    aria-label="Reset conversation"
                    disabled={chat.messages.length === 0 || chat.isBusy()}
                    onClick={chat.reset}
                    size="icon"
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
            <Show
              fallback={
                <Empty class="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MessageCircleDashedIcon />
                    </EmptyMedia>
                    <EmptyTitle>Morning, zaidan!</EmptyTitle>
                    <EmptyDescription>
                      What are we working on today? Press send to start a new conversation
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              }
              when={chat.messages.length > 0}
            >
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent aria-busy={chat.isBusy()} class="p-6">
                    <For each={chat.messages}>
                      {(message) => <MessageAnimated message={message} />}
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
                event.preventDefault()
                chat.send()
              }}
            >
              <InputGroup>
                <div class="h-14 w-full px-3 py-2.5">
                  <span
                    class="line-clamp-2 opacity-60 data-[status=ready]:opacity-100"
                    data-status={chat.status()}
                  >
                    <Show
                      fallback={
                        <span class="text-muted-foreground">
                          No messages queued. Reset the conversation.
                        </span>
                      }
                      keyed
                      when={chat.nextMessage()}
                    >
                      {(message) => message.text}
                    </Show>
                  </span>
                </div>
                <InputGroupAddon align="block-end" class="pt-1">
                  <DropdownMenu placement="top-start">
                    <DropdownMenuTrigger
                      aria-label="Add files"
                      as={InputGroupButton}
                      size="icon-sm"
                      type="button"
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
                    class="ml-auto"
                    disabled={!chat.nextMessage() || chat.isBusy()}
                    size="icon-sm"
                    type="submit"
                    variant="default"
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
          Demo is read only. Press send to send messages.
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
