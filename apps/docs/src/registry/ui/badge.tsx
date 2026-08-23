import { splitProps, type ValidComponent } from "solid-js"

import { type BadgeRootProps, Root } from "@kobalte/core/badge"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "group/badge cn-badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "cn-badge-variant-default",
        secondary: "cn-badge-variant-secondary",
        destructive: "cn-badge-variant-destructive",
        outline: "cn-badge-variant-outline",
        ghost: "cn-badge-variant-ghost",
        link: "cn-badge-variant-link",
        "primary-light": "cn-badge-variant-primary-light",
        "destructive-light": "cn-badge-variant-destructive-light",
        "success-light": "cn-badge-variant-success-light",
        "warning-light": "cn-badge-variant-warning-light",
        "info-light": "cn-badge-variant-info-light",
        "primary-outline": "cn-badge-variant-primary-outline",
        "destructive-outline": "cn-badge-variant-destructive-outline",
        "success-outline": "cn-badge-variant-success-outline",
        "warning-outline": "cn-badge-variant-warning-outline",
        "info-outline": "cn-badge-variant-info-outline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type BadgeProps<T extends ValidComponent = "span"> = PolymorphicProps<T, BadgeRootProps<T>> &
  VariantProps<typeof badgeVariants>

const Badge = <T extends ValidComponent = "span">(props: BadgeProps<T>) => {
  const [local, others] = splitProps(props as BadgeProps, ["class", "variant"])
  return (
    <Root
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      data-slot="badge"
      data-variant={local.variant ?? "default"}
      {...others}
    />
  )
}

export { Badge, badgeVariants }
