import { type ComponentProps, mergeProps, splitProps } from "solid-js"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"
import { Input, type InputProps } from "~/registry/ui/input"
import { Textarea } from "~/registry/ui/textarea"

type InputGroupProps = ComponentProps<"div">

const InputGroup = (props: InputGroupProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "group/input-group cn-input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto",
        local.class
      )}
      data-slot="input-group"
      role="group"
      {...others}
    />
  )
}

const inputGroupAddonVariants = cva(
  "cn-input-group-addon flex cursor-text select-none items-center justify-center",
  {
    variants: {
      align: {
        "inline-start": "cn-input-group-addon-align-inline-start order-first",
        "inline-end": "cn-input-group-addon-align-inline-end order-last",
        "block-start": "cn-input-group-addon-align-block-start order-first w-full justify-start",
        "block-end": "cn-input-group-addon-align-block-end order-last w-full justify-start"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
)

type InputGroupAddonProps = ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>

const InputGroupAddon = (rawProps: InputGroupAddonProps) => {
  const props = mergeProps({ align: "inline-start" } as const, rawProps)
  const [local, others] = splitProps(props, ["class", "align"])

  return (
    <div
      class={cn(inputGroupAddonVariants({ align: local.align }), local.class)}
      data-align={local.align}
      data-slot="input-group-addon"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) {
          return
        }
        event.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      role="group"
      {...others}
    />
  )
}

const inputGroupButtonVariants = cva("cn-input-group-button flex items-center shadow-none", {
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
})

type InputGroupButtonProps = Omit<ButtonProps, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }

const InputGroupButton = (rawProps: InputGroupButtonProps) => {
  const props = mergeProps({ type: "button", variant: "ghost", size: "xs" } as const, rawProps)
  const [local, others] = splitProps(props, ["class", "type", "variant", "size"])

  return (
    <Button
      class={cn(inputGroupButtonVariants({ size: local.size }), local.class)}
      data-size={local.size}
      type={local.type}
      variant={local.variant}
      {...others}
    />
  )
}

type InputGroupTextProps = ComponentProps<"span">

const InputGroupText = (props: InputGroupTextProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn("cn-input-group-text flex items-center [&_svg]:pointer-events-none", local.class)}
      {...others}
    />
  )
}

type InputGroupInputProps = InputProps

const InputGroupInput = (props: InputGroupInputProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Input
      class={cn("cn-input-group-input flex-1", local.class)}
      data-slot="input-group-control"
      {...others}
    />
  )
}

type InputGroupTextareaProps = ComponentProps<"textarea">

const InputGroupTextarea = (props: InputGroupTextareaProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Textarea
      class={cn("cn-input-group-textarea flex-1 resize-none", local.class)}
      data-slot="input-group-control"
      {...others}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
}
