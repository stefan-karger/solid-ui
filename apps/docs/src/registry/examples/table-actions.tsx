import { EllipsisIcon } from "lucide-solid"
import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/registry/ui/table"

const products = [
  {
    id: "mouse",
    name: "Wireless Mouse",
    price: "$29.99"
  },
  {
    id: "keyboard",
    name: "Mechanical Keyboard",
    price: "$129.99"
  },
  {
    id: "hub",
    name: "USB-C Hub",
    price: "$49.99"
  }
]

export default function TableActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={products}>
          {(product) => (
            <TableRow>
              <TableCell class="font-medium">{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell class="text-right">
                <DropdownMenu placement="bottom-end">
                  <DropdownMenuTrigger as={Button} class="size-8" size="icon" variant="ghost">
                    <EllipsisIcon />
                    <span class="sr-only">Open menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  )
}
