import {
  type Accessor,
  type ComponentProps,
  createEffect,
  createSignal,
  type JSX,
  onCleanup
} from "solid-js"

import type { ButtonProps } from "~/registry/ui/button"

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

// Default scrollEdgeThreshold. Sub-pixel tolerance so edge detection does not
// flicker across engines that round scrollTop differently.
const DEFAULT_SCROLL_EDGE_THRESHOLD = 8

// Default scrollPreviousItemPeek. Pixels of the previous item kept visible above
// a newly anchored row.
const DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK = 64

// Default scrollMargin for scrollToMessage and programmatic targets.
const DEFAULT_SCROLL_MARGIN = 0

// Two fractional scrollTop values within this range are treated as equal, to
// absorb zoom and HiDPI rounding drift.
const SCROLL_POSITION_EPSILON = 0.5

// How long (ms) data-autoscrolling stays set during a programmatic smooth scroll
// before clearing.
const AUTOSCROLLING_CLEAR_DELAY = 180

// Viewport keys that count as deliberate scroll intent and release follow-bottom.
const USER_SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " " // Space key.
])

// Internal scroll mode. Derived from intent and commands; decides how the
// viewport reacts to content and resize.
type MessageScrollerMode =
  | "following-bottom" // autoScroll on, pinned to the latest message.
  | "free-scrolling" // reader scrolled away; position left alone (prepends still preserved).
  | "anchored-to-message" // holding a turn at the reading line while it streams.
  | "settling-jump" // a programmatic jump is animating; intent detection suppressed until it settles.

// Where a saved transcript opens on the first non-empty render.
type MessageScrollerDefaultScrollPosition = "start" | "end" | "last-anchor"

// Which transcript edge MessageScrollerButton scrolls toward.
type MessageScrollerButtonDirection = "start" | "end"

// Viewport alignment for scrollToMessage and programmatic jumps.
type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest"

// Options for scrollToMessage, scrollToEnd, and scrollToStart.
type MessageScrollerScrollOptions = {
  // Viewport edge or center to align the target to.
  align?: MessageScrollerScrollAlign
  // Native scroll behavior.
  behavior?: ScrollBehavior
  // Margin on the aligned edge, in pixels. Defaults to the provider scrollMargin.
  scrollMargin?: number
}

// Scroll snapshot from useMessageScrollerScrollable: which edges the viewport can
// still scroll toward.
type MessageScrollerScrollable = {
  // The viewport can scroll toward the start (content is hidden above).
  start: boolean
  // The viewport can scroll toward the end (content is hidden below).
  end: boolean
}

// Visibility snapshot from useMessageScrollerVisibility.
type MessageScrollerVisibilityState = {
  // The anchored turn the reader is in, or null. Stays set after the anchor
  // scrolls above the viewport.
  currentAnchorId: string | null
  // messageId values intersecting the viewport, in document order.
  visibleMessageIds: string[]
}

// Headless provider for a chat transcript scroller. Owns scroll behavior and
// state; renders no DOM.
type MessageScrollerProviderProps = {
  children?: JSX.Element
  // Follow new content at the bottom while the viewport is already at the end.
  autoScroll?: boolean
  // Opening position on the first non-empty render, applied once.
  defaultScrollPosition?: MessageScrollerDefaultScrollPosition
  // Distance from an edge that still counts as at-top/at-bottom. Defaults to 8.
  scrollEdgeThreshold?: number
  // Extra top margin for a newly anchored row, added to scrollMargin. Defaults to 64.
  scrollPreviousItemPeek?: number
  // Default margin on the aligned edge for commands and visibility. Defaults to 0.
  scrollMargin?: number
}

// Frame container for a chat transcript scroller. Must render inside a
// MessageScrollerProvider.
type MessageScrollerProps = ComponentProps<"div">

// Scrollable viewport. Owns native scroll events and prepend preservation.
type MessageScrollerViewportProps = ComponentProps<"div"> & {
  // Keep the first visible messageId row stable on prepend. Defaults to true.
  preserveScrollOnPrepend?: boolean
}

// Transcript row container. Every direct child should be a MessageScrollerItem.
type MessageScrollerContentProps = ComponentProps<"div"> & {
  // Class name for the internal tail spacer used when anchoring turns near the top.
  spacerClassName?: string
}

// One transcript row: a message, marker, typing row, separator, or load-more row.
type MessageScrollerItemProps = ComponentProps<"div"> & {
  // Stable row id for scrollToMessage, visibility, and prepend preservation.
  messageId?: string
  // Marks a turn boundary that newly appended anchors and last-anchor restore use.
  scrollAnchor?: boolean
}

// State passed to MessageScrollerButton's render prop.
type MessageScrollerButtonRenderState = {
  // Whether overflow exists toward this button's direction.
  active: boolean
  direction: MessageScrollerButtonDirection
}

// Scroll control for the start or end of the transcript.
type MessageScrollerButtonProps = ButtonProps & {
  // Native scroll behavior when clicked. Defaults to "smooth".
  behavior?: ScrollBehavior
  // Transcript edge to scroll toward. Defaults to "end".
  direction?: MessageScrollerButtonDirection
  /**
   * Solid render-function equivalent of the upstream element-or-function render
   * prop. Solid JSX elements are real DOM nodes and cannot be cloned to merge
   * behavior props; pass a function here or use Button's `as` prop instead.
   */
  render?: (props: ButtonProps, state: MessageScrollerButtonRenderState) => JSX.Element
}

// Minimal signal-backed store shape shared by scroll state and visibility.
// Replaces upstream's useSyncExternalStore stores: the snapshot accessor is a
// Solid signal, and setSnapshot preserves the current reference while the
// comparator holds so subscribers only react to real transitions.
type MessageScrollerStore<T> = {
  snapshot: Accessor<T>
  setSnapshot: (nextSnapshot: T) => void
}

// Store backing useMessageScrollerVisibility. Adds reference-counting so
// tracking stays lazy: observation starts on the first subscriber and stops on
// the last unsubscribe.
type MessageScrollerVisibilityStore = MessageScrollerStore<MessageScrollerVisibilityState> & {
  hasSubscribers: () => boolean
  subscribe: (onFirstSubscribe: () => void, onLastUnsubscribe: () => void) => () => void
}

