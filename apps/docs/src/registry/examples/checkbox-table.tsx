import { createSignal, For } from "solid-js"

import { Checkbox } from "~/registry/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/registry/ui/table"

const tableData = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Admin"
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@example.com",
    role: "User"
  },
  {
    id: "3",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "User"
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Editor"
  }
]

export default function CheckboxInTable() {
  const [selectedRows, setSelectedRows] = createSignal(new Set(["1"]))

  const allChecked = () => selectedRows().size === tableData.length
  const someChecked = () => selectedRows().size > 0

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(tableData.map((row) => row.id)))
    } else {
      setSelectedRows(new Set() as Set<string>)
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows())
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-8">
            <Checkbox
              id="select-all-checkbox"
              name="select-all-checkbox"
              checked={allChecked()}
              indeterminate={someChecked() && !allChecked()}
              onChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={tableData}>
          {(row) => (
            <TableRow data-state={selectedRows().has(row.id) ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  id={`row-${row.id}-checkbox`}
                  name={`row-${row.id}-checkbox`}
                  checked={selectedRows().has(row.id)}
                  onChange={(checked) => handleSelectRow(row.id, checked === true)}
                />
              </TableCell>
              <TableCell class="font-medium">{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  )
}
