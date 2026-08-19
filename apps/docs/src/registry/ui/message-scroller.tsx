import { ArrowDown } from "lucide-solid";
import type { JSX } from "solid-js";
import {
  children,
  createContext,
  createEffect,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from "solid-js";
import { cn } from "~/lib/utils";
import { Button, type ButtonProps } from "~/registry/ui/button";

import {
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
  setElementRef,
} from "~/registry/hooks/use-message-scroller";

const MessageScrollerContext = createContext<MessageScrollerContextValue>();

function useMessageScrollerContext() {
  const context = useContext(MessageScrollerContext);

  if (!context) {
    throw new Error("MessageScroller parts must be used within MessageScroller.Provider.");
  }

  return context;
}

function useMessageScroller() {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScrollerContext();

  return { scrollToEnd, scrollToMessage, scrollToStart };
}

function useMessageScrollerScrollable(): MessageScrollerScrollable {
  const context = useMessageScrollerContext();

  return {
    get start() {
      return context.scrollable().start;
    },
    get end() {
      return context.scrollable().end;
    },
  };
}

function useMessageScrollerVisibility(): MessageScrollerVisibilityState {
  const context = useMessageScrollerContext();
  const unsubscribe = context.subscribeVisibility();

  onCleanup(unsubscribe);

  return {
    get currentAnchorId() {
      return context.visibility().currentAnchorId;
    },
    get visibleMessageIds() {
      return context.visibility().visibleMessageIds;
    },
  };
}

const MessageScrollerProvider = (rawProps: MessageScrollerProviderProps) => {
  const props = mergeProps(
    {
      autoScroll: false,
      defaultScrollPosition: "end" as const,
      scrollEdgeThreshold: DEFAULT_SCROLL_EDGE_THRESHOLD,
      scrollMargin: DEFAULT_SCROLL_MARGIN,
      scrollPreviousItemPeek: DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
    },
    rawProps,
  );
  const context = createMessageScrollerController(props);

  return (
    <MessageScrollerContext.Provider value={context}>
      {props.children}
    </MessageScrollerContext.Provider>
  );
};

const MessageScroller = (props: MessageScrollerProps) => {
  const context = useMessageScrollerContext();
  const [local, others] = splitProps(props, ["class", "ref"]);
  let rootElement: HTMLDivElement | undefined;

  onCleanup(() => {
    if (rootElement) context.setRootElement(null);
  });

  return (
    <div
      ref={(element) => {
        rootElement = element;
        context.setRootElement(element);
        setElementRef(local.ref, element);
      }}
      data-slot="message-scroller"
      class={cn(
        "cn-message-scroller group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        local.class,
      )}
      {...others}
    />
  );
};

const MessageScrollerViewport = (rawProps: MessageScrollerViewportProps) => {
  const props = mergeProps({ preserveScrollOnPrepend: true }, rawProps);
  const context = useMessageScrollerContext();
  const [local, others] = splitProps(props, [
    "aria-label",
    "children",
    "class",
    "onKeyDown",
    "onScroll",
    "onTouchMove",
    "onWheel",
    "preserveScrollOnPrepend",
    "ref",
    "role",
    "tabIndex",
  ]);
  let viewportElement: HTMLDivElement | undefined;

  createEffect(() => context.setPreserveScrollOnPrepend(local.preserveScrollOnPrepend));

  onMount(() => {
    if (!viewportElement || typeof ResizeObserver === "undefined") return;

    // Coalesce into rAF: handleResize mutates the spacer inside the observed
    // content, and resizing an observed element during delivery fires
    // "ResizeObserver loop completed with undelivered notifications".
    let frame = 0;
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(context.handleResize);
    });
    observer.observe(viewportElement);

    onCleanup(() => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    });
  });

  onCleanup(() => {
    if (viewportElement) context.setViewportElement(null);
  });

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useAriaPropsSupportedByRole: the labelled native scroll viewport needs scroll-intent handlers and receives a region role by default
    <div
      ref={(element) => {
        viewportElement = element;
        context.setViewportElement(element);
        setElementRef(local.ref, element);
      }}
      data-slot="message-scroller-viewport"
      role={local.role ?? "region"}
      aria-label={local["aria-label"] ?? "Messages"}
      tabIndex={local.tabIndex ?? 0}
      onKeyDown={(event) => {
        if (USER_SCROLL_KEYS.has(event.key)) context.userScrollIntent();
        callEventHandler(local.onKeyDown, event);
      }}
      onScroll={(event) => {
        context.syncAfterScroll();
        callEventHandler(local.onScroll, event);
      }}
      onTouchMove={(event) => {
        context.userScrollIntent();
        callEventHandler(local.onTouchMove, event);
      }}
      onWheel={(event) => {
        context.userScrollIntent();
        callEventHandler(local.onWheel, event);
      }}
      class={cn(
        "cn-message-scroller-viewport size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent",
        local.class,
      )}
      {...others}
    >
      {local.children}
    </div>
  );
};

