import { cva, type VariantProps } from "class-variance-authority";
import {
  type ComponentProps,
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";

import { cn } from "~/lib/utils";

type BubbleGroupProps = ComponentProps<"div">;

const BubbleGroup = (props: BubbleGroupProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="bubble-group"
      class={cn("cn-bubble-group flex min-w-0 flex-col", local.class)}
      {...others}
    />
  );
};

const bubbleVariants = cva("cn-bubble group/bubble relative flex w-fit min-w-0 flex-col", {
  variants: {
    variant: {
      default: "cn-bubble-variant-default",
      secondary: "cn-bubble-variant-secondary",
      muted: "cn-bubble-variant-muted",
      tinted: "cn-bubble-variant-tinted",
      outline: "cn-bubble-variant-outline",
      ghost: "cn-bubble-variant-ghost",
      destructive: "cn-bubble-variant-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BubbleProps = ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end";
  };

const Bubble = (rawProps: BubbleProps) => {
  const props = mergeProps({ align: "start" as const, variant: "default" as const }, rawProps);
  const [local, others] = splitProps(props, ["align", "class", "variant"]);
  return (
    <div
      data-slot="bubble"
      data-variant={local.variant}
      data-align={local.align}
      class={cn(bubbleVariants({ variant: local.variant }), local.class)}
      {...others}
    />
  );
};

type BubbleContentProps<T extends ValidComponent = "div"> = {
  as?: T;
  class?: string | undefined;
  children?: JSX.Element;
} & Omit<ComponentProps<T>, "as" | "class" | "children">;

const BubbleContent = <T extends ValidComponent = "div">(rawProps: BubbleContentProps<T>) => {
  const props = mergeProps({ as: "div" as T } as const, rawProps);
  const [local, others] = splitProps(props as BubbleContentProps, ["as", "class"]);
  return (
    <Dynamic
      component={local.as}
      data-slot="bubble-content"
      class={cn(
        "cn-bubble-content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors",
        local.class,
      )}
      {...others}
    />
  );
};

const bubbleReactionsVariants = cva(
  "cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center",
  {
    variants: {
      side: {
        top: "cn-bubble-reactions-side-top",
        bottom: "cn-bubble-reactions-side-bottom",
      },
      align: {
        start: "cn-bubble-reactions-align-start",
        end: "cn-bubble-reactions-align-end",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  },
);

type BubbleReactionsProps = ComponentProps<"div"> & {
  align?: "start" | "end";
  side?: "top" | "bottom";
};

const BubbleReactions = (rawProps: BubbleReactionsProps) => {
  const props = mergeProps({ align: "end" as const, side: "bottom" as const }, rawProps);
  const [local, others] = splitProps(props, ["align", "class", "side"]);
  return (
    <div
      data-slot="bubble-reactions"
      data-align={local.align}
      data-side={local.side}
      class={cn(bubbleReactionsVariants({ align: local.align, side: local.side }), local.class)}
      {...others}
    />
  );
};

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions };
