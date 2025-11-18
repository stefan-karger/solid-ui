import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { Show, splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core"
import * as BreadcrumbPrimitive from "@kobalte/core/breadcrumbs"

import { cn } from "~/lib/utils"

const Breadcrumb: Component<BreadcrumbPrimitive.BreadcrumbsRootProps> = (props) => (
  <BreadcrumbPrimitive.Root aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
)

const BreadcrumbList: Component<ComponentProps<"ol">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ol
      class={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5",
        local.class
      )}
      data-slot="breadcrumb-list"
      {...others}
    />
  )
}

const BreadcrumbItem: Component<ComponentProps<"li">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <li
      class={cn("inline-flex items-center gap-1.5", local.class)}
      data-slot="breadcrumb-item"
      {...others}
    />
  )
}

type BreadcrumbLinkProps<T extends ValidComponent = "a"> =
  BreadcrumbPrimitive.BreadcrumbsLinkProps<T> & { class?: string | undefined }

const BreadcrumbLink = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T, BreadcrumbLinkProps<T>>
) => {
  const [local, others] = splitProps(props as BreadcrumbLinkProps, ["class"])
  return (
    <BreadcrumbPrimitive.Link
      class={cn("transition-colors hover:text-foreground", local.class)}
      data-slot="breadcrumb-link"
      {...others}
    />
  )
}

type BreadcrumbPageProps<T extends ValidComponent = "a"> =
  BreadcrumbPrimitive.BreadcrumbsLinkProps<T> & { class?: string | undefined }

const BreadcrumbPage = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T, BreadcrumbPageProps<T>>
) => {
  const [local, others] = splitProps(props as BreadcrumbPageProps, ["class"])
  return (
    <BreadcrumbPrimitive.Link
      aria-current="page"
      aria-disabled="true"
      class={cn("font-normal text-foreground", local.class)}
      current
      data-slot="breadcrumb-page"
      role="link"
      {...others}
    />
  )
}

type BreadcrumbSeparatorProps<T extends ValidComponent = "span"> =
  BreadcrumbPrimitive.BreadcrumbsSeparatorProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const BreadcrumbSeparator = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, BreadcrumbSeparatorProps<T>>
) => {
  const [local, others] = splitProps(props as BreadcrumbSeparatorProps, ["class", "children"])
  return (
    <BreadcrumbPrimitive.Separator
      aria-hidden="true"
      class={cn("[&>svg]:size-3.5", local.class)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...others}
    >
      <Show
        fallback={
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 6l6 6l-6 6" />
          </svg>
        }
        when={local.children}
      >
        {local.children}
      </Show>
    </BreadcrumbPrimitive.Separator>
  )
}

const BreadcrumbEllipsis: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      aria-hidden="true"
      class={cn("flex size-9 items-center justify-center", local.class)}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...others}
    >
      <svg
        class="size-4"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </svg>
      <span class="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
}
