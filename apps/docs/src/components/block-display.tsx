import { createMemo, createSignal, For, Show } from "solid-js"
import { A, createAsync, query } from "@solidjs/router"

import { TreeView } from "@ark-ui/solid/tree-view"
import type { ContextValue } from "@corvu/resizable"
import type { z } from "zod"

import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard"
import { highlightCode } from "~/lib/highlight-code"
import { createCollectionForRegistryItemFiles, getRegistryItem, type Node } from "~/lib/registry"
import { cn } from "~/lib/utils"
import type { registryItemFileSchema } from "~/registry/schema"
import type { Style } from "~/registry/styles"
import { Button } from "~/registry/v1/ui/button"
import { Resizable, ResizableHandle, ResizablePanel } from "~/registry/v1/ui/resizable"
import { Separator } from "~/registry/v1/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/v1/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "~/registry/v1/ui/toggle-group"

import {
  getIconForLanguageExtension,
  IconCheck,
  IconChevronRight,
  IconFile,
  IconFolder,
  IconFullscreen,
  IconMonitor,
  IconRotateCw,
  IconSmartphone,
  IconTablet,
  IconTerminal
} from "./icons"

export function BlockDisplay(props: { class?: string; name: string; styleName: Style["name"] }) {
  const [view, setView] = createSignal<"preview" | "code">("preview")
  const [resizableContext, setResizableContext] = createSignal<ContextValue | null>(null)

  let iframeRef: HTMLIFrameElement | undefined

  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const response = createAsync(async () => {
    const item = await getCachedRegistryItem(props.name, props.styleName)
    if (!item?.files) {
      return null
    }

    const [highlightedFiles] = await Promise.all([getCachedHighlightedFiles(item.files)])

    return {
      item,

      highlightedFiles
    }
  })

  return (
    <Show when={response()}>
      {(block) => {
        const [activeFile, setActiveFile] = createSignal<string | null>(
          block().highlightedFiles?.[0].target ?? null
        )

        const file = createMemo(() => {
          return block().highlightedFiles?.find((file) => file.target === activeFile())
        })

        const language = file()?.path.split(".").pop() ?? "tsx"

        return (
          <div
            class="flex min-w-0 scroll-mt-24 flex-col-reverse items-stretch gap-4 md:flex-col"
            style={{
              "--height": block().item.meta?.iframeHeight ?? "930px"
            }}
          >
            <Tabs onChange={setView} value={view()}>
              {/* Toolbar */}
              <div class="hidden w-full items-center gap-2 pl-2 md:pr-6 lg:flex">
                <TabsList class="grid h-8 grid-cols-2 items-center rounded-md p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:rounded-sm *:data-[slot=tabs-trigger]:px-2 *:data-[slot=tabs-trigger]:text-xs">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <Separator class="!h-4 mx-2" orientation="vertical" />
                <a
                  class="flex-1 text-center font-medium text-sm underline-offset-2 hover:underline md:flex-auto md:text-left"
                  href={`#${block().item.name}`}
                >
                  {block().item.description?.replace(/\.$/, "")}
                </a>
                <div class="ml-auto flex items-center gap-2">
                  <div class="h-8 items-center gap-1.5 rounded-md border p-1 shadow-none">
                    <ToggleGroup
                      class="*:data-[slot=toggle-group-item]:!size-6 *:data-[slot=toggle-group-item]:!rounded-sm gap-1"
                      defaultValue="100"
                      multiple={false}
                      onChange={(value) => {
                        setView("preview")
                        if (resizableContext() && value) {
                          resizableContext()!.resize(0, parseFloat(value))
                        }
                      }}
                    >
                      <ToggleGroupItem title="Desktop" value="1">
                        <IconMonitor />
                      </ToggleGroupItem>
                      <ToggleGroupItem title="Tablet" value=".6">
                        <IconTablet />
                      </ToggleGroupItem>
                      <ToggleGroupItem title="Mobile" value=".3">
                        <IconSmartphone />
                      </ToggleGroupItem>
                      <Separator class="!h-4" orientation="vertical" />
                      <Button
                        as={A}
                        class="size-6 rounded-sm p-0"
                        href={`/view/${props.styleName}/${block().item.name}`}
                        size="icon"
                        target="_blank"
                        title="Open in New Tab"
                        variant="ghost"
                      >
                        <span class="sr-only">Open in New Tab</span>
                        <IconFullscreen />
                      </Button>
                      <Separator class="!h-4" orientation="vertical" />
                      <Button
                        class="size-6 rounded-sm p-0"
                        onClick={() => {
                          console.log("Refresh Preview")
                          if (iframeRef?.contentWindow) {
                            iframeRef.contentWindow.location.reload()
                          }
                        }}
                        size="icon"
                        title="Refresh Preview"
                        variant="ghost"
                      >
                        <IconRotateCw />
                        <span class="sr-only">Refresh Preview</span>
                      </Button>
                    </ToggleGroup>
                  </div>
                  <Separator class="!h-4 mx-1" orientation="vertical" />
                  <Button
                    class="w-fit gap-1 px-2 shadow-none"
                    onClick={() => {
                      copyToClipboard(`npx shadcn@latest add ${block().item.name}`)
                    }}
                    size="sm"
                    variant="outline"
                  >
                    {isCopied() ? <IconCheck /> : <IconTerminal />}
                    <span>npx shadcn add {block().item.name}</span>
                  </Button>
                </div>
              </div>

              <TabsContent value="preview">
                <div class="hidden md:h-(--height) lg:flex">
                  <div class="relative grid w-full gap-4">
                    <div class="absolute inset-0 right-4 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]" />
                    <Resizable
                      class="relative z-10 after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-xl after:bg-surface/50"
                      orientation="horizontal"
                    >
                      {() => {
                        const context = Resizable.useContext()
                        setResizableContext(context)
                        return (
                          <>
                            <ResizablePanel
                              class="relative aspect-[4/2.5] overflow-hidden rounded-lg border bg-background md:aspect-auto md:rounded-xl"
                              initialSize={1}
                              minSize={0.3}
                            >
                              <iframe
                                class={cn(
                                  "no-scrollbar relative z-20 w-full bg-background",
                                  props.class
                                )}
                                height={block().item.meta?.iframeHeight ?? 930}
                                loading="lazy"
                                ref={iframeRef}
                                src={`/view/${props.styleName}/${block().item.name}`}
                                title={`Preview ${block().item.name}`}
                              />
                            </ResizablePanel>
                            <ResizableHandle class="after:-translate-y-1/2 relative z-10 hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
                            <ResizablePanel initialSize={0} minSize={0} />
                          </>
                        )
                      }}
                    </Resizable>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="code">
                <div class="mr-[14px] flex overflow-hidden rounded-xl border bg-code text-code-foreground md:h-(--height)">
                  <div class="w-72">
                    <Show when={block().item}>
                      {(item) => {
                        const collection = createCollectionForRegistryItemFiles(item().files!)
                        const path = block().highlightedFiles?.[0].target?.split("/")
                        path?.pop()
                        console.log(path)
                        const [expandedValue, setExpandedValue] = createSignal<string[]>(path!)

                        return (
                          <TreeView.Root
                            class="!min-h-full flex flex-col border-r"
                            collection={collection}
                            data-slot="tree-root"
                            expandedValue={expandedValue()}
                            onExpandedChange={({ expandedValue }) =>
                              setExpandedValue(expandedValue)
                            }
                            onSelectionChange={({ selectedValue }) => {
                              if (
                                block().highlightedFiles.find(
                                  (file) => file.target === selectedValue[0]
                                )
                              ) {
                                setActiveFile(selectedValue[0])
                              }
                            }}
                            selectedValue={[activeFile()!]}
                          >
                            <TreeView.Label
                              class="flex h-12 shrink-0 items-center border-b px-4 font-medium text-sidebar-foreground/70 text-sm outline-hidden [&>svg]:size-4 [&>svg]:shrink-0"
                              data-slot="tree-label"
                            >
                              Files
                            </TreeView.Label>

                            <TreeView.Tree
                              class="select-none rounded-none text-foreground text-sm disabled:pointer-events-none"
                              data-slot="tree-tree"
                            >
                              <For each={collection.rootNode.children}>
                                {(node, index) => <TreeNode indexPath={[index()]} node={node} />}
                              </For>
                            </TreeView.Tree>
                          </TreeView.Root>
                        )
                      }}
                    </Show>
                  </div>
                  <figure
                    class="!mx-0 mt-0 flex min-w-0 flex-1 flex-col rounded-xl border-none"
                    data-rehype-pretty-code-figure=""
                  >
                    <figcaption
                      class="flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70"
                      data-language={language}
                    >
                      {getIconForLanguageExtension(language)}
                      {file()?.target}
                      <div class="ml-auto flex items-center gap-2">
                        {/*<BlockCopyCodeButton />*/}
                      </div>
                    </figcaption>
                    <div
                      class="no-scrollbar overflow-y-auto"
                      innerHTML={file()?.highlightedContent ?? ""}
                    />
                  </figure>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )
      }}
    </Show>
  )
}

