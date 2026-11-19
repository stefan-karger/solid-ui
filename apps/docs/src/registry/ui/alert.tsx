import { type ComponentProps } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

const alertVariants = cva("group/alert cn-alert", {
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

type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>

const Alert = (props: AlertProps) => {
  const others = omit(props, "class", "variant")
  return (
    <div
      class={cn(alertVariants({ variant: props.variant }), props.class)}
      data-slot="alert"
      role="alert"
      {...others}
    />
  )
}

type AlertTitleProps = ComponentProps<"h5">

const AlertTitle = (props: AlertTitleProps) => (
  <h5 data-slot="alert-title" {...props} class={cn("cn-alert-title", props.class)} />
)

type AlertDescriptionProps = ComponentProps<"div">

const AlertDescription = (props: AlertDescriptionProps) => (
  <div data-slot="alert-description" {...props} class={cn("cn-alert-description", props.class)} />
)

type AlertActionProps = ComponentProps<"div">

const AlertAction = (props: AlertActionProps) => (
  <div data-slot="alert-action" {...props} class={cn("cn-alert-action", props.class)} />
)

export {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  alertVariants,
  type AlertActionProps,
  type AlertDescriptionProps,
  type AlertProps,
  type AlertTitleProps
}
