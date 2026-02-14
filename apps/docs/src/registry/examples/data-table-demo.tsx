import { createSignal, For } from "solid-js"

import {
  type ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState
} from "@tanstack/solid-table"
import { ArrowUpDown } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/registry/ui/table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "abe45@gmail.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "monserrat44@gmail.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "silas22@gmail.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@hotmail.com" }
]

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => <span class="capitalize">{info.getValue<string>()}</span>
  },
  {
    accessorKey: "email",
    header: (props) => (
      <Button
        onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
        variant="ghost"
      >
        Email
        <ArrowUpDown class="ml-2 size-4" />
      </Button>
    ),
    cell: (info) => <span class="lowercase">{info.getValue<string>()}</span>
  },
  {
    accessorKey: "amount",
    header: (props) => (
      <Button
        class="w-full justify-end"
        onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
        variant="ghost"
      >
        Amount
        <ArrowUpDown class="ml-2 size-4" />
      </Button>
    ),
    cell: (info) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(info.getValue<number>())
      return <div class="text-right font-medium">{formatted}</div>
    }
  }
]

export default function DataTableDemo() {
  const [sorting, setSorting] = createSignal<SortingState>([])

  const table = createSolidTable({
    get data() {
      return data
    },
    columns,
    state: {
      get sorting() {
        return sorting()
      }
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div class="w-full">
      <Table>
        <TableHeader>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <TableRow>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <TableHead>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            <For each={table.getRowModel().rows}>
              {(row) => (
                <TableRow data-state={row.getIsSelected() ? "selected" : undefined}>
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
          ) : (
            <TableRow>
              <TableCell class="h-24 text-center" colspan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