const getCachedRegistryItem = query(async (name: string, styleName: Style["name"]) => {
  return await getRegistryItem(name, styleName)
}, "registryItem")

const getCachedFileTree = query(async (files: Array<{ path: string; target?: string }>) => {
  if (!files) {
    return null
  }

  return createCollectionForRegistryItemFiles(files)
}, "fileTree")

const getCachedHighlightedFiles = query(async (files: z.infer<typeof registryItemFileSchema>[]) => {
  return await Promise.all(
    files.map(async (file) => ({
      ...file,
      highlightedContent: await highlightCode(file.content ?? "")
    }))
  )
}, "highlightedFiles")

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props

  return (
    <TreeView.NodeProvider data-slot="tree-node" indexPath={indexPath} node={node}>
      <Show
        fallback={
          <TreeView.Item
            class="group relative flex w-full items-center gap-3 px-3 py-2 pl-[calc(var(--depth)*1.25rem)] hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[selected]:bg-muted-foreground/15"
            data-slot="tree-item"
          >
            <TreeView.ItemText class="flex min-w-0 items-center gap-3" data-slot="tree-item-text">
              <IconFile class="size-4" />
              <span>{node.name}</span>
            </TreeView.ItemText>
          </TreeView.Item>
        }
        when={node.children}
      >
        <TreeView.Branch class="relative" data-slot="tree-branch">
          <TreeView.BranchControl
            class="group flex w-full items-center gap-2 rounded-none px-3 py-2 pl-[calc(var(--depth)*1rem)] font-medium hover:bg-muted-foreground/15"
            data-slot="tree-branch-control"
          >
            <TreeView.BranchIndicator
              class="transition-transform duration-150 ease-in-out data-[state=open]:rotate-90"
              data-slot="tree-branch-indicator"
            >
              <IconChevronRight class="size-4" />
            </TreeView.BranchIndicator>

            <TreeView.BranchText
              class="pointer-none flex min-w-0 items-center gap-2"
              data-slot="tree-branch-text"
            >
              <IconFolder class="size-4" />
              <span>{node.name}</span>
            </TreeView.BranchText>
          </TreeView.BranchControl>

          <TreeView.BranchContent
            class="ml-0 gap-2 overflow-hidden"
            data-slot="tree-branch-content"
          >
            <For each={node.children}>
              {(child, ix) => <TreeNode indexPath={[...indexPath, ix()]} node={child} />}
            </For>
          </TreeView.BranchContent>
        </TreeView.Branch>
      </Show>
    </TreeView.NodeProvider>
  )
}
