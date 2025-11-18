import type { JSX, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as AccordionPrimitive from "@kobalte/core/accordion"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

const Accordion = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionPrimitive.AccordionRootProps<T>>
) => {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
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
      class={cn("border-b last:border-b-0", local.class)}
      data-slot="accordion-item"
      {...others}
    />
  )
}

type AccordionTriggerProps<T extends ValidComponent = "button"> =
  AccordionPrimitive.AccordionTriggerProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const AccordionTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AccordionTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as AccordionTriggerProps, ["class", "children"])
  return (
    <AccordionPrimitive.Header class="flex">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-expanded]>svg]:rotate-180",
          local.class
        )}
        data-slot="accordion-trigger"
        {...others}
      >
        {local.children}
        <svg
          class="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps<T extends ValidComponent = "div"> =
  AccordionPrimitive.AccordionContentProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const AccordionContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionContentProps<T>>
) => {
  const [local, others] = splitProps(props as AccordionContentProps, ["class", "children"])
  return (
    <AccordionPrimitive.Content
      class="overflow-hidden text-sm data-[closed]:animate-accordion-up data-[expanded]:animate-accordion-down"
      data-slot="accordion-content"
      {...others}
    >
      <div class={cn("pt-0 pb-4", local.class)}>{local.children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
