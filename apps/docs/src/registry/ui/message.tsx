import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

type MessageGroupProps = ComponentProps<"div">

const MessageGroup = (props: MessageGroupProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-message-group flex min-w-0 flex-col", local.class)}
      data-slot="message-group"
      {...others}
    />
  )
}

type MessageProps = ComponentProps<"div"> & { align?: "start" | "end" }

const Message = (props: MessageProps) => {
  const [local, others] = splitProps(props, ["align", "class"])
  const align = () => local.align ?? "start"
  return (
    <div
      class={cn(
        "cn-message group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse",
        local.class
      )}
      data-align={align()}
      data-slot="message"
      {...others}
    />
  )
}

type MessageAvatarProps = ComponentProps<"div">

const MessageAvatar = (props: MessageAvatarProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-message-avatar flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted",
        local.class
      )}
      data-slot="message-avatar"
      {...others}
    />
  )
}

type MessageContentProps = ComponentProps<"div">

const MessageContent = (props: MessageContentProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-message-content wrap-break-word flex w-full min-w-0 flex-col", local.class)}
      data-slot="message-content"
      {...others}
    />
  )
}

type MessageHeaderProps = ComponentProps<"div">

const MessageHeader = (props: MessageHeaderProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-message-header flex min-w-0 max-w-full items-center", local.class)}
      data-slot="message-header"
      {...others}
    />
  )
}

type MessageFooterProps = ComponentProps<"div">

const MessageFooter = (props: MessageFooterProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-message-footer flex min-w-0 max-w-full items-center group-data-[align=end]/message:justify-end",
        local.class
      )}
      data-slot="message-footer"
      {...others}
    />
  )
}

export { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader }
