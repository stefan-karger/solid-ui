import { type ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type TextareaProps = ComponentProps<"textarea">

const Textarea = (props: TextareaProps) => {
  const others = omit(props, "class", "rows")
  return (
    <textarea
      data-slot="textarea"
      class={cn(
        "cn-textarea flex min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        props.rows == null && "field-sizing-content",
        props.class
      )}
      rows={props.rows}
      {...others}
    />
  )
}

export { Textarea, type TextareaProps }
