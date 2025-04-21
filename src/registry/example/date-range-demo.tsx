import { createMemo, Index } from "solid-js";
import { Portal } from "solid-js/web";

import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from "~/registry/ui/date-picker";

export default function DateRangeDemo() {
  return (
    <DatePicker
      format={(e) => {
        const parsedDate = new Date(Date.parse(e.toString()));

        const normalizedDate = new Date(
          parsedDate.getUTCFullYear(),
          parsedDate.getUTCMonth(),
          parsedDate.getUTCDate(),
        );

        return new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(normalizedDate);
      }}
      numOfMonths={2}
      selectionMode="range"
    >
      <DatePickerControl>
        <DatePickerInput index={0} />
        <DatePickerInput index={1} />
        <DatePickerTrigger />
      </DatePickerControl>
      <Portal>
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerContext>
                {(api) => {
                  const offset = createMemo(() =>
                    api().getOffset({ months: 1 }),
                  );
                  return (
                    <>
                      <DatePickerViewControl>
                        <DatePickerPrevTrigger />
                        <DatePickerViewTrigger>
                          <DatePickerRangeText />
                        </DatePickerViewTrigger>
                        <DatePickerNextTrigger />
                      </DatePickerViewControl>
                      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <DatePickerTable>
                          <DatePickerTableHead>
                            <DatePickerTableRow>
                              <Index each={api().weekDays}>
                                {(weekDay) => (
                                  <DatePickerTableHeader>
                                    {weekDay().short}
                                  </DatePickerTableHeader>
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
                                        <DatePickerTableCellTrigger>
                                          {day().day}
                                        </DatePickerTableCellTrigger>
                                      </DatePickerTableCell>
                                    )}
                                  </Index>
                                </DatePickerTableRow>
                              )}
                            </Index>
                          </DatePickerTableBody>
                        </DatePickerTable>
                        <DatePickerTable>
                          <DatePickerTableHead>
                            <DatePickerTableRow>
                              <Index each={api().weekDays}>
                                {(weekDay) => (
                                  <DatePickerTableHeader>
                                    {weekDay().short}
                                  </DatePickerTableHeader>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          </DatePickerTableHead>
                          <DatePickerTableBody>
                            <Index each={offset().weeks}>
                              {(week) => (
                                <DatePickerTableRow>
                                  <Index each={week()}>
                                    {(day) => (
                                      <DatePickerTableCell
                                        value={day()}
                                        visibleRange={offset().visibleRange}
                                      >
                                        <DatePickerTableCellTrigger>
                                          {day().day}
                                        </DatePickerTableCellTrigger>
                                      </DatePickerTableCell>
                                    )}
                                  </Index>
                                </DatePickerTableRow>
                              )}
                            </Index>
                          </DatePickerTableBody>
                        </DatePickerTable>
                      </div>
                    </>
                  );
                }}
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
                        <Index
                          each={api().getMonthsGrid({
                            columns: 4,
                            format: "short",
                          })}
                        >
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
                        <Index
                          each={api().getYearsGrid({
                            columns: 4,
                          })}
                        >
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
        </DatePickerPositioner>
      </Portal>
    </DatePicker>
  );
}
