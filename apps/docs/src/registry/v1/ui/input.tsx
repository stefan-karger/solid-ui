import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const Input: Component<ComponentProps<"input">> = (props) => {
  const [local, others] = splitProps(props, ["class", "type"])
  return (
    <input
      class={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        local.class
      )}
      data-slot="input"
      type={local.type}
      {...others}
    />
  )
}

export { Input }
