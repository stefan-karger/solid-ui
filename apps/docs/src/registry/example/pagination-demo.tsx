import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
  PaginationNext,
  PaginationPrevious
} from "@/registry/ui/pagination"

export default function PaginationDemo() {
  return (
    <Pagination
      count={10}
      fixedItems
      itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
      ellipsisComponent={() => <PaginationEllipsis />}
    >
      <PaginationPrevious />
      <PaginationItems />
      <PaginationNext />
    </Pagination>
  )
}
