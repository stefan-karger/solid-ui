import type { JSX } from "@solidjs/web"
import { type ComponentProps } from "@solidjs/web"
import {
  Accordion as SdkAccordion,
  AccordionItem as SdkAccordionItem,
  AccordionHeader as SdkAccordionHeader,
  AccordionTrigger as SdkAccordionTrigger,
  AccordionPanel as SdkAccordionPanel
} from "@ui-sdk/solid/accordion"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
type AccordionProps = Omit<
  ComponentProps<typeof SdkAccordion>,
  "class" | "children"
> & {
  children?: JSX.Element
  class?: string
}
const Accordion = (props: AccordionProps) => (
  <SdkAccordion
    {...props}
    class={cn("cn-accordion flex w-full flex-col", props.class)}
  />
)
type AccordionItemProps = Omit<
  ComponentProps<typeof SdkAccordionItem>,
  "class" | "children"
> & {
  children?: JSX.Element
  class?: string
}
const AccordionItem = (props: AccordionItemProps) => (
  <SdkAccordionItem {...props} class={cn("cn-accordion-item", props.class)} />
)
type AccordionTriggerProps = Omit<
  ComponentProps<typeof SdkAccordionTrigger>,
  "class" | "children"
> & { children?: JSX.Element; class?: string }
const AccordionTrigger = (props: AccordionTriggerProps) => {
  const others = omit(props, "class", "children", "render")
  const renderTrigger: AccordionTriggerProps["render"] = (part, state) => {
    const attributes = merge(part, () => ({
      tabindex: state.disabled ? -1 : part.tabindex
    }))
    return props.render ? (
      props.render(attributes, state)
    ) : (
      <button {...attributes} />
    )
  }
  return (
    <SdkAccordionHeader class="flex">
      <SdkAccordionTrigger
        class={cn(
          "group/accordion-trigger cn-accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
          props.class
        )}
        {...others}
        render={renderTrigger}
      >
        {props.children}
        <IconPlaceholder
          lucide="ChevronDownIcon"
          class="cn-accordion-trigger-icon pointer-events-none shrink-0 duration-300 group-aria-expanded/accordion-trigger:rotate-180"
          data-slot="accordion-trigger-icon"
        />
      </SdkAccordionTrigger>
    </SdkAccordionHeader>
  )
}
type AccordionContentProps = Omit<
  ComponentProps<typeof SdkAccordionPanel>,
  "class" | "children"
> & { children?: JSX.Element; class?: string }
const AccordionContent = (props: AccordionContentProps) => {
  const others = omit(props, "class", "children")
  return (
    <SdkAccordionPanel class="cn-accordion-content overflow-hidden" {...others}>
      <div
        class={cn(
          "cn-accordion-content-inner h-(--accordion-panel-height) [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          props.class
        )}
        data-slot="accordion-content-inner"
      >
        {props.children}
      </div>
    </SdkAccordionPanel>
  )
}
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
