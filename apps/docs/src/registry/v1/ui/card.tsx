import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const Card: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        local.class
      )}
      data-slot="card"
      {...others}
    />
  )
}

const CardHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        local.class
      )}
      data-slot="card-header"
      {...others}
    />
  )
}

const CardTitle: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div class={cn("font-semibold leading-none", local.class)} data-slot="card-title" {...others} />
  )
}

const CardDescription: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("text-muted-foreground text-sm", local.class)}
      data-slot="card-description"
      {...others}
    />
  )
}

const CardAction: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", local.class)}
      data-slot="card-action"
      {...others}
    />
  )
}

const CardContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <div class={cn("px-6", local.class)} data-slot="card-content" {...others} />
}

const CardFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex items-center px-6 [.border-t]:pt-6", local.class)}
      data-slot="card-footer"
      {...others}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
