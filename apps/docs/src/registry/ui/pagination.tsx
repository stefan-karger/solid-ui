import type { JSX, ValidComponent } from "solid-js"
import { Show, splitProps } from "solid-js"

import * as PaginationPrimitive from "@kobalte/core/pagination"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-solid"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/registry/ui/button"

const PaginationItems = PaginationPrimitive.Items

type PaginationProps<T extends ValidComponent = "nav"> =
  PaginationPrimitive.PaginationRootProps<T> & { class?: string | undefined }

const Pagination = <T extends ValidComponent = "nav">(
  props: PolymorphicProps<T, PaginationProps<T>>
) => {
  const [local, others] = splitProps(props as PaginationProps, ["class"])
  return (
    <PaginationPrimitive.Root
      class={cn("mx-auto flex w-full justify-center", local.class)}
      data-slot="pagination"
      {...others}
    />
  )
}

type PaginationContentProps = {
  class?: string | undefined
  children?: JSX.Element
}

const PaginationContent = (props: PaginationContentProps) => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <PaginationItems {...others}>
      <div
        class={cn("flex flex-row items-center gap-1", local.class)}
        data-slot="pagination-content"
      >
        {local.children}
      </div>
    </PaginationItems>
  )
}

type PaginationItemProps<T extends ValidComponent = "button"> =
  PaginationPrimitive.PaginationItemProps<T> & { class?: string | undefined }

const PaginationItem = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationItemProps<T>>
) => {
  const [local, others] = splitProps(props as PaginationItemProps, ["class"])
  return (
    <PaginationPrimitive.Item
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: "icon"
        }),
        "data-[current]:border data-[current]:bg-accent",
        local.class
      )}
      data-slot="pagination-item"
      {...others}
    />
  )
}

type PaginationEllipsisProps<T extends ValidComponent = "div"> =
  PaginationPrimitive.PaginationEllipsisProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const PaginationEllipsis = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PaginationEllipsisProps<T>>
) => {
  const [local, others] = splitProps(props as PaginationEllipsisProps, ["class", "children"])
  return (
    <PaginationPrimitive.Ellipsis
      class={cn("flex size-9 items-center justify-center", local.class)}
      data-slot="pagination-ellipsis"
      {...others}
    >
      <Show fallback={<MoreHorizontal class="size-4" />} when={local.children}>
        {local.children}
      </Show>
      <span class="sr-only">More pages</span>
    </PaginationPrimitive.Ellipsis>
  )
}

type PaginationPreviousProps<T extends ValidComponent = "button"> =
  PaginationPrimitive.PaginationPreviousProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const PaginationPrevious = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationPreviousProps<T>>
) => {
  const [local, others] = splitProps(props as PaginationPreviousProps, ["class", "children"])
  return (
    <PaginationPrimitive.Previous
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: "default"
        }),
        "gap-1 px-2.5 sm:pl-2.5",
        local.class
      )}
      data-slot="pagination-previous"
      {...others}
    >
      <Show
        fallback={
          <>
            <ChevronLeft class="size-4" />
            <span class="hidden sm:block">Previous</span>
          </>
        }
        when={local.children}
      >
        {local.children}
      </Show>
    </PaginationPrimitive.Previous>
  )
}

type PaginationNextProps<T extends ValidComponent = "button"> =
  PaginationPrimitive.PaginationNextProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const PaginationNext = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationNextProps<T>>
) => {
  const [local, others] = splitProps(props as PaginationNextProps, ["class", "children"])
  return (
    <PaginationPrimitive.Next
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: "default"
        }),
        "gap-1 px-2.5 sm:pr-2.5",
        local.class
      )}
      data-slot="pagination-next"
      {...others}
    >
      <Show
        fallback={
          <>
            <span class="hidden sm:block">Next</span>
            <ChevronRight class="size-4" />
          </>
        }
        when={local.children}
      >
        {local.children}
      </Show>
    </PaginationPrimitive.Next>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItems,
  PaginationItem,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext
}
