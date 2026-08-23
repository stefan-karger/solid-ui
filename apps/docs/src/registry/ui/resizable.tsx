import type { ComponentProps, ValidComponent } from "solid-js"
import { Show, splitProps } from "solid-js"

import {
  Handle,
  type HandleProps,
  Panel,
  type PanelProps,
  Root,
  type RootProps
} from "@corvu/resizable"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

type ResizablePanelGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  RootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ResizablePanelGroup = <T extends ValidComponent = "div">(
  props: ResizablePanelGroupProps<T>
) => {
  const [local, others] = splitProps(props as ResizablePanelGroupProps, ["class"])
  return (
    <Root
      class={cn(
        "cn-resizable-panel-group flex h-full w-full data-[orientation=vertical]:flex-col",
        local.class
      )}
      data-slot="resizable-panel-group"
      {...others}
    />
  )
}

type ResizablePanelProps<T extends ValidComponent = "div"> = PolymorphicProps<T, PanelProps<T>>

const ResizablePanel = <T extends ValidComponent = "div">(props: ResizablePanelProps<T>) => {
  return <Panel data-slot="resizable-panel" {...props} />
}

type ResizableHandleProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  HandleProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    withHandle?: boolean
  }

const ResizableHandle = <T extends ValidComponent = "button">(props: ResizableHandleProps<T>) => {
  const [local, others] = splitProps(props as ResizableHandleProps, ["class", "withHandle"])
  return (
    <Handle
      class={cn(
        "cn-resizable-handle relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 data-[orientation=vertical]:after:-translate-y-1/2 [&[data-orientation=vertical]>div]:rotate-90",
        local.class
      )}
      data-slot="resizable-handle"
      {...others}
    >
      <Show when={local.withHandle}>
        <div class="cn-resizable-handle-icon z-10 flex shrink-0" />
      </Show>
    </Handle>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
