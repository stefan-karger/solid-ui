import {
  type ComponentProps,
  children,
  createSignal,
  For,
  type ParentProps,
  Show,
  splitProps
} from "solid-js"

import { cookieStorage, makePersisted, messageSync } from "@solid-primitives/storage"

import { IconTerminal } from "~/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs"

export const h1 = (props: ComponentProps<"h1">) => {
  return <h1 class="mt-2 scroll-m-28 font-bold font-heading text-3xl tracking-tight" {...props} />
}
export const h2 = (props: ComponentProps<"h2">) => {
  return (
    <h2
      class="[&+p]:!mt-4 mt-12 scroll-m-28 font-heading font-medium text-2xl tracking-tight first:mt-0 lg:mt-20 [&>a]:no-underline *:[code]:text-2xl"
      {...props}
    />
  )
}
export const h3 = (props: ComponentProps<"h3">) => {
  return (
    <h3
      class="mt-8 scroll-m-28 font-heading font-semibold text-xl tracking-tight [&>a]:no-underline *:[code]:text-xl"
      {...props}
    />
  )
}

export const h4 = (props: ComponentProps<"h4">) => {
  return <h4 class="mt-8 scroll-m-28 font-heading font-medium text-lg tracking-tight" {...props} />
}

export const h5 = (props: ComponentProps<"h5">) => {
  return <h5 class="mt-8 scroll-m-28 font-medium text-lg tracking-tight" {...props} />
}

export const h6 = (props: ComponentProps<"h6">) => {
  return <h6 class="mt-8 scroll-m-28 font-medium text-base tracking-tight" {...props} />
}

export const a = (props: ComponentProps<"a">) => {
  return <a class="underline underline-offset-4" {...props} />
}

export const p = (props: ComponentProps<"p">) => {
  return <p class="leading-relaxed [&:not(:first-child)]:mt-6" {...props} />
}

export const strong = (props: ComponentProps<"strong">) => {
  return <strong class="font-medium" {...props} />
}

export const ul = (props: ComponentProps<"ul">) => {
  return <ul class="my-6 ml-6 list-decimal" {...props} />
}

export const li = (props: ComponentProps<"li">) => {
  return <li class="mt-2" {...props} />
}

export const blockquote = (props: ComponentProps<"blockquote">) => {
  return <blockquote class="mt-6 border-l-2 pl-6 italic" {...props} />
}

export const img = (props: ComponentProps<"img">) => {
  const [local, others] = splitProps(props, ["alt"])
  return <img alt={local.alt} class="rounded-md" {...others} />
}

export const hr = (props: ComponentProps<"hr">) => {
  return <hr class="my-4 md:my-8" {...props} />
}

export const table = (props: ComponentProps<"table">) => {
  return (
    <div class="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
      <table
        class="relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0"
        {...props}
      />
    </div>
  )
}

export const tr = (props: ComponentProps<"tr">) => {
  return <tr class="m-0 border-b" {...props} />
}

