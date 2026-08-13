import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

type TextareaProps = ComponentProps<"textarea">

const Textarea = (props: TextareaProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <textarea
      class={cn(
        "cn-textarea field-sizing-content flex min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      data-slot="textarea"
      {...others}
    />
  )
}

export { Textarea, type TextareaProps }
