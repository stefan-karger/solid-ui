import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { createContext, createUniqueId, Show, splitProps, useContext } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type {
  FieldPath,
  FieldStore,
  FieldValues,
  FormStore,
  ResponseData
} from "@modular-forms/solid"
import { getValue, Field as ModularField } from "@modular-forms/solid"

import { cn } from "~/lib/utils"
import { Label } from "~/registry/ui/label"

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TResponseData extends ResponseData = undefined,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TFieldName
  formStore: FormStore<TFieldValues, TResponseData>
  fieldStore: FieldStore<TFieldValues, TFieldName>
}

const FormFieldContext = createContext<FormFieldContextValue>()

type FormFieldComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TResponseData extends ResponseData = undefined,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: {
  of: FormStore<TFieldValues, TResponseData>
  name: TFieldName
  children: JSX.Element
}) => JSX.Element

const FormField: FormFieldComponent = (props) => {
  return (
    // @ts-expect-error - Complex generic type compatibility with @modular-forms/solid
    <ModularField name={props.name} of={props.of}>
      {(field) => (
        <FormFieldContext.Provider
          value={{
            name: props.name,
            // @ts-expect-error - Generic type narrowing issue
            formStore: props.of,
            // @ts-expect-error - Generic type narrowing issue
            fieldStore: field
          }}
        >
          {props.children}
        </FormFieldContext.Provider>
      )}
    </ModularField>
  )
}

function useFormField<
  TFieldValues extends FieldValues = FieldValues,
  TResponseData extends ResponseData = undefined,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>() {
  const context = useContext(FormFieldContext) as
    | FormFieldContextValue<TFieldValues, TResponseData, TFieldName>
    | undefined

  if (!context) {
    throw new Error("useFormField must be used within <FormField>")
  }

  const { name, formStore, fieldStore } = context

  return {
    name,
    formStore,
    fieldStore,
    formItemId: String(name),
    formDescriptionId: `${name}-description`,
    formMessageId: `${name}-message`,
    error: fieldStore.error,
    value: () => getValue(formStore, name)
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>()

const FormItem: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  const id = createUniqueId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div class={cn("grid gap-2", local.class)} data-slot="form-item" {...others} />
    </FormItemContext.Provider>
  )
}

const FormLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, ComponentProps<typeof Label>>
) => {
  const [local, others] = splitProps(props as ComponentProps<typeof Label>, ["class"])
  const { error, formItemId } = useFormField()

  return (
    <Label
      class={cn("data-[error=true]:text-destructive", local.class)}
      data-error={!!error}
      data-slot="form-label"
      for={formItemId}
      {...others}
    />
  )
}

const FormControl: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])

  return <div class={cn(local.class)} data-slot="form-control" {...others} />
}

const FormDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  const { formDescriptionId } = useFormField()

  return (
    <p
      class={cn("text-muted-foreground text-sm", local.class)}
      data-slot="form-description"
      id={formDescriptionId}
      {...others}
    />
  )
}

const FormMessage: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"])
  const { error, formMessageId } = useFormField()

  const body = () => {
    if (error) {
      return String(error)
    }
    return local.children
  }

  return (
    <Show when={body()}>
      <p
        class={cn("text-destructive text-sm", local.class)}
        data-slot="form-message"
        id={formMessageId}
        {...others}
      >
        {body()}
      </p>
    </Show>
  )
}

export { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField }
