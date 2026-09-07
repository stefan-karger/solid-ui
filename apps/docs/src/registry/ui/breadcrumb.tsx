import {
  Link,
  Root,
  Separator,
  type BreadcrumbsLinkProps as BreadcrumbsLinkPrimitiveProps,
  type BreadcrumbsRootProps,
  type BreadcrumbsSeparatorProps as BreadcrumbsSeparatorPrimitiveProps
} from "@kobalte/core/breadcrumbs"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { ChevronRightIcon, EllipsisIcon } from "lucide-solid"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type BreadcrumbProps<T extends ValidComponent = "nav"> = PolymorphicProps<
  T,
  BreadcrumbsRootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const Breadcrumb = <T extends ValidComponent = "nav">(props: BreadcrumbProps<T>) => {
  const others = omit(props as BreadcrumbProps, "class", "separator")
  return (
    <Root
      aria-label="breadcrumb"
      class={cn("cn-breadcrumb", props.class)}
      data-slot="breadcrumb"
      separator={props.separator ?? <ChevronRightIcon class="cn-rtl-flip" />}
      {...others}
    />
  )
}

type BreadcrumbListProps = ComponentProps<"ol">

const BreadcrumbList = (props: BreadcrumbListProps) => {
  const others = omit(props, "class")
  return (
    <ol
      class={cn("cn-breadcrumb-list flex flex-wrap items-center wrap-break-word", props.class)}
      data-slot="breadcrumb-list"
      {...others}
    />
  )
}

type BreadcrumbItemProps = ComponentProps<"li">

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const others = omit(props, "class")
  return (
    <li
      class={cn("cn-breadcrumb-item inline-flex items-center", props.class)}
      data-slot="breadcrumb-item"
      {...others}
    />
  )
}

type BreadcrumbLinkProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  BreadcrumbsLinkPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class">

const BreadcrumbLink = <T extends ValidComponent = "a">(props: BreadcrumbLinkProps<T>) => {
  const others = omit(props as BreadcrumbLinkProps, "class")
  return (
    <Link class={cn("cn-breadcrumb-link", props.class)} data-slot="breadcrumb-link" {...others} />
  )
}

type BreadcrumbPageProps = ComponentProps<"span">

const BreadcrumbPage = (props: BreadcrumbPageProps) => {
  const others = omit(props, "class")
  return (
    <span
      aria-current="page"
      aria-disabled="true"
      class={cn("cn-breadcrumb-page", props.class)}
      data-slot="breadcrumb-page"
      role="link"
      {...others}
    />
  )
}

type BreadcrumbSeparatorProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  BreadcrumbsSeparatorPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class">

const BreadcrumbSeparator = <T extends ValidComponent = "span">(
  props: BreadcrumbSeparatorProps<T>
) => {
  const others = omit(props as BreadcrumbSeparatorProps, "class")
  return (
    <Separator
      aria-hidden="true"
      class={cn("cn-breadcrumb-separator", props.class)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...others}
    />
  )
}

type BreadcrumbEllipsisProps = ComponentProps<"span">

const BreadcrumbEllipsis = (props: BreadcrumbEllipsisProps) => {
  const others = omit(props, "class")
  return (
    <span
      aria-hidden="true"
      class={cn("cn-breadcrumb-ellipsis flex items-center justify-center", props.class)}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...others}
    >
      <EllipsisIcon />
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
