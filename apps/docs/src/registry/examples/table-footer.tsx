import { For } from "solid-js"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "~/registry/ui/table"

const invoices = [
  {
    id: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00"
  },
  {
    id: "INV002",
    status: "Pending",
    method: "PayPal",
    amount: "$150.00"
  },
  {
    id: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00"
  }
]

export default function TableFooterDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[120px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead class="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={invoices}>
          {(invoice) => (
            <TableRow>
              <TableCell class="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell class="text-right">{invoice.amount}</TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell class="font-medium" colspan={3}>
            Total
          </TableCell>
          <TableCell class="text-right">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
