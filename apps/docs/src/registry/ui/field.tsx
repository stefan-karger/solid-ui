import type { ComponentProps, JSX } from "solid-js"
import {
  createMemo,
  For,
  mergeProps,
  children as resolveChildren,
  Show,
  splitProps
} from "solid-js"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Label } from "~/registry/ui/label"
import { Separator } from "~/registry/ui/separator"

type FieldSetProps = ComponentProps<"fieldset"> & {
  class?: string | undefined
}

const FieldSet = (props: FieldSetProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <fieldset
      class={cn("cn-field-set flex flex-col", local.class)}
      data-slot="field-set"
      {...others}
    />
  )
}

type FieldLegendProps = ComponentProps<"legend"> & {
  class?: string | undefined
  variant?: "legend" | "label"
}

const FieldLegend = (props: FieldLegendProps) => {
  const mergedProps = mergeProps({ variant: "legend" } as const, props)
  const [local, others] = splitProps(mergedProps, ["class", "variant"])

  return (
    <legend
      class={cn("cn-field-legend", local.class)}
      data-slot="field-legend"
      data-variant={local.variant}
      {...others}
    />
  )
}

type FieldGroupProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const FieldGroup = (props: FieldGroupProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "group/field-group @container/field-group cn-field-group flex w-full flex-col",
        local.class
      )}
      data-slot="field-group"
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
        "cn-field-orientation-responsive @md/field-group:flex-row flex-col @md/field-group:items-center *:w-full @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
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
  const mergedProps = mergeProps({ orientation: "vertical" } as const, props)
  const [local, others] = splitProps(mergedProps, ["class", "orientation"])

  return (
    <div
      class={cn(fieldVariants({ orientation: local.orientation }), local.class)}
      data-orientation={local.orientation}
      data-slot="field"
      role="group"
      {...others}
    />
  )
}

type FieldContentProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const FieldContent = (props: FieldContentProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "group/field-content cn-field-content flex flex-1 flex-col leading-snug",
        local.class
      )}
      data-slot="field-content"
      {...others}
    />
  )
}

type FieldLabelProps = ComponentProps<typeof Label> & {
  class?: string | undefined
}

const FieldLabel = (props: FieldLabelProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Label
      class={cn(
        "group/field-label peer/field-label cn-field-label flex w-fit",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        local.class
      )}
      data-slot="field-label"
      {...others}
    />
  )
}

type FieldTitleProps = ComponentProps<"div"> & {
  class?: string | undefined
}

const FieldTitle = (props: FieldTitleProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-field-title flex w-fit items-center", local.class)}
      data-slot="field-label"
      {...others}
    />
  )
}

type FieldDescriptionProps = ComponentProps<"p"> & {
  class?: string | undefined
}

const FieldDescription = (props: FieldDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      class={cn(
        "cn-field-description font-normal leading-normal group-has-data-horizontal/field:text-balance",
        "nth-last-2:-mt-1 last:mt-0",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      data-slot="field-description"
      {...others}
    />
  )
}

type FieldSeparatorProps = ComponentProps<"div"> & {
  class?: string | undefined
  children?: JSX.Element
}

const FieldSeparator = (props: FieldSeparatorProps) => {
  const [local, others] = splitProps(props, ["class", "children"])
  const resolvedChildren = resolveChildren(() => local.children)

  return (
    <div
      class={cn("cn-field-separator relative", local.class)}
      data-content={!!resolvedChildren()}
      data-slot="field-separator"
      {...others}
    >
      <Separator class="absolute inset-0 top-1/2" />
      <Show when={resolvedChildren()}>
        {(content) => (
          <span
            class="cn-field-separator-content relative mx-auto block w-fit bg-background"
            data-slot="field-separator-content"
          >
            {content()}
          </span>
        )}
      </Show>
    </div>
  )
}

type FieldErrorProps = ComponentProps<"div"> & {
  class?: string | undefined
  children?: JSX.Element
  errors?: Array<{ message?: string } | undefined>
}

const FieldError = (props: FieldErrorProps) => {
  const [local, others] = splitProps(props, ["class", "children", "errors"])
  const resolvedChildren = resolveChildren(() => local.children)

  const content = createMemo(() => {
    const childContent = resolvedChildren()

    if (childContent) {
      return childContent
    }

    if (!local.errors?.length) {
      return null
    }

    const uniqueErrors = [...new Map(local.errors.map((error) => [error?.message, error])).values()]

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul class="ml-4 flex list-disc flex-col gap-1">
        <For each={uniqueErrors}>
          {(error) => (
            <Show when={error?.message}>
              <li>{error?.message}</li>
            </Show>
          )}
        </For>
      </ul>
    )
  })

  return (
    <Show when={content()}>
      {(resolvedContent) => (
        <div
          class={cn("cn-field-error font-normal", local.class)}
          data-slot="field-error"
          role="alert"
          {...others}
        >
          {resolvedContent()}
        </div>
      )}
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
  FieldTitle
}
