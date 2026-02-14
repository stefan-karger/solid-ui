import { createSignal, For } from "solid-js"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "~/registry/ui/pagination"

export default function PaginationDemo() {
  const [currentPage, setCurrentPage] = createSignal(1)

  return (
    <Pagination
      count={50}
      ellipsisComponent={() => <PaginationEllipsis />}
      itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
      onPageChange={setCurrentPage}
      page={currentPage()}
    >
      <PaginationContent>
        <PaginationPrevious />
        <For each={[1, 2, 3, 4, 5]}>
          {(page) => <PaginationItem page={page}>{page}</PaginationItem>}
        </For>
        <PaginationEllipsis />
        <PaginationNext />
      </PaginationContent>
    </Pagination>
  )
}
