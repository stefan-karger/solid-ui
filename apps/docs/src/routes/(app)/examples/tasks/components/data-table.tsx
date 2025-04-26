import { createSignal, For, Show } from "solid-js"
import { createAsync, query } from "@solidjs/router"

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from "@tanstack/solid-table"
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/solid-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

import { TablePagination } from "./table-pagination"
import { TableToolbar } from "./table-toolbar"

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const getData = query(async () => {
  "use server"
  // Fetch data from your api
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com"
    }
    // ...
  ]
}, "getData")

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = createSignal({})
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>({})
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([])
  const [sorting, setSorting] = createSignal<SortingState>([])

  const data = createAsync(() => getData())

  const table = createSolidTable({
    get data() {
      return props.data
    },
    get columns() {
      return props.columns
    },
    state: {
      get sorting() {
        return sorting()
      },
      get columnVisibility() {
        return columnVisibility()
      },
      get rowSelection() {
        return rowSelection()
      },
      get columnFilters() {
        return columnFilters()
      }
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  return (
    <div class="space-y-4">
      <TableToolbar table={table} />
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <TableHead colSpan={header.colSpan}>
                        <Show when={!header.isPlaceholder}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Show>
                      </TableHead>
                    )}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody>
            <Show
              when={table.getRowModel().rows?.length}
              fallback={
                <TableRow>
                  <TableCell colSpan={props.columns.length} class="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </Show>
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  )
}
