import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import type { Column } from "@tanstack/solid-table"

import { TextField, TextFieldInput } from "@/registry/ui/text-field"

type TableInputFilterProps<TData, TValue> = ComponentProps<typeof TextFieldInput> & {
  column?: Column<TData, TValue>
}

export function TableInputFilter<TData, TValue>(props: TableInputFilterProps<TData, TValue>) {
  const [local, others] = splitProps(props, ["column"])
  return (
    <TextField
      value={(local.column?.getFilterValue() as string) ?? ""}
      onChange={(value) => local.column?.setFilterValue(value)}
    >
      <TextFieldInput {...others} />
    </TextField>
  )
}
