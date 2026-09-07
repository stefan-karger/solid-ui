import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as TabsPrimitive from "@kobalte/core/tabs"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type TabsProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsPrimitive.TabsRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const Tabs = <T extends ValidComponent = "div">(props: TabsProps<T>) => {
  const others = omit(props as TabsProps, "class", "orientation")
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={props.orientation ?? "horizontal"}
      orientation={props.orientation ?? "horizontal"}
      class={cn("group/tabs cn-tabs flex data-[orientation=horizontal]:flex-col", props.class)}
      {...others}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list cn-tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "cn-tabs-list-variant-default bg-muted",
        line: "cn-tabs-list-variant-line gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type TabsListProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsPrimitive.TabsListProps<T>
> &
  VariantProps<typeof tabsListVariants> &
  Pick<ComponentProps<T>, "class" | "children">

const TabsList = <T extends ValidComponent = "div">(props: TabsListProps<T>) => {
  const others = omit(props as TabsListProps, "variant", "class")
  const variant = () => props.variant ?? "default"
  return (
    <TabsPrimitive.List
      class={cn(tabsListVariants({ variant: variant() }), props.class)}
      data-slot="tabs-list"
      data-variant={variant()}
      {...others}
    />
  )
}

type TabTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  TabsPrimitive.TabsTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const TabsTrigger = <T extends ValidComponent = "button">(props: TabTriggerProps<T>) => {
  const others = omit(props as TabTriggerProps, "class")
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      class={cn(
        "cn-tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-selected:bg-transparent dark:group-data-[variant=line]/tabs-list:data-selected:border-transparent dark:group-data-[variant=line]/tabs-list:data-selected:bg-transparent",
        "data-selected:bg-background data-selected:text-foreground dark:data-selected:border-input dark:data-selected:bg-input/30 dark:data-selected:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-1.25 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-selected:after:opacity-100",
        props.class
      )}
      {...others}
    />
  )
}

type TabsContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsPrimitive.TabsContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const TabsContent = <T extends ValidComponent = "div">(props: TabsContentProps<T>) => {
  const others = omit(props as TabsContentProps, "class")
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      class={cn("cn-tabs-content flex-1 outline-none", props.class)}
      {...others}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
