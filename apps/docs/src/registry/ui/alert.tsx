import type { Component, ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as AlertPrimitive from "@kobalte/core/alert"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type AlertRootProps<T extends ValidComponent = "div"> = AlertPrimitive.AlertRootProps<T> &
  VariantProps<typeof alertVariants> & { class?: string | undefined }

const Alert = <T extends ValidComponent = "div">(props: PolymorphicProps<T, AlertRootProps<T>>) => {
  const [local, others] = splitProps(props as AlertRootProps, ["class", "variant"])
  return (
    <AlertPrimitive.Root
      class={cn(alertVariants({ variant: props.variant }), local.class)}
      {...others}
    />
  )
}

const AlertTitle: Component<ComponentProps<"h5">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <h5 class={cn("mb-1 font-medium leading-none tracking-tight", local.class)} {...others} />
}

const AlertDescription: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <div class={cn("text-sm [&_p]:leading-relaxed", local.class)} {...others} />
}

export { Alert, AlertTitle, AlertDescription }
