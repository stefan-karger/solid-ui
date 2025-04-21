import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/solid-table";
import {
  type ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/solid-table";
import { createSignal, For } from "solid-js";

import { IconChevronDown, IconDots, IconSelector } from "~/components/icons";
import { Button } from "~/registry/ui/button";
import { Checkbox } from "~/registry/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/registry/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/registry/ui/table";
import { TextField, TextFieldInput } from "~/registry/ui/text-field";

const data: Payment[] = [
  {
    amount: 316,
    email: "ken99@yahoo.com",
    id: "m5gr84i9",
    status: "success",
  },
  {
    amount: 242,
    email: "Abe45@gmail.com",
    id: "3u1reuv4",
    status: "success",
  },
  {
    amount: 837,
    email: "Monserrat44@gmail.com",
    id: "derv1ws0",
    status: "processing",
  },
  {
    amount: 874,
    email: "Silas22@gmail.com",
    id: "5kma53ae",
    status: "success",
  },
  {
    amount: 721,
    email: "carmella@hotmail.com",
    id: "bhqecj4p",
    status: "failed",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    cell: (props) => (
      <Checkbox
        aria-label="Select row"
        checked={props.row.getIsSelected()}
        onChange={(value) => props.row.toggleSelected(!!value)}
      />
    ),
    enableHiding: false,
    enableSorting: false,
    header: (props) => (
      <Checkbox
        aria-label="Select all"
        checked={props.table.getIsAllPageRowsSelected()}
        indeterminate={props.table.getIsSomePageRowsSelected()}
        onChange={(value) => props.table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    id: "select",
  },
  {
    accessorKey: "status",
    cell: (props) => (
      <div class="capitalize">{props.row.getValue("status")}</div>
    ),
    header: "Status",
  },
  {
    accessorKey: "email",
    cell: (props) => <div class="lowercase">{props.row.getValue("email")}</div>,
    header: (props) => {
      return (
        <Button
          onClick={() =>
            props.column.toggleSorting(props.column.getIsSorted() === "asc")
          }
          variant="ghost"
        >
          Email
          <IconSelector />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    cell: (props) => {
      const formatted = () => {
        const amount = parseFloat(props.row.getValue("amount"));
        return new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency",
        }).format(amount);
      };
      return <div class="text-right font-medium">{formatted()}</div>;
    },
    header: () => <div class="text-right">Amount</div>,
  },
  {
    cell: (props) => {
      return (
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger
            as={Button<"button">}
            class="size-8 p-0"
            variant="ghost"
          >
            <span class="sr-only">Open menu</span>
            <IconDots />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(props.row.original.id)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    id: "actions",
  },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>(
    {},
  );
  const [rowSelection, setRowSelection] = createSignal({});

  /*
get data() {
      return props.data
    },
    get columns() {
      return props.columns
    },
*/

  const table = createSolidTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      get columnFilters() {
        return columnFilters();
      },
      get columnVisibility() {
        return columnVisibility();
      },
      get rowSelection() {
        return rowSelection();
      },
      get sorting() {
        return sorting();
      },
    },
  });

  return (
    <div class="w-full">
      <div class="flex items-center py-4">
        <TextField
          onChange={(value) => table.getColumn("email")?.setFilterValue(value)}
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        >
          <TextFieldInput class="max-w-sm" placeholder="Filter emails..." />
        </TextField>
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger
            as={Button<"button">}
            class="ml-auto"
            variant="outline"
          >
            Columns <IconChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <For
              each={table
                .getAllColumns()
                .filter((column) => column.getCanHide())}
            >
              {(column) => {
                return (
                  <DropdownMenuCheckboxItem
                    checked={column.getIsVisible()}
                    class="capitalize"
                    onChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              }}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow>
                  <For each={headerGroup.headers}>
                    {(header) => {
                      return (
                        <TableHead>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    }}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  <For each={row.getVisibleCells()}>
                    {(cell) => (
                      <TableCell>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    )}
                  </For>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell class="h-24 text-center" colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div class="space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
