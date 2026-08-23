import type { ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as TabsPrimitive from "@kobalte/core/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

type TabsProps<T extends ValidComponent = "div"> = TabsPrimitive.TabsRootProps<T> & {
  class?: string | undefined
}

const Tabs = <T extends ValidComponent = "div">(rawProps: PolymorphicProps<T, TabsProps<T>>) => {
  const props = mergeProps<TabsProps[]>({ orientation: "horizontal" }, rawProps)
  const [local, others] = splitProps(props, ["class", "orientation"])
  return (
    <TabsPrimitive.Root
      class={cn(
        "cn-tabs group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        local.class
      )}
      data-orientation={local.orientation}
      data-slot="tabs"
      orientation={local.orientation}
      {...others}
    />
  )
}

const tabsListVariants = cva(
  "cn-tabs-list group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground data-[variant=line]:rounded-none group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type TabsListProps<T extends ValidComponent = "div"> = TabsPrimitive.TabsListProps<T> &
  VariantProps<typeof tabsListVariants> & { class?: string | undefined }

const TabsList = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, TabsListProps<T>>
) => {
  const props = mergeProps({ variant: "default" }, rawProps)
  const [local, others] = splitProps(props, ["class", "variant"])
  return (
    <TabsPrimitive.List
      class={cn(tabsListVariants({ variant: local.variant }), local.class)}
      data-slot="tabs-list"
      data-variant={local.variant}
      {...others}
    />
  )
}

type TabsTriggerProps<T extends ValidComponent = "button"> = TabsPrimitive.TabsTriggerProps<T> & {
  class?: string | undefined
}

const TabsTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, TabsTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as TabsTriggerProps, ["class"])
  return (
    <TabsPrimitive.Trigger
      class={cn(
        "cn-tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-foreground/60 text-sm transition-all hover:text-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start group-data-[variant=default]/tabs-list:data-[selected]:shadow-sm group-data-[variant=line]/tabs-list:data-[selected]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[selected]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[selected]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[selected]:bg-transparent",
        "data-[selected]:bg-background data-[selected]:text-foreground dark:data-[selected]:border-input dark:data-[selected]:bg-input/30 dark:data-[selected]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[selected]:after:opacity-100",
        local.class
      )}
      data-slot="tabs-trigger"
      {...others}
    />
  )
}

type TabsContentProps<T extends ValidComponent = "div"> = TabsPrimitive.TabsContentProps<T> & {
  class?: string | undefined
}

const TabsContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TabsContentProps<T>>
) => {
  const [local, others] = splitProps(props as TabsContentProps, ["class"])
  return (
    <TabsPrimitive.Content
      class={cn("cn-tabs-content flex-1 outline-none", local.class)}
      data-slot="tabs-content"
      {...others}
    />
  )
}

type TabsIndicatorProps<T extends ValidComponent = "div"> = TabsPrimitive.TabsIndicatorProps<T> & {
  class?: string | undefined
}

const TabsIndicator = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TabsIndicatorProps<T>>
) => {
  const [local, others] = splitProps(props as TabsIndicatorProps, ["class"])
  return (
    <TabsPrimitive.Indicator
      class={cn(
        "cn-tabs-indicator absolute bg-background transition-all duration-250ms data-[orientation=vertical]:-right-px data-[orientation=horizontal]:-bottom-px data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
        local.class
      )}
      {...others}
    />
  )
}

export { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger }
