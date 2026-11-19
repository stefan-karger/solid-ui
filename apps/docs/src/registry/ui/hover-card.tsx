type HoverCardProps = ComponentProps<typeof SdkHoverCard>
import { type ComponentProps } from "@solidjs/web"
import {
  HoverCard as SdkHoverCard,
  HoverCardTrigger as SdkHoverCardTrigger,
  HoverCardContent as SdkHoverCardContent
} from "@ui-sdk/solid/hover-card"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
const HoverCard = (props: HoverCardProps) => <SdkHoverCard {...props} />
type HoverCardTriggerProps = Omit<ComponentProps<typeof SdkHoverCardTrigger>, "class"> & {
  class?: string
}
const HoverCardTrigger = (props: HoverCardTriggerProps) => <SdkHoverCardTrigger {...props} />
type HoverCardContentProps = Omit<ComponentProps<typeof SdkHoverCardContent>, "class"> & {
  class?: string
}
const HoverCardContent = (props: HoverCardContentProps) => {
  const others = omit(props, "class", "children")
  return (
    <>
      <SdkHoverCardContent
        class={cn(
          "cn-hover-card-content z-50 origin-(--transform-origin) outline-hidden",
          props.class
        )}
        {...others}
      >
        {props.children}
      </SdkHoverCardContent>
    </>
  )
}
export { HoverCard, HoverCardContent, HoverCardTrigger }
