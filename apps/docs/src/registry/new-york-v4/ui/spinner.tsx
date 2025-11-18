import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const Spinner: Component<ComponentProps<"svg">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <svg
      aria-label="Loading"
      class={cn("size-4 animate-spin", local.class)}
      fill="none"
      role="status"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  )
}

export { Spinner }
