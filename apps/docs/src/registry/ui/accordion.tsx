import type { JSX, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as AccordionPrimitive from "@kobalte/core/accordion"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { ChevronDown } from "lucide-solid"

import { cn } from "~/lib/utils"

type AccordionProps<T extends ValidComponent = "div"> = AccordionPrimitive.AccordionRootProps<T> & {
  class?: string | undefined
}

const Accordion = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionProps<T>>
) => {
  const [local, others] = splitProps(props as AccordionProps, ["class"])
  return (
    <AccordionPrimitive.Root
      class={cn("cn-accordion flex w-full flex-col", local.class)}
      data-slot="accordion"
      {...others}
    />
  )
}

type AccordionItemProps<T extends ValidComponent = "div"> =
  AccordionPrimitive.AccordionItemProps<T> & {
    class?: string | undefined
  }

const AccordionItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionItemProps<T>>
) => {
  const [local, others] = splitProps(props as AccordionItemProps, ["class"])
  return (
    <AccordionPrimitive.Item
      class={cn("cn-accordion-item", local.class)}
      data-slot="accordion-item"
      {...others}
    />
  )
}

type AccordionTriggerProps<T extends ValidComponent = "button"> =
  AccordionPrimitive.AccordionTriggerProps<T> & {
    class?: string | undefined
    children?: JSX.Element | undefined
  }

const AccordionTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AccordionTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as AccordionTriggerProps, ["class", "children"])
  return (
    <AccordionPrimitive.Header class="flex" data-slot="accordion-header">
      <AccordionPrimitive.Trigger
        class={cn(
          "cn-accordion-trigger group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent outline-none transition-all disabled:pointer-events-none disabled:opacity-50",
          local.class
        )}
        data-slot="accordion-trigger"
        {...others}
      >
        {local.children}
        <ChevronDown
          class="cn-accordion-trigger-icon pointer-events-none shrink-0 duration-300 group-aria-expanded/accordion-trigger:rotate-180"
          data-slot="accordion-trigger-icon"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps<T extends ValidComponent = "div"> =
  AccordionPrimitive.AccordionContentProps<T> & {
    class?: string | undefined
    children?: JSX.Element | undefined
  }

const AccordionContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionContentProps<T>>
) => {
  const [local, others] = splitProps(props as AccordionContentProps, ["class", "children"])
  return (
    <AccordionPrimitive.Content
      class="cn-accordion-content overflow-hidden"
      data-slot="accordion-content"
      {...others}
    >
      <div
        class={cn(
          "cn-accordion-content-inner h-(--kb-collapsible-content-height) [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          local.class
        )}
        data-slot="accordion-content-inner"
      >
        {local.children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
