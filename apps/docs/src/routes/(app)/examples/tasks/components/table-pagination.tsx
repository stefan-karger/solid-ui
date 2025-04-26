import type { Table } from "@tanstack/solid-table"

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight
} from "@/components/icons"
import { Button } from "@/registry/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

type TablePaginationProps<TData> = {
  table: Table<TData>
}

export function TablePagination<TData>(props: TablePaginationProps<TData>) {
  return (
    <div class="flex items-center justify-between">
      <div class="flex-1 text-sm text-muted-foreground">
        {props.table.getFilteredSelectedRowModel().rows.length} of{" "}
        {props.table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="text-sm font-medium">Rows per page</p>
          <Select
            value={props.table.getState().pagination.pageSize}
            onChange={(value) => value && props.table.setPageSize(value)}
            options={[10, 20, 30, 40, 50]}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger class="h-8 w-[70px]">
              <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div class="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {props.table.getState().pagination.pageIndex + 1} of {props.table.getPageCount()}
        </div>
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            class="hidden size-8 p-0 lg:flex"
            onClick={() => props.table.setPageIndex(0)}
            disabled={!props.table.getCanPreviousPage()}
          >
            <span class="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            class="size-8 p-0"
            onClick={() => props.table.previousPage()}
            disabled={!props.table.getCanPreviousPage()}
          >
            <span class="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            class="size-8 p-0"
            onClick={() => props.table.nextPage()}
            disabled={!props.table.getCanNextPage()}
          >
            <span class="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            class="hidden size-8 p-0 lg:flex"
            onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
            disabled={!props.table.getCanNextPage()}
          >
            <span class="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
