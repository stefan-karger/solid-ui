import {
  type Component,
  type ComponentProps,
  createMemo,
  For,
  mergeProps,
  Show,
  splitProps
} from "solid-js"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Label } from "~/registry/v1/ui/label"
import { Separator } from "~/registry/v1/ui/separator"

const FieldSet: Component<ComponentProps<"fieldset">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <fieldset
      class={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        local.class
      )}
      data-slot="field-set"
      {...others}
    />
  )
}

type FieldLegendProps = ComponentProps<"legend"> & {
  variant?: "legend" | "label"
}

const FieldLegend: Component<FieldLegendProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"])
  return (
    <legend
      class={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        local.class
      )}
      data-slot="field-legend"
      data-variant={local.variant}
      {...others}
    />
  )
}

const FieldGroup: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        local.class
      )}
      data-slot="field-group"
      {...others}
    />
  )
}

const fieldVariants = cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
  variants: {
    orientation: {
      vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
      horizontal: [
        "flex-row items-center",
        "[&>[data-slot=field-label]]:flex-auto",
        "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
      ],
      responsive: [
        "@md/field-group:flex-row flex-col @md/field-group:items-center @md/field-group:[&>*]:w-auto [&>*]:w-full [&>.sr-only]:w-auto",
        "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
        "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
      ]
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
})

type FieldProps = ComponentProps<"div"> & VariantProps<typeof fieldVariants>

const Field: Component<FieldProps> = (rawProps) => {
  const props = mergeProps<FieldProps[]>({ orientation: "vertical" }, rawProps)
  const [local, others] = splitProps(props, ["class", "orientation"])
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

const FieldContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", local.class)}
      data-slot="field-content"
      {...others}
    />
  )
}

const FieldLabel: Component<ComponentProps<typeof Label>> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Label
      class={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[checked]:border-primary has-data-[checked]:bg-primary/5 dark:has-data-[checked]:bg-primary/10",
        local.class
      )}
      data-slot="field-label"
      {...others}
    />
  )
}

const FieldTitle: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex w-fit items-center gap-2 font-medium text-sm leading-snug group-data-[disabled]/field:opacity-50",
        local.class
      )}
      data-slot="field-label"
      {...others}
    />
  )
}

const FieldDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      class={cn(
        "font-normal text-muted-foreground text-sm leading-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5 last:mt-0",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      data-slot="field-description"
      {...others}
    />
  )
}

const FieldSeparator: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <div
      class={cn(
        "-my-2 group-data-[variant=outline]/field-group:-mb-2 relative h-5 text-sm",
        local.class
      )}
      data-content={!!local.children}
      data-slot="field-separator"
      {...others}
    >
      <Separator class="absolute inset-0 top-1/2" />
      {local.children && (
        <span
          class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {local.children}
        </span>
      )}
    </div>
  )
}

type FieldErrorProps = ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}

const FieldError: Component<FieldErrorProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "errors"])

  const content = createMemo(() => {
    if (local.children) {
      return local.children
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
          {(error) => <Show when={error?.message}>{(message) => <li>{message()}</li>}</Show>}
        </For>
      </ul>
    )
  })

  return (
    <Show when={content()}>
      {(content) => (
        <div
          class={cn("font-normal text-destructive text-sm", local.class)}
          data-slot="field-error"
          role="alert"
          {...others}
        >
          {content()}
        </div>
      )}
    </Show>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle
}
