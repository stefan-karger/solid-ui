import type { ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

export function MessageGroup(props: Omit<ComponentProps<"div">, "class"> & { class?: string }) {
  return (
    <div
      {...props}
      data-slot="message-group"
      class={cn("cn-message-group flex min-w-0 flex-col", props.class)}
    />
  )
}

export function Message(
  props: Omit<ComponentProps<"div">, "class"> & { class?: string; align?: "start" | "end" }
) {
  const rest = omit(props, "class", "align")
  return (
    <div
      {...rest}
      data-slot="message"
      data-align={props.align ?? "start"}
      class={cn(
        "cn-message group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse",
        props.class
      )}
    />
  )
}

export function MessageAvatar(props: Omit<ComponentProps<"div">, "class"> & { class?: string }) {
  return (
    <div
      {...props}
      data-slot="message-avatar"
      class={cn(
        "cn-message-avatar flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted",
        props.class
      )}
    />
  )
}

export function MessageContent(props: Omit<ComponentProps<"div">, "class"> & { class?: string }) {
  return (
    <div
      {...props}
      data-slot="message-content"
      class={cn("cn-message-content flex w-full min-w-0 flex-col wrap-break-word", props.class)}
    />
  )
}

export function MessageHeader(props: Omit<ComponentProps<"div">, "class"> & { class?: string }) {
  return (
    <div
      {...props}
      data-slot="message-header"
      class={cn("cn-message-header flex max-w-full min-w-0 items-center", props.class)}
    />
  )
}

export function MessageFooter(props: Omit<ComponentProps<"div">, "class"> & { class?: string }) {
  return (
    <div
      {...props}
      data-slot="message-footer"
      class={cn(
        "cn-message-footer flex max-w-full min-w-0 items-center group-data-[align=end]/message:justify-end",
        props.class
      )}
    />
  )
}
