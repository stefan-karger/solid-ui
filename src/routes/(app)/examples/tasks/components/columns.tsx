import type { ColumnDef } from "@tanstack/solid-table";
import { Show } from "solid-js";

import { Badge } from "~/registry/ui/badge";
import { Checkbox } from "~/registry/ui/checkbox";

import type { Task } from "./data";
import { labels, priorities, statuses } from "./data";
import { TableColumnHeader } from "./table-column-header";
import { TableRowActions } from "./table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    cell: (props) => (
      <Checkbox
        aria-label="Select row"
        checked={props.row.getIsSelected()}
        class="translate-y-[2px]"
        onChange={(value) => props.row.toggleSelected(!!value)}
      />
    ),
    enableHiding: false,
    enableSorting: false,
    header: (props) => (
      <Checkbox
        aria-label="Select all"
        checked={props.table.getIsAllPageRowsSelected()}
        class="translate-y-[2px]"
        indeterminate={props.table.getIsSomePageRowsSelected()}
        onChange={(value) => props.table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    id: "select",
  },
  {
    accessorKey: "id",
    cell: (props) => <div class="w-[80px]">{props.row.getValue("id")}</div>,
    enableHiding: false,
    enableSorting: false,
    header: (props) => <TableColumnHeader column={props.column} title="Task" />,
  },
  {
    accessorKey: "title",
    cell: (props) => {
      const label = () =>
        labels.find((label) => label.value === props.row.original.label);

      return (
        <div class="flex space-x-2">
          <Show keyed when={label()}>
            {(label) => <Badge variant="outline">{label.label}</Badge>}
          </Show>
          <span class="max-w-[500px] truncate font-medium">
            {props.row.getValue("title")}
          </span>
        </div>
      );
    },
    header: (props) => (
      <TableColumnHeader column={props.column} title="Title" />
    ),
  },
  {
    accessorKey: "status",
    cell: (props) => {
      const status = () =>
        statuses.find(
          (status) => status.value === props.row.getValue("status"),
        );
      return (
        <Show keyed when={status()}>
          {(status) => (
            <div class="flex w-[100px] items-center">
              {status.icon && (
                <status.icon class="mr-2 size-4 text-muted-foreground" />
              )}
              <span>{status.label}</span>
            </div>
          )}
        </Show>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: (props) => (
      <TableColumnHeader column={props.column} title="Status" />
    ),
  },
  {
    accessorKey: "priority",
    cell: (props) => {
      const priority = () =>
        priorities.find(
          (priority) => priority.value === props.row.getValue("priority"),
        );
      return (
        <Show keyed when={priority()}>
          {(priority) => (
            <div class="flex items-center">
              {priority.icon && (
                <priority.icon class="mr-2 size-4 text-muted-foreground" />
              )}
              <span>{priority.label}</span>
            </div>
          )}
        </Show>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: (props) => (
      <TableColumnHeader column={props.column} title="Priority" />
    ),
  },
  {
    cell: (props) => <TableRowActions row={props.row} />,
    id: "actions",
  },
];
