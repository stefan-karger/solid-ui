import { type ComponentProps } from "@solidjs/web"

import { cn } from "~/lib/utils"

type TableProps = ComponentProps<"table">

const Table = (props: TableProps) => (
  <div class="cn-table-container" data-slot="table-container">
    <table data-slot="table" {...props} class={cn("cn-table", props.class)} />
  </div>
)

const TableHeader = (props: ComponentProps<"thead">) => (
  <thead data-slot="table-header" {...props} class={cn("cn-table-header", props.class)} />
)

const TableBody = (props: ComponentProps<"tbody">) => (
  <tbody data-slot="table-body" {...props} class={cn("cn-table-body", props.class)} />
)

const TableFooter = (props: ComponentProps<"tfoot">) => (
  <tfoot data-slot="table-footer" {...props} class={cn("cn-table-footer", props.class)} />
)

const TableRow = (props: ComponentProps<"tr">) => (
  <tr data-slot="table-row" {...props} class={cn("cn-table-row", props.class)} />
)

const TableHead = (props: ComponentProps<"th">) => (
  <th data-slot="table-head" {...props} class={cn("cn-table-head", props.class)} />
)

const TableCell = (props: ComponentProps<"td">) => (
  <td data-slot="table-cell" {...props} class={cn("cn-table-cell", props.class)} />
)

const TableCaption = (props: ComponentProps<"caption">) => (
  <caption data-slot="table-caption" {...props} class={cn("cn-table-caption", props.class)} />
)

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps
}
