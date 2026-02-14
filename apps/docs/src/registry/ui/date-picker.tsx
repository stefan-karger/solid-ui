import type { Component, ComponentProps, JSX, ParentComponent } from "solid-js"
import { For, Show, splitProps } from "solid-js"

import type { RootProps as CalendarRootProps, RootChildrenProps } from "@corvu/calendar"
import * as PopoverPrimitive from "@kobalte/core/popover"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import {
  Calendar,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridBodyCell,
  CalendarGridBodyCellTrigger,
  CalendarGridBodyRow,
  CalendarGridHead,
  CalendarGridHeadCell,
  CalendarGridHeadRow,
  CalendarHead,
  CalendarHeading,
  CalendarNextTrigger,
  CalendarPrevTrigger
} from "~/registry/ui/calendar"

const DatePicker: Component<PopoverPrimitive.PopoverRootProps> = (props) => (
  <PopoverPrimitive.Root data-slot="date-picker" gutter={4} {...props} />
)

const DatePickerTrigger: ParentComponent<PopoverPrimitive.PopoverTriggerProps> = (props) => (
  <PopoverPrimitive.Trigger data-slot="date-picker-trigger" {...props} />
)

type DatePickerInputProps = ComponentProps<"button"> & {
  placeholder?: string
}

const DatePickerInput: Component<DatePickerInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "placeholder"])
  return (
    <button
      class={cn(
        "flex h-9 w-full min-w-[240px] items-center justify-start gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-left text-base shadow-xs outline-none transition-[color,box-shadow] md:text-sm",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      data-slot="date-picker-input"
      {...others}
    >
      <svg
        class="size-4 shrink-0 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
      <Show
        fallback={<span class="text-muted-foreground">{local.placeholder ?? "Pick a date"}</span>}
        when={local.children}
      >
        {local.children}
      </Show>
    </button>
  )
}

type DatePickerContentProps = ComponentProps<typeof PopoverPrimitive.Content> & {
  class?: string | undefined
  children?: JSX.Element
}

const DatePickerContent: Component<DatePickerContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 origin-(--kb-popover-content-transform-origin) rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-hidden data-[closed]:animate-out data-[expanded]:animate-in",
          local.class
        )}
        data-slot="date-picker-content"
        {...others}
      >
        {local.children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

type DatePickerCalendarProps = Omit<CalendarRootProps, "children"> & {
  class?: string | undefined
}

const DatePickerCalendar: Component<DatePickerCalendarProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div class={cn("p-3", local.class)} data-slot="date-picker-calendar">
      <Calendar {...(others as CalendarRootProps)}>
        {(calendarProps: RootChildrenProps) => (
          <>
            <CalendarHead>
              <CalendarPrevTrigger />
              <CalendarHeading />
              <CalendarNextTrigger />
            </CalendarHead>
            <CalendarGrid>
              <CalendarGridHead>
                <CalendarGridHeadRow>
                  <For each={calendarProps.weekdays}>
                    {(weekday) => (
                      <CalendarGridHeadCell>
                        {weekday.toLocaleDateString("en", { weekday: "short" }).slice(0, 2)}
                      </CalendarGridHeadCell>
                    )}
                  </For>
                </CalendarGridHeadRow>
              </CalendarGridHead>
              <CalendarGridBody>
                <For each={calendarProps.weeks}>
                  {(week) => (
                    <CalendarGridBodyRow>
                      <For each={week}>
                        {(day) => (
                          <CalendarGridBodyCell>
                            <CalendarGridBodyCellTrigger day={day}>
                              {day.getDate()}
                            </CalendarGridBodyCellTrigger>
                          </CalendarGridBodyCell>
                        )}
                      </For>
                    </CalendarGridBodyRow>
                  )}
                </For>
              </CalendarGridBody>
            </CalendarGrid>
          </>
        )}
      </Calendar>
    </div>
  )
}

type DatePickerPresetsProps = ComponentProps<"div">

const DatePickerPresets: Component<DatePickerPresetsProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex flex-col gap-1 border-l p-3", local.class)}
      data-slot="date-picker-presets"
      {...others}
    />
  )
}

type DatePickerPresetProps = Omit<ComponentProps<typeof Button>, "variant" | "size">

const DatePickerPreset: Component<DatePickerPresetProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Button
      class={cn("justify-start", local.class)}
      data-slot="date-picker-preset"
      size="sm"
      variant="ghost"
      {...others}
    />
  )
}

function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(
    "en-US",
    options ?? { month: "long", day: "numeric", year: "numeric" }
  ).format(date)
}

function formatDateRange(
  from: Date | null,
  to: Date | null,
  options?: Intl.DateTimeFormatOptions
): string {
  const fmt = options ?? { month: "long", day: "numeric", year: "numeric" }
  if (from && to) {
    return `${new Intl.DateTimeFormat("en-US", fmt).format(from)} - ${new Intl.DateTimeFormat("en-US", fmt).format(to)}`
  }
  if (from) {
    return new Intl.DateTimeFormat("en-US", fmt).format(from)
  }
  return ""
}

export {
  DatePicker,
  DatePickerTrigger,
  DatePickerInput,
  DatePickerContent,
  DatePickerCalendar,
  DatePickerPresets,
  DatePickerPreset,
  formatDate,
  formatDateRange
}
