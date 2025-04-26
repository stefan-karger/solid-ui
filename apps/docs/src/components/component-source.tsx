import type { Component, ComponentProps } from "solid-js"

import { CodeBlockWrapper } from "@/components/code-block-wrapper"
import { cn } from "@/lib/utils"

interface ComponentSourceProps extends ComponentProps<"div"> {
  src: string
}

const ComponentSource: Component<ComponentSourceProps> = (props) => {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      class={cn("my-6 overflow-hidden rounded-md", props.class)}
    >
      {props.children}
    </CodeBlockWrapper>
  )
}

export { ComponentSource }
