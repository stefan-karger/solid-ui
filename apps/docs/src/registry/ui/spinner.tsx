import { type ComponentProps } from "@solidjs/web"

import { cn } from "~/lib/utils"
import { IconPlaceholder } from "~/registry/icons/icon-placeholder"

type SpinnerProps = ComponentProps<"svg">

const Spinner = (props: SpinnerProps) => (
  <IconPlaceholder
    lucide="LoaderCircleIcon"
    role="status"
    aria-label="Loading"
    data-slot="spinner"
    {...props}
    class={cn("cn-spinner size-4 animate-spin", props.class)}
  />
)

export { Spinner, type SpinnerProps }
