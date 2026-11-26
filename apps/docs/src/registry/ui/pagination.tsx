// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps } from "@solidjs/web"
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
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        data-icon="inline-start"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
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
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        data-icon="inline-end"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
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
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
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
