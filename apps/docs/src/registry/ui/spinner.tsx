import { type ComponentProps } from "@solidjs/web"
import { LoaderCircleIcon } from "lucide-solid"

import { cn } from "~/lib/utils"

type SpinnerProps = ComponentProps<typeof LoaderCircleIcon>

const Spinner = (props: SpinnerProps) => (
  <LoaderCircleIcon
    role="status"
    aria-label="Loading"
    data-slot="spinner"
    {...props}
    class={cn("cn-spinner size-4 animate-spin", props.class)}
  />
)

export { Spinner, type SpinnerProps }
