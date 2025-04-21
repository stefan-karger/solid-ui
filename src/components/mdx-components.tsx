import { type ComponentProps } from "solid-js";

import { ComponentPreview } from "~/components/component-preview";
import { ComponentSource } from "~/components/component-source";
import { CopyButton } from "~/components/copy-button";
import { MDXHeader } from "~/components/mdx-header";
import { cn } from "~/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert";
import { Callout } from "~/registry/ui/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs";

export const MDXComponents = {
  Alert,
  AlertDescription,
  AlertTitle,
  a: (props: ComponentProps<"a">) => {
    return (
      <a
        class="font-medium underline underline-offset-4"
        target={props.href?.includes("http") ? "_blank" : "_self"}
        {...props}
      />
    );
  },
  blockquote: (props: ComponentProps<"blockquote">) => {
    return <blockquote class="mt-6 border-l-2 pl-6 italic" {...props} />;
  },
  Callout,
  ComponentPreview,
  ComponentSource,
  code: (props: ComponentProps<"code">) => {
    return (
      <code
        class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm group-[&.code]:p-0"
        {...props}
      />
    );
  },
  h1: (props: ComponentProps<"h1">) => {
    return (
      <h1
        class="mt-2 scroll-m-20 font-bold font-heading text-4xl"
        data-toc=""
        {...props}
      />
    );
  },
  h2: (props: ComponentProps<"h2">) => {
    return (
      <h2
        class="mt-12 scroll-m-20 border-b pb-2 font-heading font-semibold text-2xl tracking-tight first:mt-0"
        data-toc=""
        {...props}
      />
    );
  },
  h3: (props: ComponentProps<"h3">) => {
    return (
      <h3
        class="mt-8 scroll-m-20 font-heading font-semibold text-xl tracking-tight"
        data-toc=""
        {...props}
      />
    );
  },
  h4: (props: ComponentProps<"h4">) => {
    return (
      <h4
        class="mt-8 scroll-m-20 font-heading font-semibold text-xl tracking-tight"
        data-toc=""
        {...props}
      />
    );
  },
  h5: (props: ComponentProps<"h5">) => {
    return (
      <h5
        class="mt-8 scroll-m-20 font-heading font-semibold text-xl tracking-tight"
        data-toc=""
        {...props}
      />
    );
  },
  h6: (props: ComponentProps<"h6">) => {
    return (
      <h6
        class="mt-8 scroll-m-20 font-heading font-semibold text-xl tracking-tight"
        data-toc=""
        {...props}
      />
    );
  },
  img: (props: ComponentProps<"img">) => {
    return <img alt="img" class="rounded-md" {...props} />;
  },
  LinkedCard: (props: ComponentProps<"a">) => (
    <a
      class="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => {
    return <li class="mt-2" {...props} />;
  },
  MDXHeader,
  ol: (props: ComponentProps<"ol">) => {
    return <ol class="my-6 ml-6 list-decimal" {...props} />;
  },
  p: (props: ComponentProps<"p">) => {
    return (
      <p class="break-words leading-7 [&:not(:first-child)]:mt-6" {...props} />
    );
  },
  pre: (props: ComponentProps<"pre">) => {
    let preRef: HTMLPreElement | undefined;
    return (
      <div class="group relative">
        <pre
          class={cn(
            "code group mt-6 mb-4 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
          )}
          ref={preRef}
        >
          {props.children}
        </pre>
        <CopyButton
          class="absolute top-4 right-4 hover:bg-[#24283a]"
          content={preRef?.querySelector("code")?.innerText ?? ""}
        />
      </div>
    );
  },
  Step: (props: ComponentProps<"h3">) => (
    <h3
      class="mt-8 scroll-m-20 font-heading font-semibold text-xl tracking-tight"
      {...props}
    />
  ),
  Steps: (props: ComponentProps<"div">) => (
    <div
      class="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Tabs: (props: ComponentProps<typeof Tabs>) => (
    <Tabs class="relative mt-6 w-full" {...props} />
  ),
  TabsContent: (props: ComponentProps<typeof TabsContent>) => (
    <TabsContent
      class="relative [&_h3.font-heading]:font-semibold [&_h3.font-heading]:text-base"
      {...props}
    />
  ),
  TabsList: (props: ComponentProps<typeof TabsList>) => (
    <TabsList
      class="w-full justify-start rounded-none border-b bg-transparent p-0"
      {...props}
    />
  ),
  TabsTrigger: (props: ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => {
    return <ul class="my-6 ml-6 list-disc" {...props} />;
  },
};
