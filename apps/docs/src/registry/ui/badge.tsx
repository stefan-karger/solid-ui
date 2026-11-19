import { dynamic, type JSX, type ComponentProps, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { isStatic, omit } from "solid-js"

import { cn } from "~/lib/utils"

type PolymorphicProps<T extends ValidComponent, P> = Omit<P, "as" | "class" | "children"> &
  Omit<ComponentProps<T>, keyof P | "as" | "class" | "children" | "onChange"> & {
    as?: T
    class?: string | undefined
    children?: JSX.Element
  }

const badgeVariants = cva(
  "group/badge cn-badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none",
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

type BadgeProps<T extends ValidComponent = "span"> = PolymorphicProps<T, ComponentProps<"span">> &
  VariantProps<typeof badgeVariants> &
  Pick<ComponentProps<T>, "class">

const Badge = <T extends ValidComponent = "span">(props: BadgeProps<T>) => {
  const others = omit(props as BadgeProps, "class", "as", "variant")
  const Comp = dynamic(() => props.as ?? "span", { static: isStatic(props, "as") })
  return (
    <Comp
      class={cn(badgeVariants({ variant: props.variant }), props.class)}
      data-slot="badge"
      data-variant={props.variant}
      {...others}
    />
  )
}

export { Badge, badgeVariants, type BadgeProps }
