import * as NumberFieldPrimitive from "@kobalte/core/number-field";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";

import { cn } from "~/lib/utils";

const NumberField = NumberFieldPrimitive.Root;

const NumberFieldGroup: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "relative rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        local.class,
      )}
      {...others}
    />
  );
};

type NumberFieldLabelProps<T extends ValidComponent = "label"> =
  NumberFieldPrimitive.NumberFieldLabelProps<T> & {
    class?: string | undefined;
  };

const NumberFieldLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, NumberFieldLabelProps<T>>,
) => {
  const [local, others] = splitProps(props as NumberFieldLabelProps, ["class"]);
  return (
    <NumberFieldPrimitive.Label
      class={cn(
        "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      {...others}
    />
  );
};

type NumberFieldInputProps<T extends ValidComponent = "input"> =
  NumberFieldPrimitive.NumberFieldInputProps<T> & {
    class?: string | undefined;
  };

const NumberFieldInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, NumberFieldInputProps<T>>,
) => {
  const [local, others] = splitProps(props as NumberFieldInputProps, ["class"]);
  return (
    <NumberFieldPrimitive.Input
      class={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid]:border-error-foreground data-[invalid]:text-error-foreground",
        local.class,
      )}
      {...others}
    />
  );
};

type NumberFieldIncrementTriggerProps<T extends ValidComponent = "button"> =
  NumberFieldPrimitive.NumberFieldIncrementTriggerProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
  };

const NumberFieldIncrementTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, NumberFieldIncrementTriggerProps<T>>,
) => {
  const [local, others] = splitProps(
    props as NumberFieldIncrementTriggerProps,
    ["class", "children"],
  );
  return (
    <NumberFieldPrimitive.IncrementTrigger
      class={cn(
        "absolute top-1 right-1 inline-flex size-4 items-center justify-center",
        local.class,
      )}
      {...others}
    >
      <Show
        fallback={
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
            <title>Increase</title>
            <path d="M6 15l6 -6l6 6" />
          </svg>
        }
        when={local.children}
      >
        {(children) => children()}
      </Show>
    </NumberFieldPrimitive.IncrementTrigger>
  );
};

type NumberFieldDecrementTriggerProps<T extends ValidComponent = "button"> =
  NumberFieldPrimitive.NumberFieldDecrementTriggerProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
  };

const NumberFieldDecrementTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, NumberFieldDecrementTriggerProps<T>>,
) => {
  const [local, others] = splitProps(
    props as NumberFieldDecrementTriggerProps,
    ["class", "children"],
  );
  return (
    <NumberFieldPrimitive.DecrementTrigger
      class={cn(
        "absolute right-1 bottom-1 inline-flex size-4 items-center justify-center",
        local.class,
      )}
      {...others}
    >
      <Show
        fallback={
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
            <title>Decrease</title>
            <path d="M6 9l6 6l6 -6" />
          </svg>
        }
        when={local.children}
      >
        {(children) => children()}
      </Show>
    </NumberFieldPrimitive.DecrementTrigger>
  );
};

type NumberFieldDescriptionProps<T extends ValidComponent = "div"> =
  NumberFieldPrimitive.NumberFieldDescriptionProps<T> & {
    class?: string | undefined;
  };

const NumberFieldDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NumberFieldDescriptionProps<T>>,
) => {
  const [local, others] = splitProps(props as NumberFieldDescriptionProps, [
    "class",
  ]);
  return (
    <NumberFieldPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...others}
    />
  );
};

type NumberFieldErrorMessageProps<T extends ValidComponent = "div"> =
  NumberFieldPrimitive.NumberFieldErrorMessageProps<T> & {
    class?: string | undefined;
  };

const NumberFieldErrorMessage = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NumberFieldErrorMessageProps<T>>,
) => {
  const [local, others] = splitProps(props as NumberFieldErrorMessageProps, [
    "class",
  ]);
  return (
    <NumberFieldPrimitive.ErrorMessage
      class={cn("text-error-foreground text-sm", local.class)}
      {...others}
    />
  );
};

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldLabel,
  NumberFieldInput,
  NumberFieldIncrementTrigger,
  NumberFieldDecrementTrigger,
  NumberFieldDescription,
  NumberFieldErrorMessage,
};
