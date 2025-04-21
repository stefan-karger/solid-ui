import {
  type Component,
  type ComponentProps,
  createMemo,
  mergeProps,
  Show,
  splitProps,
} from "solid-js";

import { Index } from "~/__registry__";
import { cn } from "~/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs";

interface ComponentPreviewProps extends ComponentProps<"div"> {
  name: string;
  source: string;
  align?: "center" | "start" | "end";
  type?: "block" | "component" | "example";
}

const ComponentPreview: Component<ComponentPreviewProps> = (rawProps) => {
  const props = mergeProps({ align: "center" } as const, rawProps);
  const [local, others] = splitProps(props, [
    "class",
    "align",
    "children",
    "name",
    "type",
  ]);

  const Preview = createMemo(() => {
    const Component = Index[local.name]?.component;

    if (!Component) {
      return (
        <p class="text-muted-foreground text-sm">
          Component{" "}
          <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {local.name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  });

  return (
    <Show
      fallback={
        <div class="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
          <div class="absolute inset-0 hidden w-[1600px] bg-background md:block">
            <iframe
              class="size-full"
              src={`/blocks/${local.name}`}
              title={`${local.name} block`}
            />
          </div>
        </div>
      }
      when={local.type !== "block"}
    >
      <div
        class={cn("group relative my-4 flex flex-col space-y-2", local.class)}
        {...others}
      >
        <Tabs class="relative mr-auto w-full" defaultValue="preview">
          <div class="flex items-center justify-between pb-3">
            <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none"
                value="preview"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none"
                value="code"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent class="relative rounded-md border" value="preview">
            <div
              class={cn(
                "preview flex min-h-[350px] w-full justify-center p-10",
                local.align === "center" && "items-center",
                local.align === "start" && "items-start",
                local.align === "end" && "items-end",
              )}
            >
              <Preview />
            </div>
          </TabsContent>
          <TabsContent value="code">
            <div class="flex flex-col space-y-4">
              <div class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                {local.children}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Show>
  );
};

export { ComponentPreview };