export const th = (props: ComponentProps<"th">) => {
  return (
    <th
      class="px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  )
}

export const td = (props: ComponentProps<"td">) => {
  return (
    <td
      class="whitespace-nowrap px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  )
}

export const pre = (props: ComponentProps<"pre">) => {
  return <pre class="no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none" {...props} />
}

export const code = (props: ComponentProps<"code">) => {
  return (
    <code
      class="relative break-words rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none"
      {...props}
    />
  )
}

export const Step = (props: ComponentProps<"h3">) => (
  <h3 class="mt-8 scroll-m-32 font-heading font-medium text-xl tracking-tight" {...props} />
)

export const Steps = (props: ComponentProps<"div">) => (
  <div class="[&>h3]:step steps *:[h3]:first:!mt-0 mb-12 [counter-reset:step]" {...props} />
)

export function DirectiveContainer(
  props: {
    type:
      | "info"
      | "note"
      | "tip"
      | "important"
      | "warning"
      | "danger"
      | "caution"
      | "details"
      | "tab-group"
      | "tab"
    title?: string
    codeGroup?: string
    tabNames?: string
    withTsJsToggle?: string
  } & ParentProps
) {
  const _children = children(() => props.children).toArray()

  if (props.type === "tab") {
    return _children
  }

  if (props.type === "tab-group") {
    const tabNames = props.tabNames?.split("\0") as string[]

    const [openTab, setOpenTab] = makePersisted(createSignal(tabNames[0]), {
      name: `tab-group:${props.title}`,
      sync: messageSync(new BroadcastChannel("tab-group")),
      // biome-ignore lint/complexity/useLiteralKeys: <TS don't allow dynamic keys as literals>
      storage: cookieStorage["withOptions"]({
        expires: new Date(Date.now() + 3e10)
      })
    })

    if (props.title === "package-manager") {
      const tabNames = props.tabNames?.split("\0")
      return (
        <div class="mt-6 rounded-lg bg-accent first:mt-0 dark:bg-zinc-900">
          <Tabs class="gap-0" onChange={setOpenTab} value={openTab?.()}>
            <div class="flex items-center gap-2 border-border/50 border-b px-3 py-1">
              <div class="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
                <IconTerminal class="size-3 text-white dark:text-black" />
              </div>
              <TabsList class="rounded-none bg-transparent p-0">
                <For each={tabNames}>
                  {(title) => (
                    <TabsTrigger
                      class="h-7 border border-transparent pt-0.5 data-[selected]:border-input data-[selected]:bg-accent data-[selected]:shadow-none"
                      value={title}
                    >
                      {title}
                    </TabsTrigger>
                  )}
                </For>
              </TabsList>
            </div>
            <div class="no-scrollbar overflow-x-auto">
              <For each={tabNames}>
                {(title, i) => (
                  <TabsContent
                    class="relative mt-0 hidden data-[selected]:block"
                    forceMount={true}
                    value={title}
                  >
                    {_children[i()]}
                  </TabsContent>
                )}
              </For>
            </div>
          </Tabs>
        </div>
      )
    }

    return (
      <Tabs class="relative mt-6 w-full" onChange={setOpenTab} value={openTab?.()}>
        <TabsList class="justify-start gap-4 rounded-none bg-transparent px-0">
          <For each={tabNames}>
            {(title) => (
              <TabsTrigger
                class="rounded-none border-0 bg-transparent px-0 pb-3 text-base text-muted-foreground hover:text-primary data-[selected]:bg-transparent data-[selected]:text-foreground data-[selected]:shadow-none dark:data-[selected]:bg-transparent dark:data-[selected]:text-foreground"
                value={title}
              >
                {title}
              </TabsTrigger>
            )}
          </For>
        </TabsList>

        <For each={tabNames}>
          {(title, i) => (
            <TabsContent
              class="[&_pre]:!min-h-[450px] relative hidden data-[selected]:block [&>.steps]:mt-6 [&_h3.font-heading]:font-medium [&_h3.font-heading]:text-base *:[figure]:first:mt-0"
              forceMount={true}
              value={title}
            >
              {_children[i()]}
            </TabsContent>
          )}
        </For>
      </Tabs>
    )
  }

  if (props.type === "details") {
    return (
      <details class="custom-container" data-custom-container="details">
        <summary>{props.title ?? props.type}</summary>
        {_children}
      </details>
    )
  }

  return (
    <div class="custom-container" data-custom-container={props.type}>
      <Show when={props.title !== " "}>
        <span>{props.title ?? props.type}</span>
      </Show>
      {_children}
    </div>
  )
}

import { ComponentPreview } from "~/components/component-preview"
import { ComponentsList } from "~/components/components-list"

export { ComponentPreview, ComponentsList }

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  strong,
  ul,
  li,
  blockquote,
  img,
  hr,
  table,
  tr,
  th,
  td,
  pre,
  code,
  Step,
  Steps,
  DirectiveContainer,
  ComponentPreview,
  ComponentsList
}
