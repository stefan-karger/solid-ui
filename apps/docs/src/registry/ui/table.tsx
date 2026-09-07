import { type ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type TableProps = ComponentProps<"table">

const Table = (props: TableProps) => {
  const others = omit(props, "class")
  return (
    <div class="cn-table-container" data-slot="table-container">
      <table class={cn("cn-table", props.class)} data-slot="table" {...others} />
    </div>
  )
}

const TableHeader = (props: ComponentProps<"thead">) => {
  const others = omit(props, "class")
  return <thead class={cn("cn-table-header", props.class)} data-slot="table-header" {...others} />
}

const TableBody = (props: ComponentProps<"tbody">) => {
  const others = omit(props, "class")
  return <tbody class={cn("cn-table-body", props.class)} data-slot="table-body" {...others} />
}

const TableFooter = (props: ComponentProps<"tfoot">) => {
  const others = omit(props, "class")
  return <tfoot class={cn("cn-table-footer", props.class)} data-slot="table-footer" {...others} />
}

const TableRow = (props: ComponentProps<"tr">) => {
  const others = omit(props, "class")
  return <tr class={cn("cn-table-row", props.class)} data-slot="table-row" {...others} />
}

const TableHead = (props: ComponentProps<"th">) => {
  const others = omit(props, "class")
  return <th class={cn("cn-table-head", props.class)} data-slot="table-head" {...others} />
}

const TableCell = (props: ComponentProps<"td">) => {
  const others = omit(props, "class")
  return <td class={cn("cn-table-cell", props.class)} data-slot="table-cell" {...others} />
}

const TableCaption = (props: ComponentProps<"caption">) => {
  const others = omit(props, "class")
  return (
    <caption class={cn("cn-table-caption", props.class)} data-slot="table-caption" {...others} />
  )
}

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