// Registers (or, with removedElement, unregisters) a MessageScrollerItem node by
// messageId.
type MessageScrollerRegisterMessage = (
  messageId: string,
  element: HTMLElement | null,
  removedElement?: HTMLElement | null
) => void

// A scrollToMessage request whose target row is not mounted yet.
type PendingScrollToMessage = {
  messageId: string
  options?: MessageScrollerScrollOptions
}

// Shared mutable state for one MessageScroller, closed over by both the
// controller and the commands so writes are visible across them without prop
// threading. Replaces upstream's per-field React ref bag: Solid components run
// once, so one plain object created per Provider is enough.
type MessageScrollerControllerState = {
  autoScroll: boolean
  autoscrolling: boolean
  autoscrollingTimeout: number | null
  content: HTMLDivElement | null
  defaultScrollPosition: MessageScrollerDefaultScrollPosition
  defaultScrollPositionApplied: boolean
  firstItem: HTMLElement | null
  handledScrollAnchors: WeakSet<HTMLElement>
  itemCount: number
  // The scrollTop seen by the previous state commit, so follow-release can tell
  // a reader scrolling up from content growing past the live edge.
  lastScrollTop: number
  messageElements: Map<string, HTMLElement>
  mode: MessageScrollerMode
  pendingScrollFrame: number | null
  pendingScrollToMessage: PendingScrollToMessage | null
  // The row to hold steady on the next prepend: the first visible row, or a jump
  // target seeded by scrollToElement. restorePrependedAnchor reads only this.
  prependRestore: { element: HTMLElement; viewportTop: number } | null
  preserveScrollOnPrepend: boolean
  root: HTMLDivElement | null
  scrollEdgeThreshold: number
  scrollMargin: number
  scrollPreviousItemPeek: number
  // Elements already seen by handleContentChange. Solid's For recreates DOM
  // nodes when backing objects are replaced, so the childList can churn without
  // the list truly changing; this set tells genuinely new rows apart.
  seenItems: WeakSet<HTMLElement>
  spacer: HTMLDivElement | null
  spacerGap: number
  spacerHeight: number
  stateFrame: number | null
  // The turn held at the reading line so a reply streaming in below it can re-pin
  // it instead of letting scrollTop clamp it loose.
  streamingTurn: HTMLElement | null
  viewport: HTMLDivElement | null
  visibilityFrame: number | null
  visibilityObserver: IntersectionObserver | null
  visibleMessageIds: Set<string>
}

// Internal context wiring the parts together. Not part of the public API.
type MessageScrollerContextValue = {
  handleContentChange: () => void
  handleResize: () => void
  registerMessage: MessageScrollerRegisterMessage
  scrollable: Accessor<MessageScrollerScrollable>
  scrollToEnd: (options?: MessageScrollerScrollOptions) => boolean
  scrollToMessage: (messageId: string, options?: MessageScrollerScrollOptions) => boolean
  scrollToStart: (options?: MessageScrollerScrollOptions) => boolean
  setContentElement: (element: HTMLDivElement | null) => void
  setPreserveScrollOnPrepend: (preserve: boolean) => void
  setRootElement: (element: HTMLDivElement | null) => void
  setSpacerElement: (element: HTMLDivElement | null) => void
  setViewportElement: (element: HTMLDivElement | null) => void
  subscribeVisibility: () => () => void
  syncAfterScroll: () => void
  userScrollIntent: () => void
  visibility: Accessor<MessageScrollerVisibilityState>
}

// Initial MessageScrollerScrollable before measurement. Stable reference for the
// server and first-render snapshot.
const EMPTY_MESSAGE_SCROLLER_SCROLLABLE: MessageScrollerScrollable = {
  start: false,
  end: false
}

// Shared empty array so empty visibility snapshots stay referentially stable.
const EMPTY_VISIBLE_MESSAGE_IDS: string[] = []

// Initial MessageScrollerVisibilityState. Nothing tracked, no current anchor.
const EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE: MessageScrollerVisibilityState = {
  currentAnchorId: null,
  visibleMessageIds: EMPTY_VISIBLE_MESSAGE_IDS
}

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------

// Solid-side helpers replacing upstream's React utilities: useLatest is
// unnecessary because Solid props are live, and composeRefs collapses to
// forwarding function refs.

// Dispatches a Solid JSX.EventHandlerUnion (plain function or bound-data tuple).
function callEventHandler<T extends Element, E extends Event>(
  handler: JSX.EventHandlerUnion<T, E> | undefined,
  event: E & { currentTarget: T; target: Element }
) {
  if (typeof handler === "function") {
    handler(event)
  } else {
    handler?.[0](handler[1], event)
  }
}

// Forwards an element to a user-supplied function ref, if any.
function setElementRef(ref: unknown, element: HTMLElement) {
  if (typeof ref === "function") {
    ;(ref as (element: HTMLElement) => void)(element)
  }
}

// -------------------------------------------------------------------------------------
// Geometry
// -------------------------------------------------------------------------------------

function getMessageScrollerScrollable({
  content,
  scrollEdgeThreshold,
  spacer,
  viewport
}: {
  content: HTMLElement | null
  scrollEdgeThreshold: number
  spacer: HTMLElement | null
  viewport: HTMLElement | null
}): MessageScrollerScrollable {
  if (!viewport || !content) {
    return EMPTY_MESSAGE_SCROLLER_SCROLLABLE
  }

  const contentBottom = getContentBottom({ content, spacer, viewport })

  return {
    start: viewport.scrollTop > scrollEdgeThreshold,
    end: contentBottom - viewport.scrollTop - viewport.clientHeight > scrollEdgeThreshold
  }
}

