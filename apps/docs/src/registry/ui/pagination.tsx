import type { ComponentProps } from "@solidjs/web"
import { ChevronLeftIcon, ChevronRightIcon, Ellipsis } from "lucide-solid"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

type PaginationProps = ComponentProps<"nav">

const Pagination = (props: PaginationProps) => (
  <nav
    aria-label="pagination"
    data-slot="pagination"
    {...props}
    class={cn("cn-pagination mx-auto flex w-full justify-center", props.class)}
  />
)

type PaginationContentProps = ComponentProps<"ul">

const PaginationContent = (props: PaginationContentProps) => (
  <ul
    data-slot="pagination-content"
    {...props}
    class={cn("cn-pagination-content flex items-center", props.class)}
  />
)

type PaginationItemProps = ComponentProps<"li">

const PaginationItem = (props: PaginationItemProps) => (
  <li data-slot="pagination-item" {...props} />
)

type PaginationLinkProps = Omit<ButtonProps<"a">, "as" | "variant"> & {
  isActive?: boolean
}

const PaginationLink = (props: PaginationLinkProps) => {
  const others = omit(props, "isActive", "size")
  return (
    <Button
      as="a"
      variant={props.isActive ? "outline" : "ghost"}
      size={props.size === undefined ? "icon" : props.size}
      aria-current={props.isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={props.isActive}
      {...others}
      class={cn("cn-pagination-link", props.class)}
    />
  )
}

type PaginationPreviousProps = ComponentProps<typeof PaginationLink>

const PaginationPrevious = (props: PaginationPreviousProps) => {
  const others = omit(props, "class", "children")
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      class={cn("cn-pagination-previous", props.class)}
      {...others}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span class="cn-pagination-previous-text hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

type PaginationNextProps = ComponentProps<typeof PaginationLink>

const PaginationNext = (props: PaginationNextProps) => {
  const others = omit(props, "class", "children")
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      class={cn("cn-pagination-next", props.class)}
      {...others}
    >
      <span class="cn-pagination-next-text hidden sm:block">Next</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

type PaginationEllipsisProps = ComponentProps<"span">

const PaginationEllipsis = (props: PaginationEllipsisProps) => (
  <span
    aria-hidden="true"
    data-slot="pagination-ellipsis"
    {...props}
    class={cn(
      "cn-pagination-ellipsis flex items-center justify-center",
      props.class
    )}
  >
    <Ellipsis />
    <span class="sr-only">More pages</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  type PaginationLinkProps
}
