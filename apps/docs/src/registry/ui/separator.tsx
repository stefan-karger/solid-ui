import { type ComponentProps } from "@solidjs/web"
import { Separator as SdkSeparator } from "@ui-sdk/solid/separator"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
type SeparatorProps = Omit<ComponentProps<typeof SdkSeparator>, "class"> & {
  class?: string
  "data-slot"?: string
}
const Separator = (props: SeparatorProps) => {
  const others = omit(props, "render", "data-slot")
  const renderSeparator: SeparatorProps["render"] = (part, state) => {
    const attributes = merge(part, () => ({
      "data-slot": props["data-slot"] ?? "separator"
    }))
    return props.render ? (
      props.render(attributes, state)
    ) : (
      <div {...attributes} />
    )
  }
  return (
    <SdkSeparator
      {...others}
      orientation={props.orientation ?? "horizontal"}
      class={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        props.class
      )}
      render={renderSeparator}
    />
  )
}
export { Separator, type SeparatorProps }
