import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const Kbd: Component<ComponentProps<"kbd">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <kbd class={cn("cn-kbd", local.class)} data-slot="kbd" {...others} />
}

const KbdGroup: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <span class={cn("cn-kbd-group", local.class)} data-slot="kbd-group" {...others} />
}

export { Kbd, KbdGroup }
