import { EllipsisIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/registry/ui/table"

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
        <TableRow>
          <TableCell class="font-medium">Wireless Mouse</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell class="p-0 text-right">
            <DropdownMenu placement="bottom-end">
              <DropdownMenuTrigger as={Button<"button">} class="size-8" size="icon" variant="ghost">
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
        <TableRow>
          <TableCell class="font-medium">Mechanical Keyboard</TableCell>
          <TableCell>$129.99</TableCell>
          <TableCell class="p-0 text-right">
            <DropdownMenu placement="bottom-end">
              <DropdownMenuTrigger as={Button<"button">} class="size-8" size="icon" variant="ghost">
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
        <TableRow>
          <TableCell class="font-medium">USB-C Hub</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell class="p-0 text-right">
            <DropdownMenu placement="bottom-end">
              <DropdownMenuTrigger as={Button<"button">} class="size-8" size="icon" variant="ghost">
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
      </TableBody>
    </Table>
  )
}
