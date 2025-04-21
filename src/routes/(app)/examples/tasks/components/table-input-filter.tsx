import type { Column } from "@tanstack/solid-table";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { TextField, TextFieldInput } from "~/registry/ui/text-field";

type TableInputFilterProps<TData, TValue> = ComponentProps<
  typeof TextFieldInput
> & {
  column?: Column<TData, TValue>;
};

export function TableInputFilter<TData, TValue>(
  props: TableInputFilterProps<TData, TValue>,
) {
  const [local, others] = splitProps(props, ["column"]);
  return (
    <TextField
      onChange={(value) => local.column?.setFilterValue(value)}
      value={(local.column?.getFilterValue() as string) ?? ""}
    >
      <TextFieldInput {...others} />
    </TextField>
  );
}
