import { type ComponentProps } from "@solidjs/web"
import { ChevronLeftIcon, ChevronRightIcon, Ellipsis } from "lucide-solid"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

type PaginationProps = ComponentProps<"nav">

const Pagination = (props: PaginationProps) => {
  const others = omit(props, "class")
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      class={cn("cn-pagination mx-auto flex w-full justify-center", props.class)}
      {...others}
    />
  )
}

type PaginationContentProps = ComponentProps<"ul">

const PaginationContent = (props: PaginationContentProps) => {
  const others = omit(props, "class")
  return (
    <ul
      data-slot="pagination-content"
      class={cn("cn-pagination-content flex items-center", props.class)}
      {...others}
    />
  )
}

type PaginationItemProps = ComponentProps<"li">

const PaginationItem = (props: PaginationItemProps) => {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = Omit<ButtonProps<"a">, "variant"> & {
  isActive?: boolean
}

const PaginationLink = (rawProps: PaginationLinkProps) => {
  const local = merge({ size: "icon" as const }, rawProps)
  const others = omit(rawProps, "class", "isActive", "size")
  return (
    <Button
      as="a"
      variant={local.isActive ? "outline" : "ghost"}
      size={local.size}
      class={cn("cn-pagination-link", local.class)}
      aria-current={local.isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={local.isActive}
      {...others}
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

const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const others = omit(props, "class")
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      class={cn("cn-pagination-ellipsis flex items-center justify-center", props.class)}
      {...others}
    >
      <Ellipsis />
      <span class="sr-only">More pages</span>
    </span>
  )
}

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
