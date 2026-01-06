import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const alertVariants = cva("cn-alert group/alert relative w-full", {
  variants: {
    variant: {
      default: "cn-alert-variant-default",
      destructive: "cn-alert-variant-destructive"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

type AlertProps<T extends ValidComponent = "div"> = ComponentProps<T> &
  VariantProps<typeof alertVariants> & {
    class?: string | undefined
  }

const Alert = <T extends ValidComponent = "div">(props: PolymorphicProps<T, AlertProps<T>>) => {
  const [local, others] = splitProps(props as AlertProps, ["class", "variant"])
  return (
    <div
      class={cn(alertVariants({ variant: local.variant }), local.class)}
      data-slot="alert"
      role="alert"
      {...others}
    />
  )
}

type AlertTitleProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
  class?: string | undefined
}

const AlertTitle = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AlertTitleProps<T>>
) => {
  const [local, others] = splitProps(props as AlertTitleProps, ["class"])
  return (
    <div
      class={cn(
        "cn-alert-title [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        local.class
      )}
      data-slot="alert-title"
      {...others}
    />
  )
}

type AlertDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
  class?: string | undefined
}

const AlertDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AlertDescriptionProps<T>>
) => {
  const [local, others] = splitProps(props as AlertDescriptionProps, ["class"])
  return (
    <div
      class={cn(
        "cn-alert-description [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        local.class
      )}
      data-slot="alert-description"
      {...others}
    />
  )
}

type AlertActionProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
  class?: string | undefined
}

const AlertAction = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AlertActionProps<T>>
) => {
  const [local, others] = splitProps(props as AlertActionProps, ["class"])
  return <div class={cn("cn-alert-action", local.class)} data-slot="alert-action" {...others} />
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
