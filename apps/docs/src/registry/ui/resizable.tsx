import type { ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import type { DynamicProps, HandleProps, PanelProps, RootProps } from "@corvu/resizable"
import ResizablePrimitive from "@corvu/resizable"

import { cn } from "~/lib/utils"

type ResizableGroupProps<T extends ValidComponent = "div"> = RootProps<T> & {
  class?: string
}

const ResizableGroup = <T extends ValidComponent = "div">(
  props: DynamicProps<T, ResizableGroupProps<T>>
) => {
  const [local, others] = splitProps(props as ResizableGroupProps, ["class", "orientation"])
  return (
    <ResizablePrimitive
      class={cn("flex size-full data-[orientation=vertical]:flex-col", local.class)}
      data-slot="resizable-group"
      orientation={local.orientation ?? "horizontal"}
      {...others}
    />
  )
}

type ResizablePanelProps<T extends ValidComponent = "div"> = PanelProps<T> & {
  class?: string
}

const ResizablePanel = <T extends ValidComponent = "div">(
  props: DynamicProps<T, ResizablePanelProps<T>>
) => {
  const [local, others] = splitProps(props as ResizablePanelProps, ["class"])
  return (
    <ResizablePrimitive.Panel
      class={cn("overflow-hidden", local.class)}
      data-slot="resizable-panel"
      {...others}
    />
  )
}

type ResizableHandleProps<T extends ValidComponent = "button"> = HandleProps<T> & {
  class?: string
  withHandle?: boolean
}

const ResizableHandle = <T extends ValidComponent = "button">(
  props: DynamicProps<T, ResizableHandleProps<T>>
) => {
  const [local, others] = splitProps(props as ResizableHandleProps, ["class", "withHandle"])
  return (
    <ResizablePrimitive.Handle
      class={cn(
        "after:-translate-x-1/2 data-[orientation=vertical]:after:-translate-y-1/2 relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90",
        local.class
      )}
      data-slot="resizable-handle"
      {...others}
    >
      {local.withHandle && (
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <svg
            class="size-2.5"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.5 4.625C6.12132 4.625 6.625 4.12132 6.625 3.5C6.625 2.87868 6.12132 2.375 5.5 2.375C4.87868 2.375 4.375 2.87868 4.375 3.5C4.375 4.12132 4.87868 4.625 5.5 4.625ZM9.5 4.625C10.1213 4.625 10.625 4.12132 10.625 3.5C10.625 2.87868 10.1213 2.375 9.5 2.375C8.87868 2.375 8.375 2.87868 8.375 3.5C8.375 4.12132 8.87868 4.625 9.5 4.625ZM5.5 8.625C6.12132 8.625 6.625 8.12132 6.625 7.5C6.625 6.87868 6.12132 6.375 5.5 6.375C4.87868 6.375 4.375 6.87868 4.375 7.5C4.375 8.12132 4.87868 8.625 5.5 8.625ZM9.5 8.625C10.1213 8.625 10.625 8.12132 10.625 7.5C10.625 6.87868 10.1213 6.375 9.5 6.375C8.87868 6.375 8.375 6.87868 8.375 7.5C8.375 8.12132 8.87868 8.625 9.5 8.625ZM5.5 12.625C6.12132 12.625 6.625 12.1213 6.625 11.5C6.625 10.8787 6.12132 10.375 5.5 10.375C4.87868 10.375 4.375 10.8787 4.375 11.5C4.375 12.1213 4.87868 12.625 5.5 12.625ZM9.5 12.625C10.1213 12.625 10.625 12.1213 10.625 11.5C10.625 10.8787 10.1213 10.375 9.5 10.375C8.87868 10.375 8.375 10.8787 8.375 11.5C8.375 12.1213 8.87868 12.625 9.5 12.625Z" />
          </svg>
        </div>
      )}
    </ResizablePrimitive.Handle>
  )
}

export { ResizableGroup, ResizablePanel, ResizableHandle }
