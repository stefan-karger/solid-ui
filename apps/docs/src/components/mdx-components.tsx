import { type ComponentProps } from "solid-js"

import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { CopyButton } from "@/components/copy-button"
import { MDXHeader } from "@/components/mdx-header"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert"
import { Callout } from "@/registry/ui/callout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export const MDXComponents = {
  h1: (props: ComponentProps<"h1">) => {
    return <h1 data-toc="" class="font-heading mt-2 scroll-m-20 text-4xl font-bold" {...props} />
  },
  h2: (props: ComponentProps<"h2">) => {
    return (
      <h2
        data-toc=""
        class="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
        {...props}
      />
    )
  },
  h3: (props: ComponentProps<"h3">) => {
    return (
      <h3
        data-toc=""
        class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
        {...props}
      />
    )
  },
  h4: (props: ComponentProps<"h4">) => {
    return (
      <h4
        data-toc=""
        class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
        {...props}
      />
    )
  },
  h5: (props: ComponentProps<"h5">) => {
    return (
      <h5
        data-toc=""
        class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
        {...props}
      />
    )
  },
  h6: (props: ComponentProps<"h6">) => {
    return (
      <h6
        data-toc=""
        class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
        {...props}
      />
    )
  },
  a: (props: ComponentProps<"a">) => {
    return (
      <a
        target={props.href?.includes("http") ? "_blank" : "_self"}
        class="font-medium underline underline-offset-4"
        {...props}
      />
    )
  },
  p: (props: ComponentProps<"p">) => {
    return <p class="break-words leading-7 [&:not(:first-child)]:mt-6" {...props} />
  },
  ul: (props: ComponentProps<"ul">) => {
    return <ul class="my-6 ml-6 list-disc" {...props} />
  },
  ol: (props: ComponentProps<"ol">) => {
    return <ol class="my-6 ml-6 list-decimal" {...props} />
  },
  li: (props: ComponentProps<"li">) => {
    return <li class="mt-2" {...props} />
  },
  blockquote: (props: ComponentProps<"blockquote">) => {
    return <blockquote class="mt-6 border-l-2 pl-6 italic" {...props} />
  },
  img: (props: ComponentProps<"img">) => {
    return <img class="rounded-md" {...props} />
  },
  code: (props: ComponentProps<"code">) => {
    return (
      <code
        class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm group-[&.code]:p-0"
        {...props}
      />
    )
  },
  pre: (props: ComponentProps<"pre">) => {
    let preRef: HTMLPreElement | undefined
    return (
      <div class="group relative">
        <pre
          ref={preRef}
          class={cn(
            "code group mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"
          )}
        >
          {props.children}
        </pre>
        <CopyButton
          class="absolute right-4 top-4 hover:bg-[#24283a]"
          content={preRef?.querySelector("code")?.innerText ?? ""}
        />
      </div>
    )
  },
  Step: (props: ComponentProps<"h3">) => (
    <h3 class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
  ),
  Steps: (props: ComponentProps<"div">) => (
    <div class="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]" {...props} />
  ),
  Tabs: (props: ComponentProps<typeof Tabs>) => <Tabs class="relative mt-6 w-full" {...props} />,
  TabsList: (props: ComponentProps<typeof TabsList>) => (
    <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0" {...props} />
  ),
  TabsTrigger: (props: ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none"
      {...props}
    />
  ),
  TabsContent: (props: ComponentProps<typeof TabsContent>) => (
    <TabsContent
      class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
      {...props}
    />
  ),
  LinkedCard: (props: ComponentProps<"a">) => (
    <a
      class="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
      {...props}
    />
  ),
  MDXHeader,
  ComponentPreview,
  ComponentSource,
  Alert,
  AlertTitle,
  AlertDescription,
  Callout
}
