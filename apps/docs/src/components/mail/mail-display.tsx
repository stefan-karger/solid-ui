import { createMemo, Show } from "solid-js"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/registry/ui/dropdown-menu"
import { Separator } from "@/registry/ui/separator"
import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from "@/registry/ui/switch"
import { TextField, TextFieldTextArea } from "@/registry/ui/text-field"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

import {
  IconArchive,
  IconClock,
  IconDotsVertical,
  IconForward,
  IconReply,
  IconReplyAll,
  IconTrash
} from "../icons"
import { mails } from "./data"
import { mail } from "./use-mail"

export function MailDisplay() {
  const data = createMemo(() => mails.find((item) => item.id === mail.selected) ?? null)

  return (
    <div class="flex h-full flex-col">
      <div class="flex items-center p-2">
        <div class="flex items-center gap-2">
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger as={Button} variant="ghost" size="icon" disabled={!data()}>
              <IconArchive />
              <span class="sr-only">Archive</span>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger as={Button} variant="ghost" size="icon" disabled={!data()}>
              <IconTrash />
              <span class="sr-only">Move to trash</span>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" class="mx-2 h-6" />
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger as={Button} variant="ghost" size="icon" disabled={!data()}>
              <IconClock />
              <span class="sr-only">Snooze</span>
            </TooltipTrigger>
            <TooltipContent>Snooze</TooltipContent>
          </Tooltip>
        </div>
        <div class="ml-auto flex items-center gap-2">
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger as={Button} variant="ghost" size="icon" disabled={!data()}>
              <IconReply />
              <span class="sr-only">Reply</span>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger as={Button} variant="ghost" size="icon" disabled={!data()}>
              <IconReplyAll />
              <span class="sr-only">Reply all</span>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger as={Button} variant="ghost" size="icon" disabled={!data()}>
              <IconForward />
              <span class="sr-only">Forward</span>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" class="mx-2 h-6" />
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger as={Button} variant="ghost" size="icon" disabled={!data()}>
            <IconDotsVertical />
            <span class="sr-only">More</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      <Show
        when={data()}
        fallback={<div class="p-8 text-center text-muted-foreground">No message selected</div>}
      >
        <div class="flex flex-1 flex-col">
          <div class="flex items-start p-4">
            <div class="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={data()!.name} />
                <AvatarFallback>
                  {data()!
                    .name.split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <div class="font-semibold">{data()!.name}</div>
                <div class="line-clamp-1 text-xs">{data()!.subject}</div>
                <div class="line-clamp-1 text-xs">
                  <span class="font-medium">Reply-To:</span> {data()!.email}
                </div>
              </div>
            </div>
            {data()!.date && (
              <div class="ml-auto text-xs text-muted-foreground">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short"
                }).format(new Date(data()!.date))}
              </div>
            )}
          </div>
          <Separator />
          <div class="flex-1 whitespace-pre-wrap p-4 text-sm">{data()!.text}</div>
          <Separator class="mt-auto" />
          <div class="p-4">
            <div class="grid gap-4">
              <TextField>
                <TextFieldTextArea class="p-4" placeholder={`Reply ${data()!.name}...`} />
              </TextField>
              <div class="flex items-center">
                <Switch class="flex items-center gap-2 text-xs font-normal">
                  <SwitchControl>
                    <SwitchThumb />
                  </SwitchControl>
                  <SwitchLabel>Mute this thread</SwitchLabel>
                </Switch>
                <Button size="sm" class="ml-auto">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  )
}
