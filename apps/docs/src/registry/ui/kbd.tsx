import { type ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type KbdProps = ComponentProps<"kbd">

const Kbd = (props: KbdProps) => {
  const others = omit(props, "class")
  return (
    <kbd
      class={cn(
        "cn-kbd pointer-events-none inline-flex items-center justify-center select-none",
        props.class
      )}
      data-slot="kbd"
      {...others}
    />
  )
}

type KbdGroupProps = ComponentProps<"div">

const KbdGroup = (props: KbdGroupProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn("cn-kbd-group inline-flex items-center", props.class)}
      data-slot="kbd-group"
      {...others}
    />
  )
}

export { Kbd, KbdGroup, type KbdProps, type KbdGroupProps }
