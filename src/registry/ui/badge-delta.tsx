import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { Component, JSXElement } from "solid-js";
import { createEffect, on, splitProps } from "solid-js";

import { cn } from "~/lib/utils";
import type { BadgeProps } from "~/registry/ui/badge";
import { Badge } from "~/registry/ui/badge";

type DeltaType =
  | "increase"
  | "moderateIncrease"
  | "unchanged"
  | "moderateDecrease"
  | "decrease";

const badgeDeltaVariants = cva("", {
  variants: {
    variant: {
      error: "bg-error text-error-foreground hover:bg-error",
      success: "bg-success text-success-foreground hover:bg-success",
      warning: "bg-warning text-warning-foreground hover:bg-warning",
    },
  },
});
type DeltaVariant = NonNullable<
  VariantProps<typeof badgeDeltaVariants>["variant"]
>;

const iconMap: {
  [key in DeltaType]: (props: { class?: string }) => JSXElement;
} = {
  decrease: (props) => (
    <svg
      class={props.class}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Decrease</title>
      <path d="M12 5l0 14" />
      <path d="M18 13l-6 6" />
      <path d="M6 13l6 6" />
    </svg>
  ),
  increase: (props) => (
    <svg
      class={props.class}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Increase</title>
      <path d="M12 5l0 14" />
      <path d="M18 11l-6 -6" />
      <path d="M6 11l6 -6" />
    </svg>
  ),
  moderateDecrease: (props) => (
    <svg
      class={props.class}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Moderate Decrease</title>
      <path d="M7 7l10 10" />
      <path d="M17 8l0 9l-9 0" />
    </svg>
  ),
  moderateIncrease: (props) => (
    <svg
      class={props.class}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Moderate Increase</title>
      <path d="M17 7l-10 10" />
      <path d="M8 7l9 0l0 9" />
    </svg>
  ),
  unchanged: (props) => (
    <svg
      class={props.class}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Unchanged</title>
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </svg>
  ),
};

const variantMap: { [key in DeltaType]: DeltaVariant } = {
  decrease: "error",
  increase: "success",
  moderateDecrease: "error",
  moderateIncrease: "success",
  unchanged: "warning",
};

type BadgeDeltaProps = Omit<BadgeProps, "variant"> & {
  deltaType: DeltaType;
};

const BadgeDelta: Component<BadgeDeltaProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "deltaType"]);

  // eslint-disable-next-line solid/reactivity
  let Icon = iconMap[local.deltaType];
  createEffect(
    on(
      () => local.deltaType,
      () => {
        Icon = iconMap[local.deltaType];
      },
    ),
  );

  return (
    <Badge
      class={cn(
        badgeDeltaVariants({ variant: variantMap[local.deltaType] }),
        local.class,
      )}
      {...others}
    >
      <span class="flex gap-1">
        <Icon class="size-4" />
        {local.children}
      </span>
    </Badge>
  );
};

export { BadgeDelta };
