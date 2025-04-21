import type { Table } from "@tanstack/solid-table";

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "~/components/icons";
import { Button } from "~/registry/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/registry/ui/select";

type TablePaginationProps<TData> = {
  table: Table<TData>;
};

export function TablePagination<TData>(props: TablePaginationProps<TData>) {
  return (
    <div class="flex items-center justify-between">
      <div class="flex-1 text-muted-foreground text-sm">
        {props.table.getFilteredSelectedRowModel().rows.length} of{" "}
        {props.table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="font-medium text-sm">Rows per page</p>
          <Select
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
            onChange={(value) => value && props.table.setPageSize(value)}
            options={[10, 20, 30, 40, 50]}
            value={props.table.getState().pagination.pageSize}
          >
            <SelectTrigger class="h-8 w-[70px]">
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div class="flex w-[100px] items-center justify-center font-medium text-sm">
          Page {props.table.getState().pagination.pageIndex + 1} of{" "}
          {props.table.getPageCount()}
        </div>
        <div class="flex items-center space-x-2">
          <Button
            class="hidden size-8 p-0 lg:flex"
            disabled={!props.table.getCanPreviousPage()}
            onClick={() => props.table.setPageIndex(0)}
            variant="outline"
          >
            <span class="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            class="size-8 p-0"
            disabled={!props.table.getCanPreviousPage()}
            onClick={() => props.table.previousPage()}
            variant="outline"
          >
            <span class="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            class="size-8 p-0"
            disabled={!props.table.getCanNextPage()}
            onClick={() => props.table.nextPage()}
            variant="outline"
          >
            <span class="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            class="hidden size-8 p-0 lg:flex"
            disabled={!props.table.getCanNextPage()}
            onClick={() =>
              props.table.setPageIndex(props.table.getPageCount() - 1)
            }
            variant="outline"
          >
            <span class="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
