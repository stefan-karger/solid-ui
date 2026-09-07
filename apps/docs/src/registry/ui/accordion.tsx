import * as AccordionPrimitive from "@kobalte/core/accordion"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { ChevronDownIcon } from "lucide-solid"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type AccordionProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  AccordionPrimitive.AccordionRootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const Accordion = <T extends ValidComponent = "div">(props: AccordionProps<T>) => {
  const others = omit(props as AccordionProps, "class")
  return (
    <AccordionPrimitive.Root
      class={cn("cn-accordion flex w-full flex-col", props.class)}
      data-slot="accordion"
      {...others}
    />
  )
}

type AccordionItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  AccordionPrimitive.AccordionItemProps
> &
  Pick<ComponentProps<T>, "class">

const AccordionItem = <T extends ValidComponent = "div">(props: AccordionItemProps<T>) => {
  const others = omit(props as AccordionItemProps, "class")
  return (
    <AccordionPrimitive.Item
      class={cn("cn-accordion-item", props.class)}
      data-slot="accordion-item"
      {...others}
    />
  )
}

type AccordionTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  AccordionPrimitive.AccordionTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const AccordionTrigger = <T extends ValidComponent = "button">(props: AccordionTriggerProps<T>) => {
  const others = omit(props as AccordionTriggerProps, "class", "children")
  return (
    <AccordionPrimitive.Header class="flex" data-slot="accordion-header">
      <AccordionPrimitive.Trigger
        class={cn(
          "group/accordion-trigger cn-accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
          props.class
        )}
        data-slot="accordion-trigger"
        {...others}
      >
        {props.children}
        <ChevronDownIcon
          class="cn-accordion-trigger-icon pointer-events-none shrink-0 duration-300 group-aria-expanded/accordion-trigger:rotate-180"
          data-slot="accordion-trigger-icon"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  AccordionPrimitive.AccordionContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const AccordionContent = <T extends ValidComponent = "div">(props: AccordionContentProps<T>) => {
  const others = omit(props as AccordionContentProps, "class", "children")
  return (
    <AccordionPrimitive.Content
      class="cn-accordion-content overflow-hidden"
      data-slot="accordion-content"
      {...others}
    >
      <div
        class={cn(
          "cn-accordion-content-inner h-(--kb-collapsible-content-height) [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          props.class
        )}
        data-slot="accordion-content-inner"
      >
        {props.children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