function getMessageScrollerVisibilityState({
  content,
  scrollMargin,
  scrollPreviousItemPeek,
  spacer,
  viewport,
  visibleMessageIds
}: {
  content: HTMLElement | null
  scrollMargin: number
  scrollPreviousItemPeek: number
  spacer: HTMLElement | null
  viewport: HTMLElement | null
  visibleMessageIds: Set<string>
}): MessageScrollerVisibilityState {
  if (!content || !viewport) {
    return EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE
  }

  const viewportRect = viewport.getBoundingClientRect()
  // The reading line sits scrollPreviousItemPeek below scrollMargin: anchored
  // turns land there with the previous turn peeking above. A row only peeking in
  // that band has not been read down to yet, so it counts as neither visible nor
  // current.
  const lineTop = viewportRect.top + scrollMargin + scrollPreviousItemPeek
  const trackByLayout = typeof IntersectionObserver === "undefined"

  const visible: string[] = []
  let currentAnchorId: string | null = null

  // Walk rows in document order so visible ids come out top-to-bottom.
  for (const item of getMessageScrollerItems(content, spacer)) {
    const messageId = item.dataset.messageId

    if (!messageId) {
      continue
    }

    const isAnchor = item.dataset.scrollAnchor === "true"
    // Anchors need a rect to place the current line; non-anchors lean on the
    // observer set (or a rect in the no-observer fallback).
    const rect = isAnchor || trackByLayout ? item.getBoundingClientRect() : null

    const isVisible =
      trackByLayout && rect
        ? rect.bottom > lineTop && rect.top < viewportRect.bottom
        : visibleMessageIds.has(messageId)

    if (isVisible) {
      visible.push(messageId)
    }

    // Current is the last anchor to have reached the reading line: the turn you
    // scrolled to (placed at the line) wins over newer turns lower down, the
    // previous turn peeking above the line has been passed, and it stays current
    // even after its header scrolls above the viewport.
    if (isAnchor && rect && rect.top <= lineTop + SCROLL_POSITION_EPSILON) {
      currentAnchorId = messageId
    }
  }

  if (visible.length === 0 && currentAnchorId === null) {
    return EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE
  }

  return {
    currentAnchorId,
    visibleMessageIds: visible
  }
}

function getMessageScrollerItems(content: HTMLElement, spacer: HTMLElement | null) {
  return Array.from(content.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && child !== spacer
  )
}

function getNewScrollAnchor(items: HTMLElement[], previousItemCount: number) {
  for (let index = previousItemCount; index < items.length; index += 1) {
    const item = items[index]

    if (item?.dataset.scrollAnchor === "true") {
      return item
    }
  }

  return null
}

/**
 * Finds a scroll anchor among elements that just entered the list.
 *
 * Deliberate divergence from upstream's index-based scan: Solid's `For`
 * recreates an item's DOM node whenever its backing object is replaced, so
 * unlike React the childList can churn without the list truly changing.
 * Restricting the scan to newly seen elements keeps long-lived anchors from
 * re-capturing the scroll position on unrelated mutations.
 */
function getUnanchoredScrollAnchor(
  newItems: HTMLElement[],
  handledAnchors: { has(element: HTMLElement): boolean }
) {
  for (const item of newItems) {
    if (item.dataset.scrollAnchor === "true" && !handledAnchors.has(item)) {
      return item
    }
  }

  return null
}

function hasMultipleNewScrollAnchors(items: HTMLElement[], previousItemCount: number) {
  let count = 0

  for (let index = previousItemCount; index < items.length; index += 1) {
    const item = items[index]

    if (item?.dataset.scrollAnchor !== "true") {
      continue
    }

    count += 1

    if (count > 1) {
      return true
    }
  }

  return false
}

function getLastScrollAnchor(items: HTMLElement[]) {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index]

    if (item?.dataset.scrollAnchor === "true") {
      return item
    }
  }

  return null
}

function getFirstVisibleMessageItem({
  content,
  spacer,
  viewport
}: {
  content: HTMLElement
  spacer: HTMLElement | null
  viewport: HTMLElement
}) {
  const viewportRect = viewport.getBoundingClientRect()

  for (const item of getMessageScrollerItems(content, spacer)) {
    if (!item.dataset.messageId) {
      continue
    }

    const rect = item.getBoundingClientRect()

    if (rect.bottom > viewportRect.top && rect.top < viewportRect.bottom) {
      return item
    }
  }

  return null
}

function getElementScrollTop({
  align,
  element,
  scrollMargin,
  spacer,
  viewport
}: {
  align: MessageScrollerScrollAlign
  element: HTMLElement
  scrollMargin: number
  spacer: HTMLElement | null
  viewport: HTMLElement
}) {
  const elementTop = getElementTop(element, viewport)
  const elementHeight = element.getBoundingClientRect().height
  const contentPadding = getContentBlockPadding(spacer)

  if (align === "center") {
    const insetHeight = Math.max(
      0,
      viewport.clientHeight - contentPadding.start - contentPadding.end
    )

    return elementTop - contentPadding.start - (insetHeight - elementHeight) / 2 - scrollMargin
  }

  if (align === "end") {
    return elementTop - viewport.clientHeight + elementHeight + contentPadding.end + scrollMargin
  }

  if (align === "nearest") {
    const elementBottom = elementTop + elementHeight
    const viewportTop = viewport.scrollTop + contentPadding.start
    const viewportBottom = viewport.scrollTop + viewport.clientHeight - contentPadding.end

    if (elementTop >= viewportTop && elementBottom <= viewportBottom) {
      return viewport.scrollTop
    }

    if (elementTop < viewportTop) {
      return elementTop - contentPadding.start - scrollMargin
    }

    return elementBottom - viewport.clientHeight + contentPadding.end + scrollMargin
  }

  return elementTop - contentPadding.start - scrollMargin
}

function getElementTop(element: HTMLElement, viewport: HTMLElement) {
  const elementRect = element.getBoundingClientRect()
  const viewportRect = viewport.getBoundingClientRect()

  return elementRect.top - viewportRect.top + viewport.scrollTop
}

function getElementViewportTop(element: HTMLElement, viewport: HTMLElement) {
  return element.getBoundingClientRect().top - viewport.getBoundingClientRect().top
}

function getTailSpacerHeight({
  content,
  scrollTop,
  spacer,
  viewport
}: {
  content: HTMLElement
  scrollTop: number
  spacer: HTMLElement | null
  viewport: HTMLElement
}) {
  const contentBottom = getContentBottom({ content, spacer, viewport })

  return scrollTop + viewport.clientHeight - contentBottom
}

