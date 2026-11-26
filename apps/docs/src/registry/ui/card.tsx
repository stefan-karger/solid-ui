import { type ComponentProps } from "@solidjs/web"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type CardProps = ComponentProps<"div"> & {
  size?: "default" | "sm"
}

const Card = (props: CardProps) => {
  const local = merge({ size: "default" } as const, props)
  const others = omit(props, "class", "size")
  return (
    <div
      class={cn("cn-card group/card flex flex-col", local.class)}
      data-size={local.size}
      data-slot="card"
      {...others}
    />
  )
}

const CardHeader = (props: ComponentProps<"div">) => (
  <div
    data-slot="card-header"
    {...props}
    class={cn(
      "cn-card-header group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
      props.class
    )}
  />
)

const CardTitle = (props: ComponentProps<"div">) => (
  <div
    data-slot="card-title"
    {...props}
    class={cn("cn-card-title", props.class)}
  />
)

const CardDescription = (props: ComponentProps<"div">) => (
  <div
    data-slot="card-description"
    {...props}
    class={cn("cn-card-description", props.class)}
  />
)

const CardAction = (props: ComponentProps<"div">) => (
  <div
    data-slot="card-action"
    {...props}
    class={cn(
      "cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end",
      props.class
    )}
  />
)

const CardContent = (props: ComponentProps<"div">) => (
  <div
    data-slot="card-content"
    {...props}
    class={cn("cn-card-content", props.class)}
  />
)

const CardFooter = (props: ComponentProps<"div">) => (
  <div
    data-slot="card-footer"
    {...props}
    class={cn("cn-card-footer flex items-center", props.class)}
  />
)

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps
}
