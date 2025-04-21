import type { Table } from "@tanstack/solid-table";

import { IconX } from "~/components/icons";
import { Button } from "~/registry/ui/button";
import { TextField, TextFieldInput } from "~/registry/ui/text-field";

import { priorities, statuses } from "./data";
import { TableFacetedFilter } from "./table-faceted-filter";
import { TableViewOptions } from "./table-view-options";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
};

export function TableToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const isFiltered = () => props.table.getState().columnFilters.length > 0;

  return (
    <div class="flex items-center justify-between">
      <div class="flex flex-1 items-center space-x-2">
        <TextField
          onChange={(value) =>
            props.table.getColumn("title")?.setFilterValue(value)
          }
          value={
            (props.table.getColumn("title")?.getFilterValue() as string) ?? ""
          }
        >
          <TextFieldInput
            class="h-8 w-[150px] lg:w-[250px]"
            placeholder="Filter tasks..."
          />
        </TextField>
        {props.table.getColumn("status") && (
          <TableFacetedFilter
            column={props.table.getColumn("status")}
            options={statuses}
            title="Status"
          />
        )}
        {props.table.getColumn("priority") && (
          <TableFacetedFilter
            column={props.table.getColumn("priority")}
            options={priorities}
            title="Priority"
          />
        )}
        {isFiltered() && (
          <Button
            class="h-8 px-2 lg:px-3"
            onClick={() => props.table.resetColumnFilters()}
            variant="ghost"
          >
            Reset
            <IconX />
          </Button>
        )}
      </div>
      <TableViewOptions table={props.table} />
    </div>
  );
}
