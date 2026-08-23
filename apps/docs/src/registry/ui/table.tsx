import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const Table: Component<ComponentProps<"table">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div class="cn-table-container relative w-full overflow-x-auto" data-slot="table-container">
      <table
        class={cn("cn-table w-full caption-bottom text-sm", local.class)}
        data-slot="table"
        {...others}
      />
    </div>
  )
}

const TableHeader: Component<ComponentProps<"thead">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <thead
      class={cn("cn-table-header [&_tr]:border-b", local.class)}
      data-slot="table-header"
      {...others}
    />
  )
}

const TableBody: Component<ComponentProps<"tbody">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <tbody
      class={cn("cn-table-body [&_tr:last-child]:border-0", local.class)}
      data-slot="table-body"
      {...others}
    />
  )
}

const TableFooter: Component<ComponentProps<"tfoot">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <tfoot
      class={cn(
        "cn-table-footer border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        local.class
      )}
      data-slot="table-footer"
      {...others}
    />
  )
}

const TableRow: Component<ComponentProps<"tr">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <tr
      class={cn(
        "cn-table-row border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        local.class
      )}
      data-slot="table-row"
      {...others}
    />
  )
}

const TableHead: Component<ComponentProps<"th">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <th
      class={cn(
        "cn-table-head h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class
      )}
      data-slot="table-head"
      {...others}
    />
  )
}

const TableCell: Component<ComponentProps<"td">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <td
      class={cn(
        "cn-table-cell whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]0",
        local.class
      )}
      data-slot="table-cell"
      {...others}
    />
  )
}

const TableCaption: Component<ComponentProps<"caption">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <caption
      class={cn("cn-table-caption mt-4 text-muted-foreground text-sm", local.class)}
      data-slot="table-caption"
      {...others}
    />
  )
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
