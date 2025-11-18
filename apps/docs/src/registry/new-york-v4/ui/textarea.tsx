import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const Textarea: Component<ComponentProps<"textarea">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <textarea
      class={cn(
        "field-sizing-content flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        local.class
      )}
      data-slot="textarea"
      {...others}
    />
  )
}

export { Textarea }
