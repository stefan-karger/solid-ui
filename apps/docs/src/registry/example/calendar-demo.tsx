import { Index } from "solid-js"

import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerNextTrigger,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger
} from "@/registry/ui/date-picker"

export default function CalendarDemo() {
  return (
    <DatePicker open>
      <DatePickerContent class="shadow-none">
        <DatePickerView view="day">
          <DatePickerContext>
            {(api) => (
              <>
                <DatePickerViewControl>
                  <DatePickerPrevTrigger />
                  <DatePickerViewTrigger>
                    <DatePickerRangeText />
                  </DatePickerViewTrigger>
                  <DatePickerNextTrigger />
                </DatePickerViewControl>
                <DatePickerTable>
                  <DatePickerTableHead>
                    <DatePickerTableRow>
                      <Index each={api().weekDays}>
                        {(weekDay) => (
                          <DatePickerTableHeader>{weekDay().short}</DatePickerTableHeader>
                        )}
                      </Index>
                    </DatePickerTableRow>
                  </DatePickerTableHead>
                  <DatePickerTableBody>
                    <Index each={api().weeks}>
                      {(week) => (
                        <DatePickerTableRow>
                          <Index each={week()}>
                            {(day) => (
                              <DatePickerTableCell value={day()}>
                                <DatePickerTableCellTrigger>{day().day}</DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            )}
                          </Index>
                        </DatePickerTableRow>
                      )}
                    </Index>
                  </DatePickerTableBody>
                </DatePickerTable>
              </>
            )}
          </DatePickerContext>
        </DatePickerView>
        <DatePickerView view="month">
          <DatePickerContext>
            {(api) => (
              <>
                <DatePickerViewControl>
                  <DatePickerPrevTrigger />
                  <DatePickerViewTrigger>
                    <DatePickerRangeText />
                  </DatePickerViewTrigger>
                  <DatePickerNextTrigger />
                </DatePickerViewControl>
                <DatePickerTable>
                  <DatePickerTableBody>
                    <Index each={api().getMonthsGrid({ columns: 4, format: "short" })}>
                      {(months) => (
                        <DatePickerTableRow>
                          <Index each={months()}>
                            {(month) => (
                              <DatePickerTableCell value={month().value}>
                                <DatePickerTableCellTrigger>
                                  {month().label}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            )}
                          </Index>
                        </DatePickerTableRow>
                      )}
                    </Index>
                  </DatePickerTableBody>
                </DatePickerTable>
              </>
            )}
          </DatePickerContext>
        </DatePickerView>
        <DatePickerView view="year">
          <DatePickerContext>
            {(api) => (
              <>
                <DatePickerViewControl>
                  <DatePickerPrevTrigger />
                  <DatePickerViewTrigger>
                    <DatePickerRangeText />
                  </DatePickerViewTrigger>
                  <DatePickerNextTrigger />
                </DatePickerViewControl>
                <DatePickerTable>
                  <DatePickerTableBody>
                    <Index each={api().getYearsGrid({ columns: 4 })}>
                      {(years) => (
                        <DatePickerTableRow>
                          <Index each={years()}>
                            {(year) => (
                              <DatePickerTableCell value={year().value}>
                                <DatePickerTableCellTrigger>
                                  {year().label}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            )}
                          </Index>
                        </DatePickerTableRow>
                      )}
                    </Index>
                  </DatePickerTableBody>
                </DatePickerTable>
              </>
            )}
          </DatePickerContext>
        </DatePickerView>
      </DatePickerContent>
    </DatePicker>
  )
}
