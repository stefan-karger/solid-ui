// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps } from "@solidjs/web"
import {
  ScrollArea as SdkScrollArea,
  ScrollAreaViewport as SdkScrollAreaViewport,
  ScrollAreaContent as SdkScrollAreaContent,
  ScrollAreaScrollToEnd as SdkScrollAreaScrollToEnd
} from "@ui-sdk/solid/scroll-area"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"

export { createScrollAreaController as createMessageScrollerController } from "@ui-sdk/solid/scroll-area"
export function MessageScroller(
  props: Omit<ComponentProps<typeof SdkScrollArea>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkScrollArea
      stickToEnd
      {...props}
      class={cn(
        "cn-message-scroller relative min-h-0 min-w-0 overflow-hidden",
        props.class
      )}
    />
  )
}
export function MessageScrollerViewport(
  props: Omit<ComponentProps<typeof SdkScrollAreaViewport>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkScrollAreaViewport
      {...props}
      class={cn(
        "cn-message-scroller-viewport size-full overflow-auto outline-none focus-visible:ring-2 focus-visible:ring-ring",
        props.class
      )}
    />
  )
}
export function MessageScrollerContent(
  props: Omit<ComponentProps<typeof SdkScrollAreaContent>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkScrollAreaContent
      {...props}
      class={cn(
        "cn-message-scroller-content flex min-w-0 flex-col",
        props.class
      )}
    />
  )
}
export function MessageScrollerItem(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="message-scroller-item"
      class={cn("cn-message-scroller-item min-w-0", props.class)}
    />
  )
}
export function MessageScrollerButton(
  props: Omit<ComponentProps<typeof SdkScrollAreaScrollToEnd>, "class"> & {
    class?: string
  }
) {
  const rest = omit(props, "class", "children")
  return (
    <SdkScrollAreaScrollToEnd
      aria-label="Scroll to end"
      render={(p) => <Button {...p} variant="outline" size="icon-sm" />}
      {...rest}
      class={cn(
        "cn-message-scroller-button absolute start-1/2 bottom-4 -translate-x-1/2 not-data-visible:pointer-events-none not-data-visible:opacity-0 rtl:translate-x-1/2",
        props.class
      )}
    >
      {props.children ?? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      )}
    </SdkScrollAreaScrollToEnd>
  )
}
