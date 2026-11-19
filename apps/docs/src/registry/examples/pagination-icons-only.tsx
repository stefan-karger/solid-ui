import { For } from "solid-js"

import { Field, FieldLabel } from "~/registry/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "~/registry/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

export default function PaginationIconsOnly() {
  return (
    <div class="flex items-center justify-between gap-4">
      <Field orientation="horizontal" class="w-fit">
        <FieldLabel for="select-rows-per-page">Rows per page</FieldLabel>
        <Select<string> defaultValue="25">
          <SelectTrigger aria-label="Select an option" class="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <For each={["10", "25", "50", "100"]}>
              {(option) => <SelectItem value={option}>{option}</SelectItem>}
            </For>
          </SelectContent>
        </Select>
      </Field>
      <Pagination class="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
