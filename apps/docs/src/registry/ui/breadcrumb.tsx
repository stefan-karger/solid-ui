import {
  dynamic,
  type ComponentProps,
  type ValidComponent,
  type JSX
} from "@solidjs/web"
import { ChevronRightIcon, EllipsisIcon } from "lucide-solid"
import {
  isStatic,
  createContext,
  omit,
  useContext,
  type Accessor
} from "solid-js"

import { cn } from "~/lib/utils"

type PolymorphicProps<T extends ValidComponent, P> = Omit<
  P,
  "as" | "class" | "children"
> &
  Omit<
    ComponentProps<T>,
    keyof P | "as" | "class" | "children" | "onChange"
  > & {
    as?: T
    class?: string | undefined
    children?: JSX.Element
  }

const SeparatorContext = createContext<Accessor<JSX.Element>>()

type BreadcrumbProps<T extends ValidComponent = "nav"> = PolymorphicProps<
  T,
  ComponentProps<"nav"> & { separator?: ComponentProps<"span">["children"] }
> &
  Pick<ComponentProps<T>, "class">

const Breadcrumb = <T extends ValidComponent = "nav">(
  props: BreadcrumbProps<T>
) => {
  const others = omit(props as BreadcrumbProps, "class", "as", "separator")
  const separator = () => props.separator
  const Comp = dynamic(() => props.as ?? "nav", {
    static: isStatic(props, "as")
  })
  return (
    <SeparatorContext value={separator}>
      <Comp
        aria-label="breadcrumb"
        class={cn("cn-breadcrumb", props.class)}
        data-slot="breadcrumb"
        {...others}
      />
    </SeparatorContext>
  )
}

type BreadcrumbListProps = ComponentProps<"ol">

const BreadcrumbList = (props: BreadcrumbListProps) => (
  <ol
    data-slot="breadcrumb-list"
    {...props}
    class={cn(
      "cn-breadcrumb-list flex flex-wrap items-center wrap-break-word",
      props.class
    )}
  />
)

type BreadcrumbItemProps = ComponentProps<"li">

const BreadcrumbItem = (props: BreadcrumbItemProps) => (
  <li
    data-slot="breadcrumb-item"
    {...props}
    class={cn("cn-breadcrumb-item inline-flex items-center", props.class)}
  />
)

type BreadcrumbLinkProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  ComponentProps<"a">
> &
  Pick<ComponentProps<T>, "class">

const BreadcrumbLink = <T extends ValidComponent = "a">(
  props: BreadcrumbLinkProps<T>
) => {
  const others = omit(props as BreadcrumbLinkProps, "class", "as")
  const Comp = dynamic(() => props.as ?? "a", { static: isStatic(props, "as") })
  return (
    <Comp
      class={cn("cn-breadcrumb-link", props.class)}
      data-slot="breadcrumb-link"
      {...others}
    />
  )
}

type BreadcrumbPageProps = ComponentProps<"span">

const BreadcrumbPage = (props: BreadcrumbPageProps) => (
  <span
    aria-current="page"
    aria-disabled="true"
    data-slot="breadcrumb-page"
    role="link"
    {...props}
    class={cn("cn-breadcrumb-page", props.class)}
  />
)

type BreadcrumbSeparatorProps<T extends ValidComponent = "span"> =
  PolymorphicProps<T, ComponentProps<"span">> & Pick<ComponentProps<T>, "class">

const BreadcrumbSeparator = <T extends ValidComponent = "span">(
  props: BreadcrumbSeparatorProps<T>
) => {
  const others = omit(props as BreadcrumbSeparatorProps, "class", "as")
  const separator = useContext(SeparatorContext)
  const Comp = dynamic(() => props.as ?? "span", {
    static: isStatic(props, "as")
  })
  return (
    <Comp
      aria-hidden="true"
      class={cn("cn-breadcrumb-separator", props.class)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...others}
    >
      {props.children ?? separator?.() ?? (
        <ChevronRightIcon class="cn-rtl-flip" />
      )}
    </Comp>
  )
}

type BreadcrumbEllipsisProps = ComponentProps<"span">

const BreadcrumbEllipsis = (props: BreadcrumbEllipsisProps) => (
  <span
    aria-hidden="true"
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    {...props}
    class={cn(
      "cn-breadcrumb-ellipsis flex items-center justify-center",
      props.class
    )}
  >
    <EllipsisIcon />
    <span class="sr-only">More</span>
  </span>
)

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
