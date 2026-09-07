import * as CollapsiblePrimitive from "@kobalte/core/collapsible"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { omit } from "solid-js"

type CollapsibleProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleRootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const Collapsible = <T extends ValidComponent = "div">(props: CollapsibleProps<T>) => {
  const others = omit(props as CollapsibleProps, "class")
  return <CollapsiblePrimitive.Root class={props.class} data-slot="collapsible" {...others} />
}

type CollapsibleTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const CollapsibleTrigger = <T extends ValidComponent = "button">(
  props: CollapsibleTriggerProps<T>
) => {
  const others = omit(props as CollapsibleTriggerProps, "class", "children")
  return (
    <CollapsiblePrimitive.Trigger class={props.class} data-slot="collapsible-trigger" {...others}>
      {props.children}
    </CollapsiblePrimitive.Trigger>
  )
}

type CollapsibleContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const CollapsibleContent = <T extends ValidComponent = "div">(
  props: CollapsibleContentProps<T>
) => {
  const others = omit(props as CollapsibleContentProps, "class", "children")
  return (
    <CollapsiblePrimitive.Content class={props.class} data-slot="collapsible-content" {...others}>
      {props.children}
    </CollapsiblePrimitive.Content>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
