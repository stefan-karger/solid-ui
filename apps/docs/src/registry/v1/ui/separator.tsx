import type { ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as SeparatorPrimitive from "@kobalte/core/separator"

import { cn } from "~/lib/utils"

type SeparatorRootProps<T extends ValidComponent = "hr"> =
  SeparatorPrimitive.SeparatorRootProps<T> & { class?: string | undefined }

const Separator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, SeparatorRootProps<T>>
) => {
  const [local, others] = splitProps(props as SeparatorRootProps, ["class", "orientation"])
  return (
    <SeparatorPrimitive.Root
      class={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        local.class
      )}
      data-slot="separator"
      orientation={local.orientation ?? "horizontal"}
      {...others}
    />
  )
}

export { Separator }
