import type { ComponentProps, ValidComponent } from "solid-js"
import { Show, splitProps } from "solid-js"

import type { DynamicProps, HandleProps, PanelProps, RootProps } from "@corvu/resizable"
import ResizablePrimitive from "@corvu/resizable"

import { cn } from "~/lib/utils"

type ResizableProps<T extends ValidComponent = "div"> = RootProps<T> & { class?: string }

const Resizable = <T extends ValidComponent = "div">(props: DynamicProps<T, ResizableProps<T>>) => {
  const [, rest] = splitProps(props as ResizableProps, ["class"])
  return (
    <ResizablePrimitive
      class={cn("flex h-full w-full data-[orientation=vertical]:flex-col", props.class)}
      data-slot="resizable-panel-group"
      {...rest}
    />
  )
}

const ResizablePanel = <T extends ValidComponent = "div">(
  props: DynamicProps<T, PanelProps<T>>
) => {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

type ResizableHandleProps<T extends ValidComponent = "button"> = HandleProps<T> & {
  class?: string
  withHandle?: boolean
}

const ResizableHandle = <T extends ValidComponent = "button">(
  props: DynamicProps<T, ResizableHandleProps<T>>
) => {
  const [, rest] = splitProps(props as ResizableHandleProps, ["class", "withHandle"])
  return (
    <ResizablePrimitive.Handle
      class={cn(
        "after:-translate-x-1/2 data-[orientation=vertical]:after:-translate-y-1/2 relative flex w-px shrink-0 items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90",
        props.class
      )}
      data-slot="resizable-handle"
      {...rest}
    >
      <Show when={props.withHandle}>
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <svg
            class="size-2.5"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
        </div>
      </Show>
    </ResizablePrimitive.Handle>
  )
}

const StyledResizable = Object.assign(Resizable, {
  Panel: ResizablePanel,
  Handle: ResizableHandle,
  // Forward the context hooks if you want to expose them directly
  useContext: ResizablePrimitive.useContext,
  usePanelContext: ResizablePrimitive.usePanelContext
})

export { StyledResizable as Resizable, ResizablePanel, ResizableHandle }
