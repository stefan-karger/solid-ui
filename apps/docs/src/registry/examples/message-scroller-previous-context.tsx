import { createSignal, For, Show } from "solid-js"

import {
  ArrowUpIcon,
  GlobeIcon,
  ImageIcon,
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
import { InputGroup, InputGroupAddon, InputGroupButton } from "~/registry/ui/input-group"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport
} from "~/registry/ui/message-scroller"
import { Slider } from "~/registry/ui/slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

import { createScriptedChat, MessageAnimated, scrollBehaviorScript } from "./message-scroller-utils"

const DEFAULT_PEEK = 64

export default function MessageScrollerPreviousContext() {
  const [peek, setPeek] = createSignal(DEFAULT_PEEK)
  // One turn is already on screen so the peek band has something to preserve.
  const chat = createScriptedChat({
    delayMs: 35,
    initialCount: 2,
    script: scrollBehaviorScript
  })

  return (
    <MessageScrollerProvider scrollMargin={24} scrollPreviousItemPeek={peek()}>
      <div class="relative flex flex-col gap-4">
        <Card class="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader class="gap-1 border-b">
            <CardTitle>Keeping Context Visible</CardTitle>
            <CardDescription>New turns keep part of the previous reply in view.</CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger as="span" class="inline-block w-fit">
                  <Button
                    aria-label="Reset context example"
                    disabled={chat.isBusy()}
                    onClick={() => {
                      chat.reset()
                      setPeek(DEFAULT_PEEK)
                    }}
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
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent aria-busy={chat.isBusy()} class="p-6">
                  <For each={chat.messages}>
                    {(message) => (
                      <MessageAnimated message={message} scrollAnchor={message.role === "user"} />
                    )}
                  </For>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
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
                          No messages queued. Reset the context.
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
                  <div class="flex w-28 items-center gap-2">
                    <span class="text-muted-foreground text-xs tabular-nums">{peek()}px</span>
                    <Slider
                      aria-label="Previous context peek"
                      disabled={chat.isBusy()}
                      maxValue={128}
                      minValue={64}
                      onChange={(value) => setPeek(value[0] ?? DEFAULT_PEEK)}
                      step={1}
                      value={[peek()]}
                    />
                  </div>
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
          Adjust the slider and send. Observe the previous message peak
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
