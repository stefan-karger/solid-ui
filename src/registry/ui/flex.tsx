import type { Component, ComponentProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

import { cn } from "~/lib/utils";

type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";
type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";

type FlexProps = ComponentProps<"div"> & {
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
};

const Flex: Component<FlexProps> = (rawProps) => {
  const props = mergeProps(
    {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "between",
    } satisfies FlexProps,
    rawProps,
  );
  const [local, others] = splitProps(props, [
    "flexDirection",
    "justifyContent",
    "alignItems",
    "class",
  ]);

  return (
    <div
      class={cn(
        "flex w-full",
        flexDirectionClassNames[local.flexDirection],
        justifyContentClassNames[local.justifyContent],
        alignItemsClassNames[local.alignItems],
        local.class,
      )}
      {...others}
    />
  );
};

export { Flex };

const justifyContentClassNames: { [key in JustifyContent]: string } = {
  around: "justify-around",
  between: "justify-between",
  center: "justify-center",
  end: "justify-end",
  evenly: "justify-evenly",
  start: "justify-start",
};

const alignItemsClassNames: { [key in AlignItems]: string } = {
  baseline: "items-baseline",
  center: "items-center",
  end: "items-end",
  start: "items-start",
  stretch: "items-stretch",
};

const flexDirectionClassNames: { [key in FlexDirection]: string } = {
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
};
