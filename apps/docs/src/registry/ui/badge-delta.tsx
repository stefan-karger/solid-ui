import type { Component, JSXElement } from "solid-js"
import { createEffect, on, splitProps } from "solid-js"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { BadgeProps } from "@/registry/ui/badge"
import { Badge } from "@/registry/ui/badge"

type DeltaType = "increase" | "moderateIncrease" | "unchanged" | "moderateDecrease" | "decrease"

const badgeDeltaVariants = cva("", {
  variants: {
    variant: {
      success: "bg-success text-success-foreground hover:bg-success",
      warning: "bg-warning text-warning-foreground hover:bg-warning",
      error: "bg-error text-error-foreground hover:bg-error"
    }
  }
})
type DeltaVariant = NonNullable<VariantProps<typeof badgeDeltaVariants>["variant"]>

const iconMap: { [key in DeltaType]: (props: { class?: string }) => JSXElement } = {
  increase: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="M12 5l0 14" />
      <path d="M18 11l-6 -6" />
      <path d="M6 11l6 -6" />
    </svg>
  ),
  moderateIncrease: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="M17 7l-10 10" />
      <path d="M8 7l9 0l0 9" />
    </svg>
  ),
  unchanged: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </svg>
  ),
  moderateDecrease: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="M7 7l10 10" />
      <path d="M17 8l0 9l-9 0" />
    </svg>
  ),
  decrease: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="M12 5l0 14" />
      <path d="M18 13l-6 6" />
      <path d="M6 13l6 6" />
    </svg>
  )
}

const variantMap: { [key in DeltaType]: DeltaVariant } = {
  increase: "success",
  moderateIncrease: "success",
  unchanged: "warning",
  moderateDecrease: "error",
  decrease: "error"
}

type BadgeDeltaProps = Omit<BadgeProps, "variant"> & {
  deltaType: DeltaType
}

const BadgeDelta: Component<BadgeDeltaProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "deltaType"])

  // eslint-disable-next-line solid/reactivity
  let Icon = iconMap[local.deltaType]
  createEffect(
    on(
      () => local.deltaType,
      () => {
        Icon = iconMap[local.deltaType]
      }
    )
  )

  return (
    <Badge
      class={cn(badgeDeltaVariants({ variant: variantMap[local.deltaType] }), local.class)}
      {...others}
    >
      <span class="flex gap-1">
        <Icon class="size-4" />
        {local.children}
      </span>
    </Badge>
  )
}

export { BadgeDelta }
