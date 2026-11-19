import type { ComponentProps } from "@solidjs/web"
import {
  Resizable as SdkResizable,
  ResizablePanel as SdkResizablePanel,
  ResizableHandle as SdkResizableHandle
} from "@ui-sdk/solid/resizable"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

export function ResizablePanelGroup(
  props: Omit<ComponentProps<typeof SdkResizable>, "class"> & { class?: string }
) {
  return (
    <SdkResizable
      {...props}
      class={cn(
        "cn-resizable-panel-group flex h-full w-full data-[orientation=vertical]:flex-col",
        props.class
      )}
    />
  )
}

export function ResizablePanel(
  props: Omit<ComponentProps<typeof SdkResizablePanel>, "class"> & { class?: string }
) {
  return <SdkResizablePanel {...props} class={cn("min-h-0 min-w-0", props.class)} />
}

export function ResizableHandle(
  props: Omit<ComponentProps<typeof SdkResizableHandle>, "class"> & {
    class?: string
    withHandle?: boolean
  }
) {
  const rest = omit(props, "class", "withHandle")
  return (
    <SdkResizableHandle
      {...rest}
      class={cn(
        "cn-resizable-handle relative flex w-px shrink-0 items-center justify-center bg-border outline-none focus-visible:ring-1 focus-visible:ring-ring data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
        props.class
      )}
    >
      {props.withHandle && <div class="cn-resizable-handle-icon z-10 flex shrink-0" />}
    </SdkResizableHandle>
  )
}
