import { type ComponentProps, type JSX } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { createMemo, For, Show, omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Label } from "~/registry/ui/label"
import { Separator } from "~/registry/ui/separator"

type FieldSetProps = ComponentProps<"fieldset"> & {
  class?: string | undefined
}

const FieldSet = (props: FieldSetProps) => {
  const others = omit(props, "class")
  return (
    <fieldset
      data-slot="field-set"
      class={cn("cn-field-set flex flex-col", props.class)}
      {...others}
    />
  )
}

type FieldLegendProps = ComponentProps<"legend"> & {
  class?: string | undefined
  variant?: "legend" | "label"
}

const FieldLegend = (props: FieldLegendProps) => {
  const others = omit(props, "class", "variant")
  return (
    <legend
      data-slot="field-legend"
      data-variant={props.variant ?? "legend"}
      class={cn("cn-field-legend", props.class)}
      {...others}
    />
  )
}

type FieldGroupProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const FieldGroup = (props: FieldGroupProps) => {
  const others = omit(props, "class")
  return (
    <div
      data-slot="field-group"
      class={cn(
        "group/field-group cn-field-group @container/field-group flex w-full flex-col",
        props.class
      )}
      {...others}
    />
  )
}

const fieldVariants = cva("group/field cn-field flex w-full", {
  variants: {
    orientation: {
      vertical: "cn-field-orientation-vertical flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "cn-field-orientation-horizontal flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "cn-field-orientation-responsive flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
})

type FieldProps = ComponentProps<"div"> &
  VariantProps<typeof fieldVariants> & {
    class?: string | undefined
  }

const Field = (props: FieldProps) => {
  const others = omit(props, "class", "orientation")
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={props.orientation ?? "vertical"}
      class={cn(fieldVariants({ orientation: props.orientation }), props.class)}
      {...others}
    />
  )
}

type FieldContentProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const FieldContent = (props: FieldContentProps) => {
  const others = omit(props, "class")
  return (
    <div
      data-slot="field-content"
      class={cn(
        "group/field-content cn-field-content flex flex-1 flex-col leading-snug",
        props.class
      )}
      {...others}
    />
  )
}

type FieldLabelProps = ComponentProps<typeof Label> & {
  class?: string | undefined
}

const FieldLabel = (props: FieldLabelProps) => {
  const others = omit(props, "class")
  return (
    <Label
      data-slot="field-label"
      class={cn(
        "group/field-label peer/field-label cn-field-label flex w-fit leading-snug",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        props.class
      )}
      {...others}
    />
  )
}

type FieldTitleProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const FieldTitle = (props: FieldTitleProps) => {
  const others = omit(props, "class")
  return (
    <div
      data-slot="field-label"
      class={cn("cn-field-title flex w-fit items-center leading-snug", props.class)}
      {...others}
    />
  )
}

type FieldDescriptionProps = ComponentProps<"p"> & {
  class?: string | undefined
}

const FieldDescription = (props: FieldDescriptionProps) => {
  const others = omit(props, "class")
  return (
    <p
      data-slot="field-description"
      class={cn(
        "cn-field-description leading-normal font-normal group-has-data-[orientation=horizontal]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        props.class
      )}
      {...others}
    />
  )
}

type FieldSeparatorProps = ComponentProps<"div"> & {
  class?: string | undefined
  children?: JSX.Element
}

const FieldSeparator = (props: FieldSeparatorProps) => {
  const others = omit(props, "class", "children")
  return (
    <div
      data-slot="field-separator"
      data-content={!!props.children}
      class={cn("cn-field-separator relative", props.class)}
      {...others}
    >
      <Separator class="absolute inset-0 top-1/2" />
      <Show when={props.children}>
        <span
          class="cn-field-separator-content relative mx-auto block w-fit bg-background"
          data-slot="field-separator-content"
        >
          {props.children}
        </span>
      </Show>
    </div>
  )
}

type FieldErrorProps = ComponentProps<"div"> & {
  class?: string | undefined
  children?: JSX.Element
  errors?: ReadonlyArray<
    | {
        message?: string
      }
    | undefined
  >
}

const FieldError = (props: FieldErrorProps) => {
  const others = omit(props, "class", "children", "errors")
  const content = createMemo(() => {
    if (props.children) {
      return props.children
    }
    if (!props.errors?.length) {
      return null
    }
    const uniqueErrors = [...new Map(props.errors.map((error) => [error?.message, error])).values()]
    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message
    }
    return (
      <ul class="ml-4 flex list-disc flex-col gap-1">
        <For each={uniqueErrors}>
          {(error) => <Show when={error?.message}>{(message) => <li>{message()}</li>}</Show>}
        </For>
      </ul>
    )
  })
  return (
    <Show when={content()}>
      <div
        role="alert"
        data-slot="field-error"
        class={cn("cn-field-error font-normal", props.class)}
        {...others}
      >
        {content()}
      </div>
    </Show>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  fieldVariants,
  type FieldContentProps,
  type FieldDescriptionProps,
  type FieldErrorProps,
  type FieldGroupProps,
  type FieldLabelProps,
  type FieldLegendProps,
  type FieldProps,
  type FieldSeparatorProps,
  type FieldSetProps,
  type FieldTitleProps
}
