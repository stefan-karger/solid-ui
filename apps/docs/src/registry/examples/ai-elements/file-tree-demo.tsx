import { For, createSignal, createMemo } from "solid-js"

import { cn } from "~/lib/utils"
import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "~/registry/ui/collapsible"

type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] }

const files: FileNode[] = [
  {
    type: "folder",
    name: "app",
    path: "app",
    children: [
      { type: "file", name: "layout.tsx", path: "app/layout.tsx" },
      { type: "file", name: "page.tsx", path: "app/page.tsx" }
    ]
  },
  {
    type: "folder",
    name: "components",
    path: "components",
    children: [
      {
        type: "folder",
        name: "ui",
        path: "components/ui",
        children: [
          {
            type: "file",
            name: "button.tsx",
            path: "components/ui/button.tsx"
          }
        ]
      },
      {
        type: "file",
        name: "login-form.tsx",
        path: "components/login-form.tsx"
      }
    ]
  }
]

function FileTreeNode(componentProps: {
  node: FileNode
  selected: string
  onSelect: (path: string) => void
}) {
  const content = createMemo(() => {
    const node = componentProps.node
    switch (node.type) {
      case "folder":
        return (
          <Collapsible defaultOpen class="group/folder">
            <CollapsibleTrigger
              render={(triggerProps) => (
                <Button
                  {...triggerProps}
                  variant="ghost"
                  size="sm"
                  class="group/folder-trigger w-full justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50"
                >
                  <IconPlaceholder
                    lucide="ChevronRightIcon"
                    class="transition-transform group-aria-expanded/folder-trigger:rotate-90"
                  />
                  <IconPlaceholder lucide="FolderIcon" />
                  {node.name}
                </Button>
              )}
            />
            <CollapsibleContent>
              <div class="ml-4 flex flex-col">
                {
                  <For each={node.children}>
                    {(child) => (
                      <FileTreeNode
                        node={child}
                        selected={componentProps.selected}
                        onSelect={componentProps.onSelect}
                      />
                    )}
                  </For>
                }
              </div>
            </CollapsibleContent>
          </Collapsible>
        )
      case "file":
        return (
          <Button
            variant="ghost"
            size="sm"
            class={cn("w-full justify-start font-normal", {
              "bg-accent text-accent-foreground":
                componentProps.selected === node.path
            })}
            aria-current={
              componentProps.selected === node.path ? "true" : undefined
            }
            onClick={() => componentProps.onSelect(node.path)}
          >
            <IconPlaceholder lucide="FileIcon" />
            {node.name}
          </Button>
        )
      default: {
        const unreachable: never = node
        return unreachable
      }
    }
  })
  return <>{content()}</>
}

export default function FileTreeDemo() {
  const [selected, setSelected] = createSignal("components/ui/button.tsx")

  return (
    <div class="flex w-full max-w-xs flex-col py-6 text-sm">
      {
        <For each={files}>
          {(node) => (
            <FileTreeNode
              node={node}
              selected={selected()}
              onSelect={setSelected}
            />
          )}
        </For>
      }
    </div>
  )
}
