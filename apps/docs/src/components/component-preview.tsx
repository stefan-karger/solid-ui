import {
  type ComponentProps,
  createMemo,
  Match,
  mergeProps,
  Suspense,
  Switch,
  splitProps
} from "solid-js"

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
  const props = mergeProps(
    {
      styleName: "v1",
      align: "center",
      hideCode: false,
      chromeLessOnMobile: false
    },
    rawProps
  )

  const [local, other] = splitProps(props as ComponentPreviewProps, [
    "name",
    "styleName",
    "class",
    "align",
    "hideCode",
    "chromeLessOnMobile"
  ])

  console.log(local.hideCode)

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
    <Switch>
      <Match when={props.type === "block"}>
        <div class="md:-mx-1 relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
          <img
            alt={props.name}
            class="absolute top-0 left-0 z-20 w-[970px] max-w-none bg-background sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
            height={900}
            src={`/r/styles/v1/${props.name}-light.png`}
            width={1440}
          />
          <img
            alt={props.name}
            class="absolute top-0 left-0 z-20 hidden w-[970px] max-w-none bg-background sm:w-[1280px] md:hidden dark:block md:dark:hidden"
            height={900}
            src={`/r/stylesv1/${props.name}-dark.png`}
            width={1440}
          />
          <div class="absolute inset-0 hidden w-[1600px] bg-background md:block">
            <iframe
              class="size-full"
              src={`/view/${props.styleName}/${props.name}`}
              title={props.name}
            />
          </div>
        </div>
      </Match>
      <Match when={props.type !== "block"}>
        <ComponentPreviewTabs
          align={local.align}
          chromeLessOnMobile={local.chromeLessOnMobile}
          class={local.class}
          component={<Preview />}
          hideCode={local.hideCode}
          source={
            <ComponentSource collapsible={false} name={local.name} styleName={local.styleName} />
          }
          {...other}
        />
      </Match>
    </Switch>
  )
}
