// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps } from "@solidjs/web"
import {
  Calendar as SdkCalendar,
  CalendarPrevious as SdkCalendarPrevious,
  CalendarNext as SdkCalendarNext,
  CalendarHeading as SdkCalendarHeading,
  CalendarGrid as SdkCalendarGrid,
  CalendarWeekday as SdkCalendarWeekday,
  CalendarDay as SdkCalendarDay
} from "@ui-sdk/solid/calendar"
import {
  CalendarWeekdays as SdkCalendarWeekdays,
  CalendarWeeks as SdkCalendarWeeks
} from "@ui-sdk/solid/calendar"
import { omit } from "solid-js"
import { For } from "solid-js"

import { cn } from "~/lib/utils"

export function CalendarRoot(
  props: Omit<ComponentProps<typeof SdkCalendar>, "class"> & { class?: string }
) {
  return <SdkCalendar {...props} class={cn("cn-calendar w-fit", props.class)} />
}

export function CalendarPrevious(
  props: Omit<ComponentProps<typeof SdkCalendarPrevious>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCalendarPrevious
      {...props}
      class={cn(
        "inline-flex size-(--cell-size) items-center justify-center rounded-md hover:bg-muted disabled:opacity-50",
        props.class
      )}
    >
      {props.children ?? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="size-4 rtl:rotate-180"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
    </SdkCalendarPrevious>
  )
}

export function CalendarNext(
  props: Omit<ComponentProps<typeof SdkCalendarNext>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCalendarNext
      {...props}
      class={cn(
        "inline-flex size-(--cell-size) items-center justify-center rounded-md hover:bg-muted disabled:opacity-50",
        props.class
      )}
    >
      {props.children ?? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="size-4 rtl:rotate-180"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </SdkCalendarNext>
  )
}

export function CalendarHeading(
  props: Omit<ComponentProps<typeof SdkCalendarHeading>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCalendarHeading
      {...props}
      class={cn(
        "cn-calendar-caption-label flex-1 text-center text-sm font-medium",
        props.class
      )}
    />
  )
}

export function CalendarGrid(
  props: Omit<ComponentProps<typeof SdkCalendarGrid>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCalendarGrid
      {...props}
      class={cn("w-full border-collapse", props.class)}
    />
  )
}

export function CalendarWeekday(
  props: Omit<ComponentProps<typeof SdkCalendarWeekday>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCalendarWeekday
      {...props}
      class={cn(
        "cn-calendar-weekday h-(--cell-size) font-normal text-muted-foreground",
        props.class
      )}
    />
  )
}

export function CalendarDayButton(
  props: Omit<ComponentProps<typeof SdkCalendarDay>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkCalendarDay
      {...props}
      class={cn(
        "size-(--cell-size) rounded-(--cell-radius) text-center text-sm outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-outside:text-muted-foreground data-range-end:not-data-range-start:rounded-s-none data-range-middle:rounded-none data-range-start:not-data-range-end:rounded-e-none data-today:font-bold data-[selected]:bg-primary data-[selected]:text-primary-foreground data-disabled:opacity-40",
        props.class
      )}
    />
  )
}

export function CalendarMonth(props: { offset?: number }) {
  return (
    <CalendarGrid offset={props.offset ?? 0}>
      <SdkCalendarWeekdays>
        {(index) => <CalendarWeekday index={index} />}
      </SdkCalendarWeekdays>
      <SdkCalendarWeeks>
        {(cell) => <CalendarDayButton value={cell.date} />}
      </SdkCalendarWeeks>
    </CalendarGrid>
  )
}

export function Calendar(props: ComponentProps<typeof CalendarRoot>) {
  const rest = omit(props, "children")
  return (
    <CalendarRoot {...rest}>
      {props.children ?? (
        <>
          <div class="flex items-center">
            <CalendarPrevious />
            <CalendarHeading />
            <CalendarNext />
          </div>
          <div class="flex gap-4">
            <For each={Array.from({ length: props.months ?? 1 }, (_, i) => i)}>
              {(offset) => <CalendarMonth offset={offset} />}
            </For>
          </div>
        </>
      )}
    </CalendarRoot>
  )
}
