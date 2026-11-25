import { type ComponentProps, type JSX } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"
import { Input } from "~/registry/ui/input"
import { Textarea } from "~/registry/ui/textarea"

type InputGroupProps = ComponentProps<"div">

const InputGroup = (props: InputGroupProps) => (
  <div
    data-slot="input-group"
    role="group"
    {...props}
    class={cn(
      "cn-input-group group/input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto",
      props.class
    )}
  />
)

const inputGroupAddonVariants = cva(
  "cn-input-group-addon flex cursor-text items-center justify-center select-none",
  {
    variants: {
      align: {
        "inline-start": "cn-input-group-addon-align-inline-start order-first",
        "inline-end": "cn-input-group-addon-align-inline-end order-last",
        "block-start":
          "cn-input-group-addon-align-block-start order-first w-full justify-start",
        "block-end":
          "cn-input-group-addon-align-block-end order-last w-full justify-start"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
)

type InputGroupAddonProps = ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddonVariants>

const handleInputGroupAddonClick: JSX.EventHandler<
  HTMLDivElement,
  MouseEvent
> = (event) => {
  if ((event.target as HTMLElement).closest("button")) {
    return
  }
  event.currentTarget.parentElement?.querySelector("input")?.focus()
}

const InputGroupAddon = (props: InputGroupAddonProps) => {
  const others = omit(props, "class", "align")
  const align = () => props.align ?? "inline-start"
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align()}
      class={cn(inputGroupAddonVariants({ align: align() }), props.class)}
      onClick={handleInputGroupAddonClick}
      {...others}
    />
  )
}

const inputGroupButtonVariants = cva(
  "cn-input-group-button flex items-center shadow-none",
  {
    variants: {
      size: {
        xs: "cn-input-group-button-size-xs",
        sm: "cn-input-group-button-size-sm",
        "icon-xs": "cn-input-group-button-size-icon-xs",
        "icon-sm": "cn-input-group-button-size-icon-sm"
      }
    },
    defaultVariants: {
      size: "xs"
    }
  }
)

type InputGroupButtonProps = Omit<ButtonProps, "size"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }

const InputGroupButton = (props: InputGroupButtonProps) => {
  const others = omit(props, "class", "type", "variant", "size")
  const size = () => props.size ?? "xs"
  const variant = () => props.variant ?? "ghost"
  const type = () => props.type ?? "button"
  return (
    <Button
      type={type()}
      data-size={size()}
      variant={variant()}
      class={cn(inputGroupButtonVariants({ size: size() }), props.class)}
      {...others}
    />
  )
}

type InputGroupTextProps = ComponentProps<"span">

const InputGroupText = (props: InputGroupTextProps) => (
  <span
    {...props}
    class={cn(
      "cn-input-group-text flex items-center [&_svg]:pointer-events-none",
      props.class
    )}
  />
)

type InputGroupInputProps = ComponentProps<"input">

const InputGroupInput = (props: InputGroupInputProps) => (
  <Input
    data-slot="input-group-control"
    data-ui="input-group-control"
    {...props}
    class={cn("cn-input-group-input flex-1", props.class)}
  />
)

type InputGroupTextareaProps = ComponentProps<"textarea">

const InputGroupTextarea = (props: InputGroupTextareaProps) => (
  <Textarea
    data-slot="input-group-control"
    data-ui="input-group-control"
    {...props}
    class={cn("cn-input-group-textarea flex-1 resize-none", props.class)}
  />
)

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  type InputGroupAddonProps,
  type InputGroupButtonProps,
  type InputGroupInputProps,
  type InputGroupProps,
  type InputGroupTextareaProps,
  type InputGroupTextProps
}
