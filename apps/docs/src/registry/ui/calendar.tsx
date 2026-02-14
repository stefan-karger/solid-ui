import type { Component, ComponentProps, JSX } from "solid-js"
import { Show, splitProps, type ValidComponent } from "solid-js"

import type {
  CellProps,
  CellTriggerProps,
  DynamicProps,
  HeadCellProps,
  LabelProps,
  NavProps,
  TableProps
} from "@corvu/calendar"
import CalendarPrimitive, { Root as CalendarPrimitiveRoot } from "@corvu/calendar"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/registry/ui/button"

const Calendar = CalendarPrimitiveRoot

const CalendarHead: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("relative flex w-full items-center justify-between pt-1 pb-4", local.class)}
      {...others}
    />
  )
}

type CalendarTriggerProps<T extends ValidComponent = "button"> = Omit<NavProps<T>, "action"> & {
  class?: string | undefined
  children?: JSX.Element
}

const CalendarPrevTrigger = <T extends ValidComponent = "button">(
  props: DynamicProps<T, CalendarTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as CalendarTriggerProps, ["class", "children"])
  return (
    <CalendarPrimitive.Nav
      action="prev-month"
      aria-label="Go to previous month"
      class={cn(
        buttonVariants({ variant: "outline" }),
        "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        local.class
      )}
      {...others}
    >
      <Show
        fallback={
          <svg
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 6l-6 6l6 6" />
          </svg>
        }
        when={local.children}
      >
        {(children) => children()}
      </Show>
    </CalendarPrimitive.Nav>
  )
}

const CalendarNextTrigger = <T extends ValidComponent = "button">(
  props: DynamicProps<T, CalendarTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as CalendarTriggerProps, ["class", "children"])
  return (
    <CalendarPrimitive.Nav
      action="next-month"
      aria-label="Go to next month"
      class={cn(
        buttonVariants({ variant: "outline" }),
        "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        local.class
      )}
      {...others}
    >
      <Show
        fallback={
          <svg
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 6l6 6l-6 6" />
          </svg>
        }
        when={local.children}
      >
        {(children) => children()}
      </Show>
    </CalendarPrimitive.Nav>
  )
}

type CalendarHeadingProps<T extends ValidComponent = "h2"> = LabelProps<T> & {
  class?: string | undefined
  children?: JSX.Element
}

const CalendarHeading = <T extends ValidComponent = "h2">(
  props: DynamicProps<T, CalendarHeadingProps<T>>
) => {
  const [local, others] = splitProps(props as CalendarHeadingProps, ["class", "children"])
  const ctx = CalendarPrimitive.useContext()
  const formatMonth = () =>
    new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(ctx.month())
  return (
    <CalendarPrimitive.Label
      class={cn("font-medium text-foreground text-sm", local.class)}
      {...others}
    >
      {local.children ?? formatMonth()}
    </CalendarPrimitive.Label>
  )
}

type CalendarGridProps<T extends ValidComponent = "table"> = TableProps<T> & {
  class?: string | undefined
}

const CalendarGrid = <T extends ValidComponent = "table">(
  props: DynamicProps<T, CalendarGridProps<T>>
) => {
  const [local, others] = splitProps(props as CalendarGridProps, ["class"])
  return (
    <CalendarPrimitive.Table
      class={cn("w-full border-collapse space-x-1", local.class)}
      {...others}
    />
  )
}

const CalendarGridHead: Component<ComponentProps<"thead">> = (props) => <thead {...props} />

const CalendarGridHeadRow: Component<ComponentProps<"tr">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <tr class={cn("flex", local.class)} {...others} />
}

type CalendarGridHeadCellProps<T extends ValidComponent = "th"> = HeadCellProps<T> & {
  class?: string | undefined
}

const CalendarGridHeadCell = <T extends ValidComponent = "th">(
  props: DynamicProps<T, CalendarGridHeadCellProps<T>>
) => {
  const [local, others] = splitProps(props as CalendarGridHeadCellProps, ["class"])
  return (
    <CalendarPrimitive.HeadCell
      class={cn("w-8 rounded-md font-normal text-[0.8rem] text-muted-foreground", local.class)}
      {...others}
    />
  )
}

const CalendarGridBody: Component<ComponentProps<"tbody">> = (props) => <tbody {...props} />

const CalendarGridBodyRow: Component<ComponentProps<"tr">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <tr class={cn("mt-2 flex w-full", local.class)} {...others} />
}

type CalendarGridBodyCellProps<T extends ValidComponent = "td"> = CellProps<T> & {
  class?: string | undefined
}

const CalendarGridBodyCell = <T extends ValidComponent = "td">(
  props: DynamicProps<T, CalendarGridBodyCellProps<T>>
) => {
  const [local, others] = splitProps(props as CalendarGridBodyCellProps, ["class"])
  return (
    <CalendarPrimitive.Cell
      class={cn(
        "p-0 has-data-range-end:rounded-r-md has-data-range-start:rounded-l-md has-data-in-range:bg-accent has-[[disabled]]:opacity-40 has-data-in-range:last:rounded-r-md has-data-in-range:first:rounded-l-md",
        local.class
      )}
      {...others}
    />
  )
}

type CalendarGridBodyCellTriggerProps<T extends ValidComponent = "button"> = CellTriggerProps<T> & {
  class?: string | undefined
}

const CalendarGridBodyCellTrigger = <T extends ValidComponent = "button">(
  props: DynamicProps<T, CalendarGridBodyCellTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as CalendarGridBodyCellTriggerProps, ["class"])

  const ctx = CalendarPrimitive.useContext()
  return (
    <CalendarPrimitive.CellTrigger
      class={cn(
        buttonVariants({ variant: "ghost" }),
        "size-8 p-0 font-normal hover:not-data-range-start:not-data-range-end:bg-primary hover:not-data-range-start:not-data-range-end:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground disabled:pointer-events-none disabled:text-muted-foreground disabled:opacity-50 aria-selected:opacity-100 data-range-end:bg-primary data-range-start:bg-primary data-today:bg-accent data-range-end:text-primary-foreground data-range-start:text-primary-foreground data-today:text-accent-foreground",
        ctx.mode() === "single" && "data-selected:bg-primary data-selected:text-primary-foreground",
        local.class
      )}
      {...others}
    />
  )
}

export {
  Calendar,
  CalendarHead,
  CalendarPrevTrigger,
  CalendarNextTrigger,
  CalendarHeading,
  CalendarGrid,
  CalendarGridHead,
  CalendarGridHeadRow,
  CalendarGridHeadCell,
  CalendarGridBody,
  CalendarGridBodyRow,
  CalendarGridBodyCell,
  CalendarGridBodyCellTrigger
}
