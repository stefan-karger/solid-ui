import { type ComponentProps, splitProps } from "solid-js"

import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-solid"

import { cn } from "~/lib/utils"
import { type Button, buttonVariants } from "~/registry/ui/button"

const Pagination = (props: ComponentProps<"nav">) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <nav
      aria-label="pagination"
      class={cn("cn-pagination mx-auto flex w-full justify-center", local.class)}
      data-slot="pagination"
      {...others}
    />
  )
}

const PaginationContent = (props: ComponentProps<"ul">) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ul
      class={cn("cn-pagination-content flex flex-row items-center gap-1", local.class)}
      data-slot="pagination-content"
      {...others}
    />
  )
}

const PaginationItem = (props: ComponentProps<"li">) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <li class={cn("cn-pagination-item", local.class)} data-slot="pagination-item" {...others} />
  )
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ComponentProps<typeof Button>, "size"> &
  ComponentProps<"a">

const PaginationLink = (props: PaginationLinkProps) => {
  const [local, others] = splitProps(props, ["class", "isActive", "size"])
  return (
    <a
      aria-current={local.isActive ? "page" : undefined}
      class={cn(
        buttonVariants({
          variant: local.isActive ? "outline" : "ghost",
          size: local.size,
          class: "cn-pagination-link"
        }),
        local.class
      )}
      data-active={local.isActive}
      data-slot="pagination-link"
      {...others}
    />
  )
}

const PaginationPrevious = (props: ComponentProps<typeof PaginationLink>) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <PaginationLink
      aria-label="Go to previous page"
      class={cn("cn-pagination-previous gap-1 px-2.5 sm:pl-2.5", local.class)}
      size="default"
      {...others}
    >
      <ChevronLeftIcon />
      <span class="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

const PaginationNext = (props: ComponentProps<typeof PaginationLink>) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <PaginationLink
      aria-label="Go to next page"
      class={cn("cn-pagination-next gap-1 px-2.5 sm:pr-2.5", local.class)}
      size="default"
      {...others}
    >
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

const PaginationEllipsis = (props: ComponentProps<"span">) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      aria-hidden
      class={cn("cn-pagination-ellipsis flex size-9 items-center justify-center", local.class)}
      data-slot="pagination-ellipsis"
      {...others}
    >
      <EllipsisIcon class="size-4" />
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
  PaginationPrevious
}
