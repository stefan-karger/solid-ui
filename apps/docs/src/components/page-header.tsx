import { type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

function PageHeader(props: ComponentProps<"section">) {
  const [local, other] = splitProps(props, ["class", "children"])
  return (
    <section class={cn("border-grid", local.class)} {...other}>
      <div class="container-wrapper">
        <div class="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
          {local.children}
        </div>
      </div>
    </section>
  )
}

function PageHeaderHeading(props: ComponentProps<"h1">) {
  const [local, other] = splitProps(props, ["class"])
  return (
    <h1
      class={cn(
        "max-w-2xl text-balance font-semibold text-4xl text-primary leading-tighter tracking-tight lg:font-semibold lg:leading-[1.1] xl:text-5xl xl:tracking-tighter",
        local.class
      )}
      {...other}
    />
  )
}

function PageHeaderDescription(props: ComponentProps<"p">) {
  const [local, other] = splitProps(props, ["class"])
  return (
    <p
      class={cn("max-w-3xl text-balance text-base text-foreground sm:text-lg", local.class)}
      {...other}
    />
  )
}

function PageActions(props: ComponentProps<"div">) {
  const [local, other] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none",
        local.class
      )}
      {...other}
    />
  )
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading }
