import { type ComponentProps, splitProps, type ValidComponent } from "solid-js"

import { Polymorphic, type PolymorphicProps } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type BadgeProps<T extends ValidComponent = "span"> = PolymorphicProps<T, ComponentProps<"span">> &
  VariantProps<typeof badgeVariants>

const Badge = <T extends ValidComponent = "span">(props: BadgeProps<T>) => {
  const [local, others] = splitProps(props, ["class", "variant"])
  return (
    <Polymorphic
      as="span"
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      data-slot="badge"
      {...others}
    />
  )
}

export { Badge, badgeVariants }
