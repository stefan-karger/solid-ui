// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps, JSX } from "@solidjs/web"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "~/registry/ui/collapsible"

export function Trace(
  props: Omit<ComponentProps<"div">, "class"> & { class?: string }
) {
  return (
    <div
      {...props}
      data-slot="trace"
      class={cn(
        "cn-trace flex w-full min-w-0 flex-col *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:text-left *:has-[>[data-slot=trace-line]]:outline-none",
        props.class
      )}
    />
  )
}

export function TraceLine(
  props: Omit<ComponentProps<"span">, "class"> & {
    class?: string
    status?: "running" | "error" | "pending" | undefined
  }
) {
  const rest = omit(props, "class", "status")
  return (
    <span
      {...rest}
      data-slot="trace-line"
      data-status={props.status ?? undefined}
      class={cn(
        "cn-trace-line flex w-fit max-w-full min-w-0 items-center text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:opacity-60 data-[status=running]:*:data-[slot=trace-title]:shimmer",
        props.class
      )}
    />
  )
}

export function TraceIcon(
  props: Omit<ComponentProps<"span">, "class"> & { class?: string }
) {
  return (
    <span
      {...props}
      data-slot="trace-icon"
      class={cn(
        "cn-trace-icon flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
        props.class
      )}
    />
  )
}

export function TraceTitle(
  props: Omit<ComponentProps<"span">, "class"> & { class?: string }
) {
  return (
    <span
      {...props}
      data-slot="trace-title"
      class={cn(
        "cn-trace-title min-w-0 truncate motion-reduce:shimmer-none",
        props.class
      )}
    />
  )
}

export function TraceDescription(
  props: Omit<ComponentProps<"span">, "class"> & { class?: string }
) {
  return (
    <span
      {...props}
      data-slot="trace-description"
      class={cn(
        "cn-trace-description shrink-0 text-muted-foreground/70 tabular-nums",
        props.class
      )}
    />
  )
}

export function TraceCollapsible(props: ComponentProps<typeof Collapsible>) {
  const rest = omit(props, "class", "render")
  return (
    <Collapsible
      {...rest}
      class={cn(
        "cn-trace-collapsible flex w-full min-w-0 flex-col",
        props.class
      )}
      render={(part, state) => {
        const forwarded = merge(part, { "data-slot": "trace-collapsible" })
        return props.render ? (
          props.render(forwarded, state)
        ) : (
          <div {...forwarded} />
        )
      }}
    />
  )
}

export function TraceCollapsibleTrigger(
  props: ComponentProps<typeof CollapsibleTrigger>
) {
  const rest = omit(props, "class", "children", "render")
  return (
    <CollapsibleTrigger
      {...rest}
      class={cn(
        "cn-trace-collapsible-trigger group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center text-left text-muted-foreground transition-colors outline-none hover:text-foreground has-[[data-slot=trace-line][data-status=error]]:text-destructive",
        props.class
      )}
      render={(part, state) => {
        const forwarded = merge(part, {
          "data-slot": "trace-collapsible-trigger"
        })
        return props.render ? (
          props.render(forwarded, state)
        ) : (
          <button {...forwarded} />
        )
      }}
    >
      {props.children}
      <TraceIcon class="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
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
          class="size-4"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </TraceIcon>
    </CollapsibleTrigger>
  )
}

export function TraceCollapsibleContent(
  props: Omit<ComponentProps<typeof CollapsibleContent>, "children"> & {
    children?: JSX.Element
  }
) {
  const rest = omit(props, "class", "children", "render")
  return (
    <CollapsibleContent
      {...rest}
      class="cn-trace-collapsible-content h-(--collapsible-panel-height) min-w-0 overflow-hidden transition-[height] data-ending-style:h-0 data-starting-style:h-0"
      render={(part, state) => {
        const forwarded = merge(part, {
          "data-slot": "trace-collapsible-content"
        })
        return props.render ? (
          props.render(forwarded, state)
        ) : (
          <div {...forwarded} />
        )
      }}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        class={cn(
          "cn-trace-collapsible-content-inner min-w-0 wrap-break-word text-muted-foreground",
          props.class
        )}
      >
        {props.children}
      </div>
    </CollapsibleContent>
  )
}
