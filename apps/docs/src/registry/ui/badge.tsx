import { type ComponentProps, mergeProps, splitProps, type ValidComponent } from "solid-js"

import { Polymorphic, type PolymorphicProps } from "@kobalte/core"
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
    as?: T
    class?: string | undefined
  }

const Badge = <T extends ValidComponent = "span">(
  rawProps: PolymorphicProps<T, BadgeProps<T>>
) => {
  const props = mergeProps({ as: "span" }, rawProps)
  const [local, others] = splitProps(props as BadgeProps, ["class", "variant", "as"])
  return (
    <Polymorphic
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      data-slot="badge"
      as={local.as ?? "span"}
      {...others}
    />
  )
}

export { Badge, badgeVariants }
