import { type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/registry/v1/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "~/registry/v1/ui/alert"

export function Callout(props: ComponentProps<typeof Alert>) {
  const [local, other] = splitProps(props, ["variant", "class", "children", "title", "icon"])

  return (
    <Alert
      class={cn("md:-mx-1 mt-6 w-auto border bg-background text-foreground", local.class)}
      data-variant={local.variant}
      {...other}
    >
      {local.icon}
      {local.title && <AlertTitle>{local.title}</AlertTitle>}
      <AlertDescription class="text-card-foreground/80">{local.children}</AlertDescription>
    </Alert>
  )
}