function getContentBottom({
  content,
  spacer,
  viewport
}: {
  content: HTMLElement
  spacer: HTMLElement | null
  viewport: HTMLElement
}) {
  const items = getMessageScrollerItems(content, spacer)
  const padding = getBlockPadding(content)
  const viewportRect = viewport.getBoundingClientRect()
  const scrollTop = viewport.scrollTop
  let contentBottom = padding.start + padding.end

  for (const item of items) {
    const rect = item.getBoundingClientRect()

    contentBottom = Math.max(
      contentBottom,
      rect.bottom - viewportRect.top + scrollTop + padding.end
    )
  }

  return contentBottom
}

function getMaxScrollTop(viewport: HTMLElement) {
  return Math.max(0, viewport.scrollHeight - viewport.clientHeight)
}

function getBlockPadding(element: HTMLElement) {
  const style = window.getComputedStyle(element)

  return {
    end: readCssPixel(style.paddingBlockEnd || style.paddingBottom),
    start: readCssPixel(style.paddingBlockStart || style.paddingTop)
  }
}

function getContentBlockPadding(spacer: HTMLElement | null) {
  const content = spacer?.parentElement

  if (!content) {
    return {
      end: 0,
      start: 0
    }
  }

  return getBlockPadding(content)
}

function getFlexGap(element: HTMLElement | null) {
  if (!element) {
    return 0
  }

  const style = window.getComputedStyle(element)
  const gap = style.rowGap === "normal" ? style.gap : style.rowGap

  return readCssPixel(gap)
}

function readCssPixel(value: string | undefined) {
  if (!value) {
    return 0
  }

  const number = Number.parseFloat(value)

  return Number.isFinite(number) ? number : 0
}

// -------------------------------------------------------------------------------------
// Stores
// -------------------------------------------------------------------------------------

// Signal-backed replacement for upstream's useSyncExternalStore stores: the
// snapshot stays referentially equal while isEqual holds, so subscribers only
// react to real transitions. Solid's reactivity replaces the listener set.
function createMessageScrollerStore<T extends object>(
  initialSnapshot: T,
  isEqual: (a: T, b: T) => boolean
): MessageScrollerStore<T> {
  const [snapshot, setSnapshot] = createSignal(initialSnapshot)

  return {
    snapshot,
    setSnapshot: (nextSnapshot: T) => {
      setSnapshot((current) => (isEqual(current, nextSnapshot) ? current : nextSnapshot))
    }
  }
}

// Visibility store with reference-counting so tracking stays lazy: the first
// subscriber starts observation, the last unsubscribe stops it. Replaces the
// subscribe-time lifecycle callbacks of upstream's external store.
function createMessageScrollerVisibilityStore(): MessageScrollerVisibilityStore {
  const store = createMessageScrollerStore(
    EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE,
    areVisibilityStatesEqual
  )
  let subscribers = 0

  return {
    ...store,
    hasSubscribers: () => subscribers > 0,
    subscribe: (onFirstSubscribe: () => void, onLastUnsubscribe: () => void) => {
      subscribers += 1

      if (subscribers === 1) {
        onFirstSubscribe()
      }

      let unsubscribed = false

      return () => {
        if (unsubscribed) {
          return
        }

        unsubscribed = true
        subscribers -= 1

        if (subscribers === 0) {
          onLastUnsubscribe()
        }
      }
    }
  }
}

function areScrollStatesEqual(current: MessageScrollerScrollable, next: MessageScrollerScrollable) {
  return current.start === next.start && current.end === next.end
}

function areVisibilityStatesEqual(
  current: MessageScrollerVisibilityState,
  next: MessageScrollerVisibilityState
) {
  if (current.currentAnchorId !== next.currentAnchorId) {
    return false
  }

  if (current.visibleMessageIds.length !== next.visibleMessageIds.length) {
    return false
  }

  return current.visibleMessageIds.every(
    (messageId, index) => messageId === next.visibleMessageIds[index]
  )
}

// -------------------------------------------------------------------------------------
// Refs
// -------------------------------------------------------------------------------------

// Builds the per-instance mutable state object shared by the controller and the
// commands. Replaces upstream's useMessageScrollerRefs: Solid components run
// once, so plain fields stand in for the React ref bag, and no useLatest
// mirroring is needed — the controller re-reads live props via createEffect.
function createMessageScrollerState({
  autoScroll,
  defaultScrollPosition,
  scrollEdgeThreshold,
  scrollMargin,
  scrollPreviousItemPeek
}: {
  autoScroll: boolean
  defaultScrollPosition: MessageScrollerDefaultScrollPosition
  scrollEdgeThreshold: number
  scrollMargin: number
  scrollPreviousItemPeek: number
}): MessageScrollerControllerState {
  return {
    autoScroll,
    autoscrolling: false,
    autoscrollingTimeout: null,
    content: null,
    defaultScrollPosition,
    defaultScrollPositionApplied: false,
    firstItem: null,
    handledScrollAnchors: new WeakSet(),
    itemCount: 0,
    lastScrollTop: 0,
    messageElements: new Map(),
    mode: autoScroll ? "following-bottom" : "free-scrolling",
    pendingScrollFrame: null,
    pendingScrollToMessage: null,
    prependRestore: null,
    preserveScrollOnPrepend: true,
    root: null,
    scrollEdgeThreshold,
    scrollMargin,
    scrollPreviousItemPeek,
    seenItems: new WeakSet(),
    spacer: null,
    spacerGap: 0,
    spacerHeight: 0,
    stateFrame: null,
    streamingTurn: null,
    viewport: null,
    visibilityFrame: null,
    visibilityObserver: null,
    visibleMessageIds: new Set()
  }
}

// -------------------------------------------------------------------------------------
// Commands
// -------------------------------------------------------------------------------------

