import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "cn-badge group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "cn-badge-variant-default",
        secondary: "cn-badge-variant-secondary",
        destructive: "cn-badge-variant-destructive",
        outline: "cn-badge-variant-outline",
        ghost: "cn-badge-variant-ghost",
        link: "cn-badge-variant-link"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type BadgeProps<T extends ValidComponent = "span"> = ComponentProps<T> &
  VariantProps<typeof badgeVariants> & {
    class?: string | undefined
  }

const Badge = <T extends ValidComponent = "span">(rawProps: PolymorphicProps<T, BadgeProps<T>>) => {
  const [local, others] = splitProps(rawProps as BadgeProps, ["class", "variant"])

  return (
    <span
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      data-slot="badge"
      data-variant={local.variant}
      {...others}
    />
  )
}

export { Badge, badgeVariants }
