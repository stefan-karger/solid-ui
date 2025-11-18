import { type ComponentProps, createMemo, mergeProps, Suspense, splitProps } from "solid-js"

import { ComponentPreviewTabs } from "~/components/component-preview-tabs"
import { ComponentSource } from "~/components/component-source"
import { Index } from "~/registry/__index__"
import type { Style } from "~/registry/styles"

type ComponentPreviewProps = ComponentProps<"div"> & {
  name: string
  styleName: Style["name"]
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  chromeLessOnMobile?: boolean
}

export function ComponentPreview(rawProps: ComponentPreviewProps) {
  const props = mergeProps(rawProps, {
    styleName: "v1",
    align: "center",
    hideCode: false,
    chromeLessOnMobile: false
  })

  const [local, other] = splitProps(props as ComponentPreviewProps, [
    "name",
    "styleName",
    "class",
    "align",
    "hideCode",
    "chromeLessOnMobile"
  ])

  const Preview = createMemo(() => {
    const Component = Index[local.styleName]?.[local.name]?.component

    if (!Component) {
      return (
        <p class="text-muted-foreground text-sm">
          Component{" "}
          <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {local.name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  })

  return (
    <ComponentPreviewTabs
      align={local.align}
      chromeLessOnMobile={local.chromeLessOnMobile}
      class={local.class}
      component={<Preview />}
      hideCode={local.hideCode}
      source={<ComponentSource collapsible={false} name={local.name} styleName={local.styleName} />}
      {...other}
    />
  )
}
