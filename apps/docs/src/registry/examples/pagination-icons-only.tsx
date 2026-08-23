import { createSignal } from "solid-js"

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
  const [value, setValue] = createSignal(25)
  return (
    <div class="flex items-center justify-between gap-4">
      <Field class="w-fit" orientation="horizontal">
        <FieldLabel for="select-rows-per-page">Rows per page</FieldLabel>
        <Select
          defaultValue={25}
          itemComponent={(props) => (
            <SelectItem item={props.item}>{String(props.item.rawValue)}</SelectItem>
          )}
          onChange={setValue}
          options={[10, 25, 50, 100]}
          placeholder="Select a fruit…"
          placement="bottom-start"
          value={value()}
        >
          <SelectTrigger class="w-20" id="select-rows-per-page">
            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
          </SelectTrigger>
          <SelectContent />
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
