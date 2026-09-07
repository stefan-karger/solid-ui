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

const AlertTitle = (props: AlertTitleProps) => {
  const others = omit(props, "class")
  return <h5 class={cn("cn-alert-title", props.class)} data-slot="alert-title" {...others} />
}

type AlertDescriptionProps = ComponentProps<"div">

const AlertDescription = (props: AlertDescriptionProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn("cn-alert-description", props.class)}
      data-slot="alert-description"
      {...others}
    />
  )
}

type AlertActionProps = ComponentProps<"div">

const AlertAction = (props: AlertActionProps) => {
  const others = omit(props, "class")
  return <div class={cn("cn-alert-action", props.class)} data-slot="alert-action" {...others} />
}

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
