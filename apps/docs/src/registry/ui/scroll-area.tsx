import type { Accessor, Component, ComponentProps, JSX } from "solid-js"
import {
  createContext,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  useContext
} from "solid-js"

import { cn } from "~/lib/utils"

type ScrollAreaContextProps = {
  viewportRef: Accessor<HTMLDivElement | undefined>
  contentRef: Accessor<HTMLDivElement | undefined>
}

const ScrollAreaContext = createContext<ScrollAreaContextProps | null>(null)

function useScrollArea() {
  const context = useContext(ScrollAreaContext)
  if (!context) {
    throw new Error("useScrollArea must be used within a <ScrollArea />")
  }
  return context
}

type ScrollAreaProps = ComponentProps<"div"> & {
  class?: string | undefined
  children?: JSX.Element
}

const ScrollArea: Component<ScrollAreaProps> = (rawProps) => {
  const props = mergeProps({}, rawProps)
  const [local, others] = splitProps(props, ["class", "children"])

  let viewportRef: HTMLDivElement | undefined

  return (
    <ScrollAreaContext.Provider
      value={{
        viewportRef: () => viewportRef,
        contentRef: () => viewportRef
      }}
    >
      <div class={cn("relative overflow-hidden", local.class)} data-slot="scroll-area" {...others}>
        <div
          class="size-full overflow-scroll rounded-[inherit] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-slot="scroll-area-viewport"
          ref={viewportRef!}
          style={{
            "overflow-x": "hidden",
            "overflow-y": "scroll"
          }}
        >
          {local.children}
        </div>
      </div>
    </ScrollAreaContext.Provider>
  )
}

type ScrollBarProps = ComponentProps<"div"> & {
  class?: string | undefined
  orientation?: "vertical" | "horizontal"
}

