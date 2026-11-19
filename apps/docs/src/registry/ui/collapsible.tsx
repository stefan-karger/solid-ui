import { type ComponentProps } from "@solidjs/web"
import {
  Collapsible as SdkCollapsible,
  CollapsibleTrigger as SdkCollapsibleTrigger,
  CollapsiblePanel as SdkCollapsiblePanel
} from "@ui-sdk/solid/collapsible"
import { omit } from "solid-js"
type CollapsibleProps = Omit<ComponentProps<typeof SdkCollapsible>, "class"> & {
  class?: string
}
const Collapsible = (props: CollapsibleProps) => <SdkCollapsible {...props} class={props.class} />
type CollapsibleTriggerProps = Omit<ComponentProps<typeof SdkCollapsibleTrigger>, "class"> & {
  class?: string
}
const CollapsibleTrigger = (props: CollapsibleTriggerProps) => {
  const others = omit(props, "class", "children")
  return (
    <SdkCollapsibleTrigger class={props.class} {...others}>
      {props.children}
    </SdkCollapsibleTrigger>
  )
}
type CollapsibleContentProps = Omit<ComponentProps<typeof SdkCollapsiblePanel>, "class"> & {
  class?: string
}
const CollapsibleContent = (props: CollapsibleContentProps) => {
  const others = omit(props, "class", "children")
  return (
    <SdkCollapsiblePanel class={props.class} {...others}>
      {props.children}
    </SdkCollapsiblePanel>
  )
}
export { Collapsible, CollapsibleContent, CollapsibleTrigger }