// Imperative scroll primitives, split from the controller so the move mechanics
// live apart from the policy that decides when to run them. Each command resolves
// a target scrollTop and returns false when the viewport is not mounted yet.
// Plain closures over the shared state object replace upstream's memoized callbacks.
function createMessageScrollerCommands({
  state,
  commitScrollState,
  scheduleStateCommit,
  scheduleVisibilitySync
}: {
  state: MessageScrollerControllerState
  commitScrollState: () => void
  scheduleStateCommit: () => void
  scheduleVisibilitySync: () => void
}) {
  function setAutoScrolling(autoscrolling: boolean) {
    if (state.autoscrollingTimeout !== null) {
      window.clearTimeout(state.autoscrollingTimeout)
      state.autoscrollingTimeout = null
    }

    if (state.autoscrolling !== autoscrolling) {
      state.autoscrolling = autoscrolling
      commitScrollState()
    }

    if (autoscrolling) {
      state.autoscrollingTimeout = window.setTimeout(() => {
        state.autoscrollingTimeout = null
        state.autoscrolling = false
        commitScrollState()
      }, AUTOSCROLLING_CLEAR_DELAY)
    }
  }

  function setTailSpacerHeight(height: number) {
    const spacer = state.spacer

    if (!spacer) {
      return
    }

    const nextHeight = Math.max(0, Math.ceil(height))

    if (state.spacerHeight === nextHeight) {
      return
    }

    state.spacerHeight = nextHeight
    spacer.hidden = nextHeight === 0
    spacer.style.height = `${nextHeight}px`
    spacer.style.marginTop = nextHeight > 0 ? `${-state.spacerGap}px` : ""
  }

  function scrollToPosition(
    scrollTop: number,
    {
      behavior = "auto",
      autoscrolling = false
    }: {
      behavior?: ScrollBehavior
      autoscrolling?: boolean
    } = {}
  ) {
    const viewport = state.viewport

    if (!viewport) {
      return
    }

    const nextScrollTop = Math.max(0, scrollTop)

    if (Math.abs(viewport.scrollTop - nextScrollTop) <= SCROLL_POSITION_EPSILON) {
      viewport.scrollTop = nextScrollTop
      commitScrollState()
      return
    }

    if (autoscrolling) {
      setAutoScrolling(true)
    }

    viewport.scrollTo({
      top: nextScrollTop,
      behavior
    })
    scheduleStateCommit()
  }

  function scrollToStart({ behavior = "auto" }: MessageScrollerScrollOptions = {}) {
    if (!state.viewport) {
      return false
    }

    setTailSpacerHeight(0)
    state.streamingTurn = null
    state.mode = "free-scrolling"
    scrollToPosition(0, { behavior })
    scheduleVisibilitySync()

    return true
  }

  function scrollToEnd({ behavior = "auto" }: MessageScrollerScrollOptions = {}) {
    const viewport = state.viewport

    if (!viewport) {
      return false
    }

    setTailSpacerHeight(0)
    state.streamingTurn = null
    state.mode = state.autoScroll ? "following-bottom" : "free-scrolling"
    scrollToPosition(getMaxScrollTop(viewport), {
      autoscrolling: true,
      behavior
    })
    scheduleVisibilitySync()

    return true
  }

  function scrollToElement(
    element: HTMLElement,
    {
      align = "start",
      behavior = "auto",
      scrollMargin = state.scrollMargin
    }: MessageScrollerScrollOptions = {},
    {
      keepPreviousPeek = false
    }: {
      keepPreviousPeek?: boolean
    } = {}
  ) {
    const content = state.content
    const viewport = state.viewport

    if (!content || !viewport || !content.contains(element)) {
      return false
    }

    const scrollTop = getElementScrollTop({
      align,
      element,
      scrollMargin: keepPreviousPeek ? scrollMargin + state.scrollPreviousItemPeek : scrollMargin,
      spacer: state.spacer,
      viewport
    })

    const nextSpacerHeight = getTailSpacerHeight({
      content,
      scrollTop,
      spacer: state.spacer,
      viewport
    })

    setTailSpacerHeight(nextSpacerHeight)
    // Seed the prepend anchor with the jump target so a prepend that lands
    // before this scroll settles still preserves the jumped-to row; once it
    // settles, syncAfterScroll's capturePrependAnchor re-captures it from the
    // first visible row.
    state.prependRestore = {
      element,
      viewportTop: getElementViewportTop(element, viewport)
    }

    state.mode = keepPreviousPeek ? "anchored-to-message" : "settling-jump"
    state.streamingTurn = keepPreviousPeek ? element : null

    scrollToPosition(scrollTop, { behavior })
    scheduleVisibilitySync()

    return true
  }

  function reanchorToAnchoredMessage() {
    const element = state.streamingTurn

    if (!element?.isConnected || state.mode !== "anchored-to-message") {
      return false
    }

    // Re-run the placement so the tail spacer is recomputed for the new content
    // height and the turn is held at the reading line.
    return scrollToElement(element, { align: "start" }, { keepPreviousPeek: true })
  }

  // The target row may not be mounted yet (e.g. an async-loaded transcript).
  // When it is missing the request is queued in state.pendingScrollToMessage and
  // flushed later — on registerMessage for that id, or on the next content
  // change. An explicit jump also marks the mount default as applied, so
  // defaultScrollPosition does not override it.
  function scrollToMessage(messageId: string, options?: MessageScrollerScrollOptions) {
    const element = state.messageElements.get(messageId)

    if (!element) {
      if (state.itemCount === 0) {
        state.pendingScrollToMessage = {
          messageId,
          options
        }
        state.defaultScrollPositionApplied = true

        return true
      }

      return false
    }

    state.defaultScrollPositionApplied = true

    if (scrollToElement(element, options)) {
      state.pendingScrollToMessage = null
      return true
    }

    state.pendingScrollToMessage = {
      messageId,
      options
    }

    return true
  }

  function flushPendingScrollToMessage() {
    const pending = state.pendingScrollToMessage

    if (!pending) {
      return false
    }

    const element = state.messageElements.get(pending.messageId)

    if (!element) {
      return false
    }

    const handled = scrollToElement(element, pending.options)

    if (!handled) {
      return false
    }

    state.pendingScrollToMessage = null
    state.defaultScrollPositionApplied = true

    return true
  }

  return {
    flushPendingScrollToMessage,
    reanchorToAnchoredMessage,
    scrollToElement,
    scrollToEnd,
    scrollToMessage,
    scrollToPosition,
    scrollToStart,
    setAutoScrolling,
    setTailSpacerHeight
  }
}

// -------------------------------------------------------------------------------------
// Controller
// -------------------------------------------------------------------------------------

