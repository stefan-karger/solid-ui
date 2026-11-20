import type { ComponentProps } from "@solidjs/web"
import {
  ScrollArea as SdkScrollArea,
  ScrollAreaViewport as SdkScrollAreaViewport,
  ScrollAreaContent as SdkScrollAreaContent,
  ScrollAreaScrollbar as SdkScrollAreaScrollbar,
  ScrollAreaThumb as SdkScrollAreaThumb
} from "@ui-sdk/solid/scroll-area"
import { ScrollAreaCorner as SdkScrollAreaCorner } from "@ui-sdk/solid/scroll-area"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

export function ScrollAreaRoot(
  props: Omit<ComponentProps<typeof SdkScrollArea>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkScrollArea
      {...props}
      class={cn("cn-scroll-area relative", props.class)}
    />
  )
}

export function ScrollAreaViewport(
  props: Omit<ComponentProps<typeof SdkScrollAreaViewport>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkScrollAreaViewport
      {...props}
      class={cn(
        "cn-scroll-area-viewport size-full rounded-[inherit] outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        props.class
      )}
    />
  )
}

export function ScrollAreaContent(
  props: Omit<ComponentProps<typeof SdkScrollAreaContent>, "class"> & {
    class?: string
  }
) {
  return <SdkScrollAreaContent {...props} class={cn("min-w-0", props.class)} />
}

export function ScrollBar(
  props: Omit<ComponentProps<typeof SdkScrollAreaScrollbar>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkScrollAreaScrollbar
      {...props}
      class={cn(
        "cn-scroll-area-scrollbar absolute flex touch-none p-px select-none data-[orientation=horizontal]:inset-x-0 data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:inset-y-0 data-[orientation=vertical]:end-0 data-[orientation=vertical]:w-2.5",
        props.class
      )}
    >
      <ScrollAreaThumb />
    </SdkScrollAreaScrollbar>
  )
}

export function ScrollAreaThumb(
  props: Omit<ComponentProps<typeof SdkScrollAreaThumb>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkScrollAreaThumb
      {...props}
      class={cn(
        "cn-scroll-area-thumb relative flex-1 rounded-full bg-border",
        props.class
      )}
    />
  )
}

export function ScrollArea(props: ComponentProps<typeof ScrollAreaRoot>) {
  const rest = omit(props, "children")
  return (
    <ScrollAreaRoot {...rest}>
      <ScrollAreaViewport>
        <ScrollAreaContent>{props.children}</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollBar />
      <SdkScrollAreaCorner />
    </ScrollAreaRoot>
  )
}
