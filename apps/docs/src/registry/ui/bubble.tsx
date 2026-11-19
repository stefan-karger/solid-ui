import { dynamic, type ComponentProps, type JSX } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { isStatic, omit } from "solid-js"

import { cn } from "~/lib/utils"

const bubbleVariants = cva("cn-bubble group/bubble relative flex w-fit min-w-0 flex-col", {
  variants: {
    variant: {
      default: "cn-bubble-variant-default",
      secondary: "cn-bubble-variant-secondary",
      muted: "cn-bubble-variant-muted",
      tinted: "cn-bubble-variant-tinted",
      outline: "cn-bubble-variant-outline",
      ghost: "cn-bubble-variant-ghost",
      destructive: "cn-bubble-variant-destructive"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

const bubbleReactionsVariants = cva(
  "cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center",
  {
    variants: {
      side: {
        top: "cn-bubble-reactions-side-top",
        bottom: "cn-bubble-reactions-side-bottom"
      },
      align: {
        start: "cn-bubble-reactions-align-start",
        end: "cn-bubble-reactions-align-end"
      }
    },
    defaultVariants: {
      side: "bottom",
      align: "end"
    }
  }
)

export function BubbleGroup(props: Omit<ComponentProps<"div">, "class"> & { class?: string }) {
  return (
    <div
      {...props}
      data-slot="bubble-group"
      class={cn("cn-bubble-group flex min-w-0 flex-col", props.class)}
    />
  )
}

export function Bubble(
  props: Omit<ComponentProps<"div">, "class"> & {
    class?: string
    align?: "start" | "end"
    variant?: VariantProps<typeof bubbleVariants>["variant"]
  }
) {
  const rest = omit(props, "class", "align", "variant")
  return (
    <div
      {...rest}
      data-slot="bubble"
      data-align={props.align ?? "start"}
      data-variant={props.variant ?? "default"}
      class={cn(bubbleVariants({ variant: props.variant ?? "default" }), props.class)}
    />
  )
}

export function BubbleContent(
  props: ComponentProps<"div"> & {
    render?: (
      props: Record<string, unknown> & { class: string; children?: JSX.Element }
    ) => JSX.Element
  }
) {
  const Comp = dynamic(() => props.render ?? "div", { static: isStatic(props, "render") })
  const rest = omit(props, "class", "render")
  return (
    <Comp
      data-slot="bubble-content"
      class={cn(
        "cn-bubble-content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word",
        props.class
      )}
      {...rest}
    />
  )
}

export function BubbleReactions(
  props: Omit<ComponentProps<"div">, "class"> & {
    class?: string
    side?: "top" | "bottom"
    align?: "start" | "end"
  }
) {
  const rest = omit(props, "class", "side", "align")
  return (
    <div
      {...rest}
      data-slot="bubble-reactions"
      data-side={props.side ?? "bottom"}
      data-align={props.align ?? "end"}
      class={cn(
        bubbleReactionsVariants({ side: props.side ?? "bottom", align: props.align ?? "end" }),
        props.class
      )}
    />
  )
}
