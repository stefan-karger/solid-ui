import { type ComponentProps } from "@solidjs/web"

import { cn } from "~/lib/utils"

type KbdProps = ComponentProps<"kbd">

const Kbd = (props: KbdProps) => (
  <kbd
    data-slot="kbd"
    {...props}
    class={cn(
      "cn-kbd pointer-events-none inline-flex items-center justify-center select-none",
      props.class
    )}
  />
)

type KbdGroupProps = ComponentProps<"span">

const KbdGroup = (props: KbdGroupProps) => (
  <span
    data-slot="kbd-group"
    {...props}
    class={cn("cn-kbd-group inline-flex items-center", props.class)}
  />
)

export { Kbd, KbdGroup, type KbdGroupProps, type KbdProps }
