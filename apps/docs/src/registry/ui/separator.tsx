import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as SeparatorPrimitive from "@kobalte/core/separator"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type SeparatorProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SeparatorPrimitive.SeparatorRootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const Separator = <T extends ValidComponent = "div">(props: SeparatorProps<T>) => {
  const others = omit(props as SeparatorProps, "as", "class", "orientation")
  return (
    <SeparatorPrimitive.Separator
      as={props.as ?? "div"}
      data-slot="separator"
      orientation={props.orientation ?? "horizontal"}
      class={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        props.class
      )}
      {...others}
    />
  )
}

export { Separator, type SeparatorProps }