const MessageScrollerContent = (props: MessageScrollerContentProps) => {
  const context = useMessageScrollerContext();
  const [local, others] = splitProps(props, [
    "aria-relevant",
    "children",
    "class",
    "ref",
    "role",
    "spacerClassName",
  ]);
  let contentElement: HTMLDivElement | undefined;
  let spacerElement: HTMLDivElement | undefined;

  onMount(() => {
    if (!contentElement) return;

    context.handleContentChange();

    const mutationObserver =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(context.handleContentChange);
    mutationObserver?.observe(contentElement, { childList: true });

    // Coalesce into rAF: handleResize mutates the spacer inside this observed
    // element, and resizing an observed element during delivery fires
    // "ResizeObserver loop completed with undelivered notifications".
    let frame = 0;
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(context.handleResize);
          });
    resizeObserver?.observe(contentElement);

    onCleanup(() => {
      window.cancelAnimationFrame(frame);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    });
  });

  onCleanup(() => {
    if (contentElement) context.setContentElement(null);
    if (spacerElement) context.setSpacerElement(null);
  });

  return (
    <div
      ref={(element) => {
        contentElement = element;
        context.setContentElement(element);
        setElementRef(local.ref, element);
      }}
      data-slot="message-scroller-content"
      role={local.role ?? "log"}
      aria-relevant={local["aria-relevant"] ?? "additions"}
      class={cn("cn-message-scroller-content flex h-max min-h-full flex-col", local.class)}
      {...others}
    >
      {local.children}
      <div
        ref={(element) => {
          spacerElement = element;
          context.setSpacerElement(element);
        }}
        aria-hidden="true"
        data-message-scroller-spacer=""
        hidden
        class={local.spacerClassName}
      />
    </div>
  );
};

const MessageScrollerItem = (rawProps: MessageScrollerItemProps) => {
  const props = mergeProps({ scrollAnchor: false }, rawProps);
  const context = useMessageScrollerContext();
  const [local, others] = splitProps(props, ["class", "messageId", "ref", "scrollAnchor"]);
  let itemElement: HTMLDivElement | undefined;

  createEffect(() => {
    const messageId = local.messageId;
    if (!messageId || !itemElement) return;

    context.registerMessage(messageId, itemElement);
    onCleanup(() => context.registerMessage(messageId, null, itemElement));
  });

  return (
    <div
      ref={(element) => {
        itemElement = element;
        setElementRef(local.ref, element);
      }}
      data-slot="message-scroller-item"
      data-message-id={local.messageId}
      data-scroll-anchor={local.scrollAnchor ? "true" : "false"}
      class={cn(
        "cn-message-scroller-item min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
        local.class,
      )}
      {...others}
    />
  );
};

const MessageScrollerButton = (rawProps: MessageScrollerButtonProps) => {
  const props = mergeProps(
    {
      behavior: "smooth" as const,
      direction: "end" as const,
      size: "icon-sm" as const,
      type: "button" as const,
      variant: "secondary" as const,
    },
    rawProps,
  );
  const context = useMessageScrollerContext();
  const [local, others] = splitProps(props, [
    "behavior",
    "children",
    "class",
    "direction",
    "inert",
    "onClick",
    "render",
    "size",
    "tabIndex",
    "type",
    "variant",
  ]);
  const isActive = () => {
    const state = context.scrollable();
    return local.direction === "start" ? state.start : state.end;
  };
  const resolvedChildren = children(() => local.children);
  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    if (!isActive()) return;

    callEventHandler(local.onClick, event);
    if (event.defaultPrevented) return;

    event.currentTarget.blur();
    if (local.direction === "start") context.scrollToStart({ behavior: local.behavior });
    else context.scrollToEnd({ behavior: local.behavior });
  };
  const buttonClass = () =>
    cn(
      "cn-message-scroller-button absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:right-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
      local.class,
    );
  const defaultChildren = () =>
    resolvedChildren() ?? (
      <>
        <ArrowDown />
        <span class="sr-only">
          {local.direction === "end" ? "Scroll to end" : "Scroll to start"}
        </span>
      </>
    );
  // Reactive props handed to the render function; the upstream useRender
  // stateAttributesMapping collapses to literal data-active/data-direction.
  const renderProps = mergeProps(others, {
    get class() {
      return buttonClass();
    },
    get children() {
      return defaultChildren();
    },
    get "data-active"() {
      return isActive() ? "true" : "false";
    },
    get "data-direction"() {
      return local.direction;
    },
    get "data-size"() {
      return local.size;
    },
    "data-slot": "message-scroller-button",
    get "data-variant"() {
      return local.variant;
    },
    get inert() {
      return local.inert ?? !isActive();
    },
    onClick: handleClick,
    get size() {
      return local.size;
    },
    get tabIndex() {
      return isActive() ? local.tabIndex : -1;
    },
    get type() {
      return local.type;
    },
    get variant() {
      return local.variant;
    },
  }) as ButtonProps;
  const renderState: MessageScrollerButtonRenderState = {
    get active() {
      return isActive();
    },
    get direction() {
      return local.direction;
    },
  };

  if (local.render) return <>{local.render(renderProps, renderState)}</>;

  return (
    <Button
      {...others}
      data-slot="message-scroller-button"
      data-direction={local.direction}
      data-variant={local.variant}
      data-size={local.size}
      data-active={isActive() ? "true" : "false"}
      inert={local.inert ?? !isActive()}
      tabIndex={isActive() ? local.tabIndex : -1}
      type={local.type}
      variant={local.variant}
      size={local.size}
      class={buttonClass()}
      onClick={handleClick}
    >
      {defaultChildren()}
    </Button>
  );
};

export {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
 };