const ScrollBar: Component<ScrollBarProps> = (rawProps) => {
  const props = mergeProps({ orientation: "vertical" as const }, rawProps)
  const [local, others] = splitProps(props, ["class", "orientation"])

  const context = useScrollArea()
  const [thumbSize, setThumbSize] = createSignal(0)
  const [thumbPosition, setThumbPosition] = createSignal(0)
  const [isDragging, setIsDragging] = createSignal(false)
  const [dragStartY, setDragStartY] = createSignal(0)
  const [visible, setVisible] = createSignal(false)

  let scrollbarRef: HTMLDivElement | undefined
  let thumbRef: HTMLDivElement | undefined

  const isVertical = () => local.orientation === "vertical"

  const updateScrollbar = () => {
    const viewport = context.viewportRef()
    if (!viewport) return

    if (isVertical()) {
      const ratio = viewport.clientHeight / viewport.scrollHeight
      const size = Math.max(ratio * 100, 10) // Minimum 10% thumb size
      setThumbSize(size)
      setVisible(ratio < 1)

      const maxScrollTop = viewport.scrollHeight - viewport.clientHeight
      const scrollRatio = maxScrollTop > 0 ? viewport.scrollTop / maxScrollTop : 0
      const maxThumbPosition = 100 - size
      setThumbPosition(Math.min(scrollRatio * maxThumbPosition, maxThumbPosition))
    } else {
      const ratio = viewport.clientWidth / viewport.scrollWidth
      const size = Math.max(ratio * 100, 10)
      setThumbSize(size)
      setVisible(ratio < 1)

      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth
      const scrollRatio = maxScrollLeft > 0 ? viewport.scrollLeft / maxScrollLeft : 0
      const maxThumbPosition = 100 - size
      setThumbPosition(Math.min(scrollRatio * maxThumbPosition, maxThumbPosition))
    }
  }

  const handleScroll = () => {
    if (!isDragging()) {
      updateScrollbar()
    }
  }

  const handleThumbMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const viewport = context.viewportRef()
    if (!viewport || !scrollbarRef || !thumbRef) return

    setIsDragging(true)

    if (isVertical()) {
      const thumbRect = thumbRef.getBoundingClientRect()
      // Store offset from top of thumb to mouse position
      const offsetInThumb = e.clientY - thumbRect.top
      setDragStartY(offsetInThumb)
    } else {
      const thumbRect = thumbRef.getBoundingClientRect()
      const offsetInThumb = e.clientX - thumbRect.left
      setDragStartY(offsetInThumb)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging()) return
    e.preventDefault()

    const viewport = context.viewportRef()
    if (!viewport || !scrollbarRef) return

    if (isVertical()) {
      const scrollbarRect = scrollbarRef.getBoundingClientRect()
      const scrollbarHeight = scrollbarRect.height
      const maxScrollTop = viewport.scrollHeight - viewport.clientHeight

      if (maxScrollTop <= 0) return

      // Calculate where mouse is relative to scrollbar track (minus the offset in thumb)
      const mousePositionInTrack = e.clientY - scrollbarRect.top - dragStartY()

      // Convert to percentage (0-100)
      const ratio = viewport.clientHeight / viewport.scrollHeight
      const thumbSize = Math.max(ratio * 100, 10)
      const maxThumbPosition = 100 - thumbSize
      const trackAvailableHeight = scrollbarHeight * (maxThumbPosition / 100)

      // Calculate thumb position as percentage
      const thumbPositionPercent = Math.max(
        0,
        Math.min((mousePositionInTrack / scrollbarHeight) * 100, maxThumbPosition)
      )

      // Map thumb position to scroll position
      const scrollRatio = trackAvailableHeight > 0 ? thumbPositionPercent / maxThumbPosition : 0
      const newScrollTop = scrollRatio * maxScrollTop

      viewport.scrollTop = newScrollTop
      setThumbPosition(thumbPositionPercent)
    } else {
      const scrollbarRect = scrollbarRef.getBoundingClientRect()
      const scrollbarWidth = scrollbarRect.width
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth

      if (maxScrollLeft <= 0) return

      const mousePositionInTrack = e.clientX - scrollbarRect.left - dragStartY()

      const ratio = viewport.clientWidth / viewport.scrollWidth
      const thumbSize = Math.max(ratio * 100, 10)
      const maxThumbPosition = 100 - thumbSize
      const trackAvailableWidth = scrollbarWidth * (maxThumbPosition / 100)

      const thumbPositionPercent = Math.max(
        0,
        Math.min((mousePositionInTrack / scrollbarWidth) * 100, maxThumbPosition)
      )

      const scrollRatio = trackAvailableWidth > 0 ? thumbPositionPercent / maxThumbPosition : 0
      const newScrollLeft = scrollRatio * maxScrollLeft

      viewport.scrollLeft = newScrollLeft
      setThumbPosition(thumbPositionPercent)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTrackClick = (e: MouseEvent) => {
    if (!scrollbarRef || !thumbRef) return
    const viewport = context.viewportRef()
    if (!viewport) return

    const rect = scrollbarRef.getBoundingClientRect()
    const thumbRect = thumbRef.getBoundingClientRect()

    if (isVertical()) {
      const clickY = e.clientY - rect.top
      const thumbY = thumbRect.top - rect.top
      const thumbHeight = thumbRect.height

      if (clickY < thumbY) {
        // Click above thumb - page up
        viewport.scrollTop -= viewport.clientHeight
      } else if (clickY > thumbY + thumbHeight) {
        // Click below thumb - page down
        viewport.scrollTop += viewport.clientHeight
      }
    } else {
      const clickX = e.clientX - rect.left
      const thumbX = thumbRect.left - rect.left
      const thumbWidth = thumbRect.width

      if (clickX < thumbX) {
        viewport.scrollLeft -= viewport.clientWidth
      } else if (clickX > thumbX + thumbWidth) {
        viewport.scrollLeft += viewport.clientWidth
      }
    }
  }

  onMount(() => {
    const viewport = context.viewportRef()
    if (!viewport) return

    // Initial calculation
    updateScrollbar()

    // Listen to scroll events
    viewport.addEventListener("scroll", handleScroll)

    // ResizeObserver for dynamic content
    const resizeObserver = new ResizeObserver(() => {
      updateScrollbar()
    })

    const content = context.contentRef()
    if (content) {
      resizeObserver.observe(content)
    }
    resizeObserver.observe(viewport)

    // Mouse events for dragging
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    onCleanup(() => {
      viewport.removeEventListener("scroll", handleScroll)
      resizeObserver.disconnect()
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    })
  })

  return (
    <div
      class={cn(
        "cn-scroll-area-scrollbar absolute touch-none select-none p-px transition-colors",
        isVertical() && "top-0 right-0 h-full w-2.5",
        !isVertical() && "bottom-0 left-0 h-2.5 w-full",
        !visible() && "pointer-events-none opacity-0",
        local.class
      )}
      data-horizontal={!isVertical() ? "" : undefined}
      data-slot="scroll-area-scrollbar"
      data-vertical={isVertical() ? "" : undefined}
      onClick={handleTrackClick}
      ref={scrollbarRef}
      {...others}
    >
      <div
        class="cn-scroll-area-thumb absolute cursor-grab rounded-full bg-border active:cursor-grabbing"
        data-slot="scroll-area-thumb"
        onMouseDown={handleThumbMouseDown}
        ref={thumbRef}
        style={{
          ...(isVertical()
            ? {
                top: `${thumbPosition()}%`,
                height: `${thumbSize()}%`,
                left: "0",
                right: "0"
              }
            : {
                left: `${thumbPosition()}%`,
                width: `${thumbSize()}%`,
                top: "0",
                bottom: "0"
              })
        }}
      />
    </div>
  )
}

export { ScrollArea, ScrollBar }