// Orchestrator for one MessageScrollerProvider. Decides when to scroll and
// delegates the moves to createMessageScrollerCommands; state and visibility
// commits are coalesced on a requestAnimationFrame and torn down on cleanup.
// Runs once per Provider — prop changes are reacted to via createEffect instead
// of upstream's render-time ref mirroring.
function createMessageScrollerController(
  props: Required<
    Pick<
      MessageScrollerProviderProps,
      | "autoScroll"
      | "defaultScrollPosition"
      | "scrollEdgeThreshold"
      | "scrollMargin"
      | "scrollPreviousItemPeek"
    >
  >
): MessageScrollerContextValue {
  const state = createMessageScrollerState({
    autoScroll: props.autoScroll,
    defaultScrollPosition: props.defaultScrollPosition,
    scrollEdgeThreshold: props.scrollEdgeThreshold,
    scrollMargin: props.scrollMargin,
    scrollPreviousItemPeek: props.scrollPreviousItemPeek
  })
  const stateStore = createMessageScrollerStore(
    EMPTY_MESSAGE_SCROLLER_SCROLLABLE,
    areScrollStatesEqual
  )
  const visibilityStore = createMessageScrollerVisibilityStore()

  function writeStateAttributes(nextState: MessageScrollerScrollable) {
    const scrollable = [nextState.start && "start", nextState.end && "end"]
      .filter(Boolean)
      .join(" ")

    for (const element of [state.root, state.viewport]) {
      if (!element) {
        continue
      }

      if (scrollable) {
        element.setAttribute("data-scrollable", scrollable)
      } else {
        element.removeAttribute("data-scrollable")
      }

      element.toggleAttribute("data-autoscrolling", state.autoscrolling)
    }
  }

  // Owns the one follow-bottom transition: arm at the bottom, release on any
  // scroll away (including a scrollbar drag), suppressed during a programmatic
  // scroll so the auto-scroll animation cannot release itself. Arming also
  // skips the anchored-to-message hold: the tail spacer makes a freshly
  // anchored turn read as "at the end", and re-arming there would let the
  // first streamed chunk yank the reader off the anchor. The hold hands back
  // to following in handleResize, once the reply consumes the tail spacer.
  function reconcileFollowMode(scrollable: MessageScrollerScrollable) {
    const scrollTop = state.viewport?.scrollTop ?? 0
    // Content growing past the live edge also reads as "not at the end", but
    // only a scrollbar drag moves scrollTop up. Growth must not release
    // follow-output: the resize handler is coalesced onto a frame, so a state
    // commit can observe the grown content before follow catches up.
    const scrolledUp = scrollTop < state.lastScrollTop - SCROLL_POSITION_EPSILON

    state.lastScrollTop = scrollTop

    if (
      state.autoScroll &&
      !scrollable.end &&
      state.mode !== "settling-jump" &&
      state.mode !== "anchored-to-message"
    ) {
      state.mode = "following-bottom"
    } else if (
      state.mode === "following-bottom" &&
      scrollable.end &&
      scrolledUp &&
      !state.autoscrolling
    ) {
      state.mode = "free-scrolling"
    }
  }

  function commitScrollState() {
    const nextState = getMessageScrollerScrollable({
      content: state.content,
      scrollEdgeThreshold: state.scrollEdgeThreshold,
      spacer: state.spacer,
      viewport: state.viewport
    })

    reconcileFollowMode(nextState)

    // While follow-output is engaged the scroller is already closing any gap a
    // streamed chunk just opened, so publishing it as scrollable toward the
    // end would strobe the scroll button once per chunk. Reconcile runs on the
    // raw geometry first, so a commit that releases follow still publishes the
    // gap it released over.
    const publishedState =
      state.mode === "following-bottom" ? { ...nextState, end: false } : nextState

    writeStateAttributes(publishedState)
    stateStore.setSnapshot(publishedState)
  }

  function scheduleStateCommit() {
    if (state.stateFrame !== null || typeof window === "undefined") {
      return
    }

    state.stateFrame = window.requestAnimationFrame(() => {
      state.stateFrame = null
      commitScrollState()
    })
  }

  function scheduleVisibilitySync() {
    if (
      !visibilityStore.hasSubscribers() ||
      state.visibilityFrame !== null ||
      typeof window === "undefined"
    ) {
      return
    }

    state.visibilityFrame = window.requestAnimationFrame(() => {
      state.visibilityFrame = null

      // A frame can outlive the last unsubscribe. Recomputing here would
      // overwrite the EMPTY snapshot that teardown just wrote, leaving a stale
      // value for the next subscriber to read.
      if (!visibilityStore.hasSubscribers()) {
        return
      }

      visibilityStore.setSnapshot(
        getMessageScrollerVisibilityState({
          content: state.content,
          scrollMargin: state.scrollMargin,
          scrollPreviousItemPeek: state.scrollPreviousItemPeek,
          spacer: state.spacer,
          viewport: state.viewport,
          visibleMessageIds: state.visibleMessageIds
        })
      )
    })
  }

  const {
    flushPendingScrollToMessage,
    reanchorToAnchoredMessage,
    scrollToElement,
    scrollToEnd,
    scrollToMessage,
    scrollToStart
  } = createMessageScrollerCommands({
    state,
    commitScrollState,
    scheduleStateCommit,
    scheduleVisibilitySync
  })

  function restorePrependedAnchor() {
    const anchor = state.prependRestore
    const viewport = state.viewport

    if (!anchor || !viewport || !anchor.element.isConnected) {
      return false
    }

    // Compare the anchor relative to the viewport, not to the content. Native
    // scroll anchoring leaves the viewport-relative position unchanged, so this
    // is a no-op where the browser already handled the prepend and only corrects
    // the scroll where it did not (e.g. Safari) — without trusting a capability
    // flag, which some engines report incorrectly.
    const nextViewportTop = getElementViewportTop(anchor.element, viewport)
    const delta = nextViewportTop - anchor.viewportTop

    if (Math.abs(delta) <= SCROLL_POSITION_EPSILON) {
      return false
    }

    viewport.scrollTop += delta
    anchor.viewportTop = getElementViewportTop(anchor.element, viewport)
    scheduleStateCommit()
    scheduleVisibilitySync()

    return true
  }

  function capturePrependAnchor() {
    if (!state.content || !state.viewport) {
      state.prependRestore = null
      return
    }

    const anchor = getFirstVisibleMessageItem({
      content: state.content,
      spacer: state.spacer,
      viewport: state.viewport
    })

    state.prependRestore = anchor
      ? {
          element: anchor,
          viewportTop: getElementViewportTop(anchor, state.viewport)
        }
      : null
  }

  function schedulePendingScrollToMessageFlush() {
    if (state.pendingScrollFrame !== null || typeof window === "undefined") {
      return
    }

    state.pendingScrollFrame = window.requestAnimationFrame(() => {
      state.pendingScrollFrame = null

      if (flushPendingScrollToMessage()) {
        capturePrependAnchor()
      }
    })
  }

  function applyDefaultScrollPosition() {
    if (state.defaultScrollPositionApplied || state.itemCount === 0) {
      return false
    }

    let handled = false

    if (state.defaultScrollPosition === "last-anchor") {
      const anchor =
        state.content && state.viewport
          ? getLastScrollAnchor(getMessageScrollerItems(state.content, state.spacer))
          : null

      if (!state.content || !state.viewport || !anchor) {
        handled = scrollToEnd({ behavior: "auto" })
      } else {
        const anchorTop = getElementTop(anchor, state.viewport)
        const contentBottom = getContentBottom({
          content: state.content,
          spacer: state.spacer,
          viewport: state.viewport
        })
        // A short last turn already fits below the anchor, so opening at the end
        // shows the whole turn without leaving a blank gap beneath it.
        const lastTurnFits = contentBottom - anchorTop <= state.viewport.clientHeight

        handled = lastTurnFits
          ? scrollToEnd({ behavior: "auto" })
          : scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true })
      }
    } else {
      handled =
        state.defaultScrollPosition === "end"
          ? scrollToEnd({ behavior: "auto" })
          : scrollToStart({ behavior: "auto" })
    }

    if (handled) {
      state.defaultScrollPositionApplied = true
    }

    return handled
  }

  // Reconciles the scroll position with the new content, then re-captures the
  // prepend anchor. Branch order is load-bearing: pending jump, first-content,
  // prepended, appended, updated.
  function handleContentChange() {
    if (!state.content) {
      return
    }

    const items = getMessageScrollerItems(state.content, state.spacer)
    // Track which elements are genuinely new: Solid's For recreates DOM nodes
    // when backing objects are replaced, so the childList churns without the
    // list changing (see getUnanchoredScrollAnchor).
    const newItems = items.filter((item) => !state.seenItems.has(item))

    for (const item of newItems) {
      state.seenItems.add(item)
    }

    const previousItemCount = state.itemCount
    const previousFirstItem = state.firstItem

    state.itemCount = items.length
    state.firstItem = items[0] ?? null

    if (flushPendingScrollToMessage()) {
      capturePrependAnchor()
      return
    }

    if (previousItemCount === 0) {
      if (
        !applyDefaultScrollPosition() &&
        !(items.length > 0 && state.autoScroll && scrollToEnd({ behavior: "auto" }))
      ) {
        commitScrollState()
        scheduleVisibilitySync()
      }

      capturePrependAnchor()
      return
    }

    const previousFirstItemIndex = previousFirstItem ? items.indexOf(previousFirstItem) : -1
    const didPrepend = state.preserveScrollOnPrepend && previousFirstItemIndex > 0

    if (didPrepend) {
      // Prepended rows are not new appends. Restore the prior scroll position.
      // The restore is a no-op where native scroll anchoring already did it.
      restorePrependedAnchor()
      capturePrependAnchor()
      return
    }

    if (items.length > previousItemCount) {
      const anchor = getNewScrollAnchor(items, previousItemCount)

      if (anchor) {
        // While the reader is following the live end, a batch of several
        // anchored turns arriving at once should keep following the end — not
        // yank back to anchor the first turn of the batch. A single new anchor
        // still moves to the top as usual.
        if (
          state.autoScroll &&
          state.mode === "following-bottom" &&
          hasMultipleNewScrollAnchors(items, previousItemCount)
        ) {
          scrollToEnd({ behavior: "auto" })
        } else {
          scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true })
          state.handledScrollAnchors.add(anchor)
        }

        capturePrependAnchor()
        return
      }
    }

    if (items.length === previousItemCount) {
      const anchor = getUnanchoredScrollAnchor(newItems, state.handledScrollAnchors)

      if (anchor) {
        scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true })
        state.handledScrollAnchors.add(anchor)
        capturePrependAnchor()
        return
      }
    }

    // Appends with no new anchor (and content-only updates) fall through here:
    // keep following the end if we still are, otherwise just recommit state.
    if (state.mode === "following-bottom" && state.autoScroll) {
      scrollToEnd({ behavior: "auto" })
    } else {
      commitScrollState()
      scheduleVisibilitySync()
    }

    capturePrependAnchor()
  }

  function handleResize() {
    if (state.mode === "following-bottom" && state.autoScroll) {
      scrollToEnd({ behavior: "auto" })
      return
    }

    // Hold the anchored turn in place as content below it resizes (a reply
    // streaming in, or a transient marker collapsing) — otherwise the shrinking
    // content lets the browser clamp scrollTop and the turn drops.
    const previousSpacerHeight = state.spacerHeight

    if (reanchorToAnchoredMessage()) {
      // The reply streaming below the anchor consumes the tail spacer as it
      // grows. Once the last of it is gone the reply has filled the viewport
      // and the reader is genuinely at the live edge, so autoScroll hands off
      // from the anchor hold to following the bottom. Requiring the >0 → 0
      // transition keeps a turn taller than the viewport (placed with no
      // spacer) held instead of yanked to the end.
      if (state.autoScroll && previousSpacerHeight > 0 && state.spacerHeight === 0) {
        scrollToEnd({ behavior: "auto" })
      }

      return
    }

    scheduleStateCommit()
    scheduleVisibilitySync()
  }

  function startVisibilityObservation() {
    if (!state.viewport || !visibilityStore.hasSubscribers()) {
      return
    }

    if (typeof IntersectionObserver === "undefined") {
      scheduleVisibilitySync()
      return
    }

    if (!state.visibilityObserver) {
      state.visibilityObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const messageId = (entry.target as HTMLElement).dataset.messageId

            if (!messageId) {
              continue
            }

            if (entry.isIntersecting) {
              state.visibleMessageIds.add(messageId)
            } else {
              state.visibleMessageIds.delete(messageId)
            }
          }

          scheduleVisibilitySync()
        },
        {
          root: state.viewport,
          // Shrink the root's top edge to the anchoring line so a previous turn
          // peeking in the scrollMargin + peek band is not reported as visible,
          // keeping visibleMessageIds consistent with currentAnchorId. Captured
          // at observe time; a prop change rebuilds the observer on resubscribe.
          rootMargin: `${-(state.scrollMargin + state.scrollPreviousItemPeek)}px 0px 0px 0px`,
          threshold: [0, 0.01, 0.5, 1]
        }
      )
    }

    state.messageElements.forEach((element) => {
      state.visibilityObserver?.observe(element)
    })
    scheduleVisibilitySync()
  }

  function stopVisibilityObservation() {
    if (state.visibilityFrame !== null) {
      window.cancelAnimationFrame(state.visibilityFrame)
      state.visibilityFrame = null
    }

    state.visibilityObserver?.disconnect()
    state.visibilityObserver = null
    state.visibleMessageIds.clear()
    visibilityStore.setSnapshot(EMPTY_MESSAGE_SCROLLER_VISIBILITY_STATE)
  }

  function subscribeVisibility() {
    return visibilityStore.subscribe(startVisibilityObservation, stopVisibilityObservation)
  }

  const registerMessage: MessageScrollerRegisterMessage = (messageId, element, removedElement) => {
    if (element) {
      state.messageElements.set(messageId, element)
      state.visibilityObserver?.observe(element)
      scheduleVisibilitySync()

      if (state.pendingScrollToMessage?.messageId === messageId) {
        schedulePendingScrollToMessageFlush()
      }

      return
    }

    if (removedElement && state.messageElements.get(messageId) === removedElement) {
      state.messageElements.delete(messageId)
      state.visibleMessageIds.delete(messageId)
      state.visibilityObserver?.unobserve(removedElement)
      scheduleVisibilitySync()
    }
  }

  function userScrollIntent() {
    if (
      state.mode === "following-bottom" ||
      state.mode === "anchored-to-message" ||
      state.mode === "settling-jump"
    ) {
      // A deliberate gesture releases auto-follow, turn-anchoring, and an in-flight
      // programmatic jump so re-pinning (and re-arming) never fights the reader.
      state.streamingTurn = null
      state.mode = "free-scrolling"
    }
  }

  // The element setters re-mirror the current snapshot on mount because
  // data-scrollable/data-autoscrolling are written imperatively, outside
  // Solid's reactivity — without this the attributes would be missing until
  // the first scroll or resize commit.
  function setRootElement(element: HTMLDivElement | null) {
    state.root = element

    if (element) {
      writeStateAttributes(stateStore.snapshot())
    }
  }

  function setViewportElement(element: HTMLDivElement | null) {
    state.viewport = element

    if (element) {
      state.lastScrollTop = element.scrollTop
      writeStateAttributes(stateStore.snapshot())

      if (visibilityStore.hasSubscribers()) {
        startVisibilityObservation()
      }
    }
  }

  function setContentElement(element: HTMLDivElement | null) {
    state.content = element
  }

  function setSpacerElement(element: HTMLDivElement | null) {
    state.spacer = element
    state.spacerGap = getFlexGap(element?.parentElement ?? null)
  }

  function syncAfterScroll() {
    commitScrollState()
    scheduleVisibilitySync()
    capturePrependAnchor()
  }

  // Prop reactions replace upstream's render-time ref mirroring and the
  // previousDefaultScrollPosition comparison.
  createEffect(() => {
    state.scrollEdgeThreshold = props.scrollEdgeThreshold
    state.scrollMargin = props.scrollMargin
    state.scrollPreviousItemPeek = props.scrollPreviousItemPeek
  })

  createEffect(() => {
    const nextDefaultPosition = props.defaultScrollPosition

    if (state.defaultScrollPosition !== nextDefaultPosition) {
      state.defaultScrollPosition = nextDefaultPosition
      state.defaultScrollPositionApplied = false
      applyDefaultScrollPosition()
    }
  })

  createEffect(() => {
    const nextAutoScroll = props.autoScroll
    state.autoScroll = nextAutoScroll

    if (nextAutoScroll && state.mode === "following-bottom" && state.itemCount > 0) {
      scrollToEnd({ behavior: "auto" })
    } else {
      commitScrollState()
    }
  })

  onCleanup(() => {
    if (state.stateFrame !== null) {
      window.cancelAnimationFrame(state.stateFrame)
      state.stateFrame = null
    }

    if (state.visibilityFrame !== null) {
      window.cancelAnimationFrame(state.visibilityFrame)
      state.visibilityFrame = null
    }

    if (state.autoscrollingTimeout !== null) {
      window.clearTimeout(state.autoscrollingTimeout)
      state.autoscrollingTimeout = null
    }

    if (state.pendingScrollFrame !== null) {
      window.cancelAnimationFrame(state.pendingScrollFrame)
      state.pendingScrollFrame = null
    }

    state.visibilityObserver?.disconnect()
    state.visibilityObserver = null
  })

  return {
    handleContentChange,
    handleResize,
    registerMessage,
    scrollable: stateStore.snapshot,
    scrollToEnd,
    scrollToMessage,
    scrollToStart,
    setContentElement,
    setPreserveScrollOnPrepend: (preserve) => {
      state.preserveScrollOnPrepend = preserve
    },
    setRootElement,
    setSpacerElement,
    setViewportElement,
    subscribeVisibility,
    syncAfterScroll,
    userScrollIntent,
    visibility: visibilityStore.snapshot
  }
}

// -------------------------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------------------------

export {
  type MessageScrollerButtonProps,
  type MessageScrollerButtonRenderState,
  type MessageScrollerContentProps,
  type MessageScrollerContextValue,
  type MessageScrollerItemProps,
  type MessageScrollerProps,
  type MessageScrollerProviderProps,
  type MessageScrollerScrollable,
  type MessageScrollerViewportProps,
  type MessageScrollerVisibilityState,
  DEFAULT_SCROLL_EDGE_THRESHOLD,
  DEFAULT_SCROLL_MARGIN,
  DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
  USER_SCROLL_KEYS,
  createMessageScrollerController,
  callEventHandler,
  setElementRef
}
